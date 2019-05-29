/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Actor, GroupMask, Material } from '.';
export interface AppearanceLike {
    /**
     * This actor's visibility preference, independent of its parent. If this property is a
     * GroupMask object, this property will effectively be `true` for users in at least one
     * of the groups, and `false` for everyone else. See [[GroupMask]].
     */
    enabled: boolean | GroupMask | number;
    /**
     * The ID of a previously-created [[Material]] asset.
     */
    materialId: string;
}
export declare class Appearance implements AppearanceLike {
    private actor;
    /** @hidden */
    $DoNotObserve: string[];
    private _enabled;
    private _enabledFor;
    private _materialId;
    /**
     * This actor's visibility preference, independent of its parent. See [[Appearance.activeAndEnabled]] for
     * the computed visibility state. If this property is a GroupMask object, this property will
     * effectively be `true` for users in at least one of the groups, and `false` for everyone else.
     * See [[GroupMask]].
     */
    enabled: boolean | GroupMask;
    /**
     * [[enabled]], but forced to a [[GroupMask]]. Using this property will convert this
     * actor's `enabled` property to the GroupMask equivalent of its current value relative
     * to the current set of used groups.
     */
    enabledFor: GroupMask;
    private enabledPacked;
    /** Whether this actor is visible */
    readonly activeAndEnabled: boolean;
    /** @returns A shared reference to this actor's material, or null if this actor has no material */
    material: Material;
    /** @inheritdoc */
    materialId: string;
    constructor(actor: Actor);
    copy(from: Partial<AppearanceLike>): this;
    toJSON(): AppearanceLike;
    /**
     * Prepare outgoing messages
     * @hidden
     */
    static sanitize(msg: Partial<AppearanceLike>): Partial<AppearanceLike>;
}
//# sourceMappingURL=appearance.d.ts.map