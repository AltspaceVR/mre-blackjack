"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
/**
 * Base Adapter class. Adapters are where connections from hosts are accepted and mapped to Contexts. The host
 * connection requests a Context from a sessionId. If no matching Context is found, a new one is created and
 * the 'connection' event is raised.
 */
class Adapter {
    // tslint:disable-next-line:variable-name
    constructor(_options) {
        this._options = _options;
        this.emitter = new events_1.default.EventEmitter();
        this._options = Object.assign({}, _options);
        this._options.port =
            this._options.port ||
                process.env.port ||
                process.env.PORT ||
                3901;
    }
    get options() { return this._options; }
    get server() { return this._options.server; }
    set server(value) { this._options.server = value; }
    get port() { return this._options.port; }
    /**
     * The onConnection event is raised when a new Context is created for an application session. This happens when the
     * first client connects to your application.
     * @event
     */
    onConnection(handler) {
        this.emitter.addListener('connection', handler);
        return this;
    }
}
exports.Adapter = Adapter;
//# sourceMappingURL=adapter.js.map