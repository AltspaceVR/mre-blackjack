"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const handshake_1 = require("../../../protocols/handshake");
const operatingModel_1 = require("../../../types/network/operatingModel");
/**
 * @hidden
 */
class ClientHandshake extends handshake_1.Handshake {
    constructor(client, sessionId) {
        super(client.conn, sessionId, operatingModel_1.OperatingModel.PeerAuthoritative);
        this.client = client;
    }
    /** @override */
    get name() { return `${this.constructor.name} client ${this.client.id.substr(0, 8)}`; }
}
exports.ClientHandshake = ClientHandshake;
//# sourceMappingURL=clientHandshake.js.map