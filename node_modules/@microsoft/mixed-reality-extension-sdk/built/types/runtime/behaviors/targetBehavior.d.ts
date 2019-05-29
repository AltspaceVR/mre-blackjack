/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ActionHandler, Behavior, BehaviorType, DiscreteAction } from '.';
import { User } from '..';
/**
 * Target behavior class containing the target behavior actions.
 */
export declare class TargetBehavior extends Behavior {
    private _target;
    /** @inheritdoc */
    readonly behaviorType: BehaviorType;
    readonly target: DiscreteAction;
    /**
     * Add a target handler to be called when the given target state is triggered.
     * @param targetState The target state to fire the handler on.
     * @param handler The handler to call when the target state is triggered.
     * @return This target behavior.
     */
    onTarget(targetState: 'enter' | 'exit', handler: ActionHandler): this;
    /**
     * Gets whether the behavior is being targeted by the given user, or at all if no user is given.
     * @param user The user to check whether they are targeting this behavior.
     * @return True if the user is targeting this behavior, false if not.  In the case where no user id is given, this
     * returns true if any user is targeting this behavior, false if none are.
     */
    isTargeted(user?: User): boolean;
}
//# sourceMappingURL=targetBehavior.d.ts.map