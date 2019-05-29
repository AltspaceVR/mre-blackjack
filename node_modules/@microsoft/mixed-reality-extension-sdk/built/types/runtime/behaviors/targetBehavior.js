"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * Target behavior class containing the target behavior actions.
 */
class TargetBehavior extends _1.Behavior {
    constructor() {
        super(...arguments);
        // tslint:disable:variable-name
        this._target = new _1.DiscreteAction();
    }
    // tslint:enable:variable-name
    /** @inheritdoc */
    get behaviorType() { return 'target'; }
    get target() { return this._target; }
    /**
     * Add a target handler to be called when the given target state is triggered.
     * @param targetState The target state to fire the handler on.
     * @param handler The handler to call when the target state is triggered.
     * @return This target behavior.
     */
    onTarget(targetState, handler) {
        const actionState = (targetState === 'enter') ? 'started' : 'stopped';
        this._target.on(actionState, handler);
        return this;
    }
    /**
     * Gets whether the behavior is being targeted by the given user, or at all if no user is given.
     * @param user The user to check whether they are targeting this behavior.
     * @return True if the user is targeting this behavior, false if not.  In the case where no user id is given, this
     * returns true if any user is targeting this behavior, false if none are.
     */
    isTargeted(user) {
        return this._target.isActive(user);
    }
}
exports.TargetBehavior = TargetBehavior;
//# sourceMappingURL=targetBehavior.js.map