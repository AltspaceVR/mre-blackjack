/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Context, GroupMask } from '../..';
import { InternalUser } from '../internal/user';
import { Patchable } from '../patchable';
export interface UserLike {
    id: string;
    name: string;
    groups: number | GroupMask;
    properties: {
        [name: string]: string;
    };
}
export interface UserSet {
    [id: string]: User;
}
export declare class User implements UserLike, Patchable<UserLike> {
    private _context;
    private _id;
    private _internal;
    /** @hidden */
    readonly internal: InternalUser;
    private _name;
    private _properties;
    private _groups;
    readonly context: Context;
    readonly id: string;
    readonly name: string;
    /**
     * This user's group memberships. Some actors will behave differently depending on
     * if the user is in at least one of a set of groups. See [[GroupMask]].
     */
    groups: GroupMask;
    /**
     * A grab bag of miscellaneous, possibly host-dependent, properties.
     */
    readonly properties: Readonly<{
        [x: string]: string;
    }>;
    /**
     * PUBLIC METHODS
     */
    constructor(_context: Context, _id: string);
    copy(from: Partial<UserLike>): this;
    toJSON(): UserLike;
    private userChanged;
}
//# sourceMappingURL=user.d.ts.map