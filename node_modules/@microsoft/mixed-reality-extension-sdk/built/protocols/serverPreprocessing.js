"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
class ServerPreprocessing {
    constructor() {
        /** @private */
        this.beforeSend = (message, promise) => {
            message.serverTimeMs = message.serverTimeMs || Date.now();
            return message;
        };
        this.beforeSend = this.beforeSend.bind(this);
    }
}
exports.ServerPreprocessing = ServerPreprocessing;
//# sourceMappingURL=serverPreprocessing.js.map