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
/**
 * @hidden
 * Class to manage the synchronization phase when connecting to the app. There should be no state to synchronize
 */
class SessionSync extends Protocols.Protocol {
    constructor(session) {
        super(session.conn);
        /** @private */
        this['recv-sync-complete'] = (payload) => {
            this.resolve();
        };
        // Behave like a client-side endpoint (record latency, respond to heartbeats).
        this.use(new Protocols.ClientPreprocessing(this));
    }
    /** @override */
    startListening() {
        super.startListening();
        this.sendPayload({ type: 'sync-request' });
    }
}
exports.SessionSync = SessionSync;
//# sourceMappingURL=sessionSync.js.map