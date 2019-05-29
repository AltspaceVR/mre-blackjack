"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const v4_1 = __importDefault(require("uuid/v4"));
const log_1 = require("../log");
const filterEmpty_1 = __importDefault(require("../utils/filterEmpty"));
// tslint:disable:variable-name
/**
 * The amount of time to wait for a reply message before closing the connection.
 * Set to zero to disable timeouts.
 */
exports.DefaultConnectionTimeoutSeconds = 30;
// tslint:enable:variable-name
/**
 * @hidden
 * Class to handle sending and receiving messages with a client.
 */
class Protocol extends events_1.EventEmitter {
    // tslint:disable-next-line:variable-name
    constructor(_conn) {
        super();
        this._conn = _conn;
        this.middlewares = [];
        // tslint:disable-next-line:variable-name
        this._timeoutSeconds = exports.DefaultConnectionTimeoutSeconds;
        this.onReceive = (message) => {
            this.recvMessage(message);
        };
        this.onClose = () => {
            Object.keys(this.promises).map(key => {
                this.rejectPromiseForMessage(key, "Connection closed.");
            });
        };
        this.onReceive = this.onReceive.bind(this);
        this.onClose = this.onClose.bind(this);
        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
    }
    get conn() { return this._conn; }
    get promises() { return this.conn.promises; }
    get name() { return this.constructor.name; }
    get timeoutSeconds() { return this._timeoutSeconds; }
    set timeoutSeconds(value) { this._timeoutSeconds = value; }
    async run() {
        try {
            this.startListening();
            await this.completed();
        }
        catch (e) {
            this.reject(e);
        }
    }
    async completed() {
        return this.promise;
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    startListening() {
        log_1.log.debug('network', `${this.name} started listening`);
        this.conn.on('recv', this.onReceive);
        this.conn.on('close', this.onClose);
    }
    stopListening() {
        this.conn.off('recv', this.onReceive);
        this.conn.off('close', this.onClose);
        log_1.log.debug('network', `${this.name} stopped listening`);
    }
    sendPayload(payload, promise) {
        this.sendMessage({ payload }, promise);
    }
    sendMessage(message, promise) {
        message.id = message.id || v4_1.default();
        // Run message through all the middlewares
        const middlewares = this.middlewares.slice();
        for (const middleware of middlewares) {
            if (middleware.beforeSend) {
                message = middleware.beforeSend(message, promise);
                if (!message) {
                    if (promise && promise.reject) {
                        promise.reject();
                    }
                    return;
                }
            }
        }
        const setReplyTimeout = () => {
            if (this.timeoutSeconds > 0) {
                return setTimeout(() => {
                    // tslint:disable-next-line:max-line-length
                    const reason = `${this.name} timed out awaiting response for ${message.payload.type}, id:${message.id}.`;
                    log_1.log.error('network', reason);
                    this.rejectPromiseForMessage(message.id, reason);
                    this.conn.close();
                }, this.timeoutSeconds * 1000);
            }
        };
        // Save the reply callback
        if (promise) {
            this.promises[message.id] = {
                promise,
                timeout: setReplyTimeout()
            };
        }
        log_1.log.verbose('network', `${this.name} send id:${message.id.substr(0, 8)}, type:${message.payload.type}`);
        log_1.log.verbose('network-content', JSON.stringify(message, (key, value) => filterEmpty_1.default(value)));
        this.conn.send(message);
    }
    recvMessage(message) {
        if (message.replyToId) {
            // tslint:disable-next-line:max-line-length
            log_1.log.verbose('network', `${this.name} recv id:${message.id.substr(0, 8)}, replyTo:${message.replyToId.substr(0, 8)}, type:${message.payload.type}`);
        }
        else {
            // tslint:disable-next-line:max-line-length
            log_1.log.verbose('network', `${this.name} recv id:${message.id.substr(0, 8)}, type:${message.payload.type}`);
        }
        log_1.log.verbose('network-content', JSON.stringify(message, (key, value) => filterEmpty_1.default(value)));
        // Run message through all the middlewares
        const middlewares = this.middlewares.slice();
        for (const middleware of middlewares) {
            if (middleware.beforeRecv) {
                message = middleware.beforeRecv(message);
                if (!message) {
                    return;
                }
            }
        }
        if (message.replyToId) {
            this.handleReplyMessage(message);
        }
        else {
            this.recvPayload(message.payload);
        }
    }
    recvPayload(payload) {
        if (payload && payload.type && payload.type.length) {
            const handler = this[`recv-${payload.type}`] || (() => {
                // tslint:disable-next-line:no-console
                log_1.log.error('network', `[ERROR] ${this.name} has no handler for payload ${payload.type}!`);
            });
            handler(payload);
        }
        else {
            // tslint:disable-next-line:no-console
            log_1.log.error('network', `[ERROR] ${this.name} invalid message payload!`);
        }
    }
    drainPromises() {
        if (Object.keys(this.promises).length) {
            return new Promise((resolve, reject) => {
                const check = () => Object.keys(this.promises).length ? set() : resolve();
                const set = () => setTimeout(() => check(), 10);
                set();
                // TODO: Would be better to not have to check on a timer here
            });
        }
    }
    resolve() {
        this.stopListening();
        this.promiseResolve();
    }
    reject(e) {
        this.stopListening();
        this.promiseReject(e);
    }
    handleReplyMessage(message) {
        const queuedPromise = this.promises[message.replyToId];
        if (!queuedPromise) {
            this.missingPromiseForReplyMessage(message);
        }
        else {
            delete this.promises[message.replyToId];
            clearTimeout(queuedPromise.timeout);
            queuedPromise.promise.resolve(message.payload, message);
        }
    }
    rejectPromiseForMessage(messageId, reason) {
        const queuedPromise = this.promises[messageId];
        if (queuedPromise && queuedPromise.promise && queuedPromise.promise.reject) {
            try {
                clearTimeout(queuedPromise.timeout);
            }
            catch (_a) { }
            try {
                delete this.promises[messageId];
            }
            catch (_b) { }
            try {
                queuedPromise.promise.reject(reason);
            }
            catch (_c) { }
        }
    }
    missingPromiseForReplyMessage(message) {
        // tslint:disable-next-line:no-console max-line-length
        log_1.log.error('network', `[ERROR] ${this.name} received unexpected reply message! payload: ${message.payload.type}, replyToId: ${message.replyToId}`);
    }
}
exports.Protocol = Protocol;
//# sourceMappingURL=protocol.js.map