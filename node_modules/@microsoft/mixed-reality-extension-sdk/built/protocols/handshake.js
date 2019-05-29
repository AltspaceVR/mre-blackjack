"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const protocol_1 = require("./protocol");
/**
 * @hidden
 * Class to manage the handshake process with a client.
 */
class Handshake extends protocol_1.Protocol {
    constructor(conn, sessionId, operatingModel) {
        super(conn);
        this.sessionId = sessionId;
        this.operatingModel = operatingModel;
        /** @private */
        this['recv-handshake'] = (payload) => {
            this.sendPayload({
                type: 'handshake-reply',
                sessionId: this.sessionId,
                operatingModel: this.operatingModel,
            });
        };
        /** @private */
        this['recv-handshake-complete'] = (payload) => {
            this.resolve();
        };
        /** @private */
        this['recv-sync-request'] = (payload) => {
            // The way the protocol works right now, this message can be sent unexpectedly early by the client.
            // If we receive it, we'll cache it and pass it along to the next protocol.
            this.syncRequest = payload;
        };
        // Behave like a server-side endpoint (send heartbeats, measure connection quality)
        this.use(new _1.ServerPreprocessing());
    }
}
exports.Handshake = Handshake;
//# sourceMappingURL=handshake.js.map