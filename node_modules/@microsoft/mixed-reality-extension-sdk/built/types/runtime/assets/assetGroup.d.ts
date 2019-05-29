/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetSource, Material, Mesh, Prefab, Texture } from '.';
import AssetCollection from './assetCollection';
export declare class AssetGroup {
    name: string;
    private _source;
    readonly source: AssetSource;
    prefabs: AssetCollection<Prefab>;
    meshes: AssetCollection<Mesh>;
    materials: AssetCollection<Material>;
    textures: AssetCollection<Texture>;
    constructor(name: string, _source: AssetSource);
    add(asset: Asset): void;
}
//# sourceMappingURL=assetGroup.d.ts.map