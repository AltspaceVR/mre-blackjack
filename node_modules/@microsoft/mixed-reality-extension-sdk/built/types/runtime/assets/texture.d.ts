/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetLike, AssetManager } from '.';
import { Vector2, Vector2Like } from '../../../math';
import { InternalAsset } from '../../internal/asset';
import { Patchable } from '../../patchable';
export interface TextureLike {
    uri: string;
    resolution: Vector2Like;
    wrapU: TextureWrapMode;
    wrapV: TextureWrapMode;
}
/** How a material should interpret UV coordinates outside the [0,1) range. */
export declare enum TextureWrapMode {
    /** The texture is tiled for every 1 unit in the UVs. */
    Repeat = "repeat",
    /** The edge pixels of the texture are stretched out to the bounds of the UVs. */
    Clamp = "clamp",
    /** The texture is tiled and flipped for every 1 unit in the UVs. */
    Mirror = "mirror"
}
export declare class Texture extends Asset implements TextureLike, Patchable<AssetLike> {
    private _uri;
    private _resolution;
    private _wrapU;
    private _wrapV;
    private _internal;
    /** @hidden */
    readonly internal: InternalAsset;
    /** The URI, if any, this texture was loaded from */
    readonly uri: string;
    /** The pixel dimensions of the loaded texture */
    readonly resolution: Vector2;
    /** How overflowing UVs are handled horizontally. */
    wrapU: TextureWrapMode;
    /** How overflowing UVs are handled vertically. */
    wrapV: TextureWrapMode;
    /** @inheritdoc */
    readonly texture: TextureLike;
    /** INTERNAL USE ONLY. To load a new texture from scratch, use [[AssetManager.createTexture]] */
    constructor(manager: AssetManager, def: AssetLike);
    copy(from: Partial<AssetLike>): this;
    /** @hidden */
    toJSON(): AssetLike;
    private textureChanged;
}
//# sourceMappingURL=texture.d.ts.map