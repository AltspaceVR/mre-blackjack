/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetLike, AssetManager } from '.';
export interface MeshLike {
    /** The number of vertices in this mesh. */
    vertexCount: number;
    /** The number of triangles in this mesh. */
    triangleCount: number;
}
export declare class Mesh extends Asset implements MeshLike {
    private _vertexCount;
    private _triangleCount;
    /** @inheritdoc */
    readonly vertexCount: number;
    /** @inheritdoc */
    readonly triangleCount: number;
    /** @inheritdoc */
    readonly mesh: MeshLike;
    /** @hidden */
    constructor(manager: AssetManager, def: AssetLike);
    /** @hidden */
    toJSON(): AssetLike;
}
//# sourceMappingURL=mesh.d.ts.map