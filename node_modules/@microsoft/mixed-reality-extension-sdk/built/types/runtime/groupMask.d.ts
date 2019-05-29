/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Context } from '.';
/**
 * A set of user group IDs. User groups are used to selectively enable several different
 * properties of actors based on the memberships of the viewing user. All users not assigned
 * a group are in the `default` group. See [[User.groups]], [[Appearance.enabled]].
 */
export declare class GroupMask extends Set<string> implements Iterable<string> {
    private context;
    static readonly ALL_PACKED: number;
    static readonly NONE_PACKED: number;
    private _allowDefault;
    /** @hidden */
    allowDefault: boolean;
    /**
     * Create a new mask containing the given groups.
     * @param context An active MRE app context
     * @param initialContents A list of group names to be added to this GroupMask
     */
    constructor(context: Context, initialContents?: Iterable<string>);
    /**
     * Generates a new mask containing every group currently defined.
     * @param context An active MRE app context
     */
    static All(context: Context): GroupMask;
    /** @hidden */
    static FromPacked(context: Context, value: number): GroupMask;
    /** @hidden */
    packed(): number;
    /** @hidden */
    toJSON(): number;
    private getOrAddMapping;
    private changedCallback;
    /** @hidden */
    onChanged(callback: (gm: GroupMask) => void): void;
    /** @hidden */
    getClean(): GroupMask;
    /**
     * Add a group to this mask
     * @param item The group to add
     */
    add(item: string): this;
    /**
     * Add multiple groups to this mask
     * @param items The groups to add
     */
    addAll(items: Iterable<string>): this;
    /**
     * Remove a group from this mask
     * @param item The group to remove
     * @returns Whether the group was removed from this mask
     */
    delete(item: string): boolean;
    /**
     * Remove all groups from this mask
     */
    clear(): void;
    /**
     * Make this mask contain only the given groups
     * @param items The items to add
     */
    set(items: Iterable<string>): void;
    /** @hidden */
    setPacked(value: number): void;
    /**
     * Check if a group is in this mask
     * @param item The group to check
     * @returns Whether the group is in this mask
     */
    has(item: string): boolean;
}
//# sourceMappingURL=groupMask.d.ts.map