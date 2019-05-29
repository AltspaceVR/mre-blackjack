"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * Periodically measures performance characteristics of the connection (latency).
 */
class Heartbeat {
    /**
     * Creates a new Heartbeat instance.
     * @param protocol The parent protocol object.
     */
    constructor(protocol) {
        this.protocol = protocol;
    }
    /**
     * Polls connection quality the specified number of times.
     */
    async runIterations(sampleCount) {
        for (let i = 0; i < sampleCount; ++i) {
            await this.send(); // Allow exceptions to propagate out.
        }
    }
    send() {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            this.protocol.sendPayload({
                type: 'heartbeat',
            }, {
                resolve: () => {
                    const latency = (Date.now() - start);
                    this.protocol.conn.quality.latencyMs.update(latency);
                    resolve(latency);
                },
                reject
            });
        });
    }
}
exports.Heartbeat = Heartbeat;
//# sourceMappingURL=heartbeat.js.map