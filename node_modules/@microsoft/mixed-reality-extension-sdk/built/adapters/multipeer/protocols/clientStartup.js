"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Protocols = __importStar(require("../../../protocols"));
class ClientStartup extends Protocols.Protocol {
    constructor(client, syncRequest) {
        super(client.conn);
        this.client = client;
        /**
         * @hidden
         */
        this['recv-sync-request'] = async (payload) => {
            await this.performStartup(payload);
        };
        // Behave like a server-side endpoint (send heartbeats, measure connection quality).
        this.use(new Protocols.ServerPreprocessing());
        // If we've already received the 'sync-request' payload, process it now.
        if (syncRequest) {
            setImmediate(async () => {
                await this.performStartup(syncRequest);
            });
        }
    }
    /** @override */
    get name() { return `${this.constructor.name} client ${this.client.id.substr(0, 8)}`; }
    async performStartup(payload) {
        // Do a quick measurement of connection latency.
        const heartbeat = new Protocols.Heartbeat(this);
        await heartbeat.runIterations(10); // Allow exceptions to propagate out.
        this.resolve();
    }
}
exports.ClientStartup = ClientStartup;
//# sourceMappingURL=clientStartup.js.map