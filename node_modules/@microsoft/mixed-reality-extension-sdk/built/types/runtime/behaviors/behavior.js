"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract class that serves as the base class for all behaviors.
 */
class Behavior {
    /**
     * INTERNAL METHODS
     */
    _supportsAction(actionName) {
        const action = this[actionName.toLowerCase()];
        return action !== undefined;
    }
    /** @hidden */
    _performAction(actionName, actionState, user) {
        const action = this[actionName.toLowerCase()];
        if (action) {
            action._setState(user, actionState);
        }
    }
}
exports.Behavior = Behavior;
//# sourceMappingURL=behavior.js.map