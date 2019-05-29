/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetLike } from '../..';
import { InternalPatchable } from '../patchable';
/**
 * @hidden
 */
export declare class InternalAsset implements InternalPatchable<AssetLike> {
    asset: Asset;
    observing: boolean;
    patch: AssetLike;
    constructor(asset: Asset);
    getPatchAndReset(): AssetLike;
}
//# sourceMappingURL=asset.d.ts.map