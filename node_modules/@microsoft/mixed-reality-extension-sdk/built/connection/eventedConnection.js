"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const _1 = require(".");
/**
 * @hidden
 */
class EventedConnection extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        // tslint:disable:variable-name
        this._quality = new _1.ConnectionQuality();
        this._promises = {};
        // tslint:enable:variable-name
        this.queuedMessages = [];
    }
    /** @inheritdoc */
    get quality() { return this._quality; }
    /** @inheritdoc */
    get promises() { return this._promises; }
    // Bug in Node: EventEmitter doesn't alias this method
    /** @inheritdoc */
    off(event, listener) {
        return this.removeListener(event, listener);
    }
    /** @inheritdoc */
    close() {
        this.emit('close');
    }
    /** @inheritdoc */
    send(message) {
        this.emit('send', message);
    }
    /** @inheritdoc */
    recv(message) {
        const hasListeners = () => !!this.listeners('recv').length;
        const checkAndLoop = () => {
            this.timeout = undefined;
            if (hasListeners()) {
                dispatchQueuedMessages();
            }
            else {
                setRetryLoop();
            }
        };
        const dispatchQueuedMessages = () => {
            for (const queuedMessage of this.queuedMessages.splice(0)) {
                this.emit('recv', queuedMessage);
            }
        };
        const setRetryLoop = () => this.timeout = this.timeout || setTimeout(checkAndLoop, 100);
        if (hasListeners()) {
            this.emit('recv', message);
        }
        else {
            this.queuedMessages.push(message);
            setRetryLoop();
        }
    }
}
exports.EventedConnection = EventedConnection;
//# sourceMappingURL=eventedConnection.js.map