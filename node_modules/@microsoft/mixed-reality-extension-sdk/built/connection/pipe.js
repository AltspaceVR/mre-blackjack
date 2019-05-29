"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * @hidden
 * Class representing two connected endpoints, allowing them to send and receive to and from one another
 */
class Pipe {
    // tslint:enable:variable-name
    get local() { return this._local; }
    get remote() { return this._remote; }
    constructor() {
        this._local = new _1.EventedConnection();
        this._remote = new _1.EventedConnection();
        this.onLocalClose = this.onLocalClose.bind(this);
        this.onRemoteClose = this.onRemoteClose.bind(this);
        this._local.on('send', (message) => {
            process.nextTick(() => {
                this._remote.recv(Object.assign({}, message));
            });
        });
        this._remote.on('send', (message) => {
            process.nextTick(() => {
                this._local.recv(Object.assign({}, message));
            });
        });
        this._local.on('close', this.onLocalClose);
        this._remote.on('close', this.onRemoteClose);
    }
    onLocalClose() {
        this._local.off('close', this.onLocalClose);
        process.nextTick(() => {
            this._remote.close();
        });
    }
    onRemoteClose() {
        this._remote.off('close', this.onRemoteClose);
        process.nextTick(() => {
            this._local.close();
        });
    }
}
exports.Pipe = Pipe;
//# sourceMappingURL=pipe.js.map