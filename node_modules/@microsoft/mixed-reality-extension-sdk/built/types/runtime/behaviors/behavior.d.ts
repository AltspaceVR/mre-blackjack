/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ActionState, BehaviorType } from '.';
import { User } from '..';
/**
 * Abstract class that serves as the base class for all behaviors.
 */
export declare abstract class Behavior {
    /**
     * Gets the readonly behavior type for this behavior.
     */
    abstract readonly behaviorType: BehaviorType;
    /**
     * INTERNAL METHODS
     */
    _supportsAction(actionName: string): boolean;
    /** @hidden */
    _performAction(actionName: string, actionState: ActionState, user: User): void;
}
//# sourceMappingURL=behavior.d.ts.map