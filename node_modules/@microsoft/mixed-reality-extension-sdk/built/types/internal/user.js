"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
class InternalUser {
    constructor(user) {
        this.user = user;
        this.observing = true;
    }
    getPatchAndReset() {
        const patch = this.patch;
        if (patch) {
            patch.id = this.user.id;
            delete this.patch;
        }
        return patch;
    }
}
exports.InternalUser = InternalUser;
//# sourceMappingURL=user.js.map