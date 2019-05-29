"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const filterEmpty_1 = __importDefault(require("../utils/filterEmpty"));
const validateJsonFieldName_1 = __importDefault(require("../utils/validateJsonFieldName"));
const log_1 = require("./../log");
/**
 * An implementation of the Connection interface that wraps a WebSocket.
 */
class WebSocket extends _1.EventedConnection {
    // tslint:disable-next-line:variable-name
    constructor(_ws, _remoteAddress) {
        super();
        this._ws = _ws;
        this._remoteAddress = _remoteAddress;
        this._ws.on('close', () => {
            super.close();
        });
        this._ws.on('message', (json) => {
            let message = null;
            try {
                message = JSON.parse(json);
            }
            catch (e) {
                log_1.log.error('network', e);
            }
            if (message) {
                // Uncomment to introduce latency on incoming messages.
                // NOTE: This will sometimes change message ordering.
                // setTimeout(() => {
                try {
                    super.recv(message);
                }
                catch (e) {
                    log_1.log.error('network', e);
                }
                // }, 250 * Math.random());
            }
        });
        super.on('send', (message) => {
            const json = JSON.stringify(message, (key, value) => {
                validateJsonFieldName_1.default(key);
                return filterEmpty_1.default(value);
            });
            // Uncomment to introduce latency on outgoing messages.
            // NOTE: This will sometimes change message ordering.
            // setTimeout(() => {
            try {
                this._ws.send(json);
            }
            catch (e) {
                log_1.log.error('network', e);
            }
            // }, 1000 * Math.random());
        });
    }
    get remoteAddress() { return this._remoteAddress; }
    /** @override */
    close() {
        try {
            this._ws.close();
        }
        catch (e) { }
    }
}
exports.WebSocket = WebSocket;
//# sourceMappingURL=webSocket.js.map