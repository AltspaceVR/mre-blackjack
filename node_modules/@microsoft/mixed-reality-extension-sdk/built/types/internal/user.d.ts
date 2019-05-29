/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { User, UserLike } from '../..';
import { InternalPatchable } from '../patchable';
/**
 * @hidden
 */
export declare class InternalUser implements InternalPatchable<UserLike> {
    user: User;
    __rpc: any;
    observing: boolean;
    patch: UserLike;
    constructor(user: User);
    getPatchAndReset(): UserLike;
}
//# sourceMappingURL=user.d.ts.map