"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
class ClientPreprocessing {
    constructor(protocol) {
        this.protocol = protocol;
        /** @private */
        this.beforeRecv = (message) => {
            if (message.serverTimeMs > 0) {
                this.protocol.conn.quality.trackingClock.update(message.serverTimeMs);
            }
            if (message.latencyEstimateMs > 0) {
                this.protocol.conn.quality.latencyMs.update(message.latencyEstimateMs);
            }
            if (message.payload.type === 'heartbeat') {
                this.protocol.sendMessage({
                    replyToId: message.id,
                    payload: {
                        type: 'heartbeat-reply',
                    },
                });
                message = undefined;
            }
            return message;
        };
        this.beforeRecv = this.beforeRecv.bind(this);
    }
}
exports.ClientPreprocessing = ClientPreprocessing;
//# sourceMappingURL=clientPreprocessing.js.map