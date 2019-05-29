/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetLike, AssetManager } from '.';
import { InternalAsset } from '../../internal/asset';
import { Patchable } from '../../patchable';
export interface PrefabLike {
    /** The number of actors this prefab contains. */
    actorCount: number;
}
export declare class Prefab extends Asset implements PrefabLike, Patchable<AssetLike> {
    private _actorCount;
    private _internal;
    /** @hidden */
    readonly internal: InternalAsset;
    /** @inheritdoc */
    readonly actorCount: number;
    /** @inheritdoc */
    readonly prefab: PrefabLike;
    /** @hidden */
    constructor(manager: AssetManager, def: AssetLike);
    copy(from: Partial<AssetLike>): this;
    /** @hidden */
    toJSON(): AssetLike;
}
//# sourceMappingURL=prefab.d.ts.map