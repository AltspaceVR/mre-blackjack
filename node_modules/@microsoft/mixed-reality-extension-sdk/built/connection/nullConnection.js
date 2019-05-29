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
 * A Connection that does performs nops for send and receive.
 */
class NullConnection extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        // tslint:disable:variable-name
        this._quality = new _1.ConnectionQuality();
    }
    // tslint:enable:variable-name
    /** @inheritdoc */
    get quality() { return this._quality; }
    /** @inheritdoc */
    get promises() { return {}; }
    // Bug in Node: EventEmitter doesn't alias this method
    /** @inheritdoc */
    off(event, listener) {
        return this.removeListener(event, listener);
    }
    /** @inheritdoc */
    close() {
    }
    /** @inheritdoc */
    send(message) {
    }
    /** @inheritdoc */
    recv(message) {
    }
}
exports.NullConnection = NullConnection;
//# sourceMappingURL=nullConnection.js.map