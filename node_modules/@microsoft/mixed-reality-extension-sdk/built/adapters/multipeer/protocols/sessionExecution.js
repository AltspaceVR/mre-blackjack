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
 * Class for routing messages from the app over to the session
 */
class SessionExecution extends Protocols.Protocol {
    constructor(session) {
        super(session.conn);
        this.session = session;
        /** @private */
        this.beforeRecv = (message) => {
            // Notify listeners we received a message from the application
            this.emit('recv', message);
            // Cancel the message
            return undefined;
        };
        this.beforeRecv = this.beforeRecv.bind(this);
        // Behave like a client-side endpoint (record latency, respond to heartbeats).
        this.use(new Protocols.ClientPreprocessing(this));
        // Use middleware to take incoming messages from the app and pipe them to the session.
        this.use(this);
    }
}
exports.SessionExecution = SessionExecution;
//# sourceMappingURL=sessionExecution.js.map