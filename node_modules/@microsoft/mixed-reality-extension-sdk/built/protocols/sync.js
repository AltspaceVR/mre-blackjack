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
 * Class to manage the join process with a client.
 */
class Sync extends protocol_1.Protocol {
    constructor(conn) {
        super(conn);
        // Behave like a server-side endpoint (send heartbeats, measure connection quality)
        this.use(new _1.ServerPreprocessing());
    }
    /** @override */
    startListening() {
        super.sendPayload({ type: 'sync-complete' });
        process.nextTick(() => { this.resolve(); });
    }
}
exports.Sync = Sync;
//# sourceMappingURL=sync.js.map