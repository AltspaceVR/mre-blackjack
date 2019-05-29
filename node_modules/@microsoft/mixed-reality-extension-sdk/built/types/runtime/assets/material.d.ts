/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetLike, AssetManager, Texture } from '.';
import { Color4, Color4Like, Vector2, Vector2Like } from '../../../math';
import { InternalAsset } from '../../internal/asset';
import { Patchable } from '../../patchable';
/**
 * Describes the properties of a Material.
 */
export interface MaterialLike {
    /** The base color of this material. */
    color: Partial<Color4Like>;
    /** The main (albedo) texture asset ID */
    mainTextureId: string;
    /** The main texture's offset from default */
    mainTextureOffset: Vector2Like;
    /** The main texture's scale from default */
    mainTextureScale: Vector2Like;
    /** How the color/texture's alpha channel should be handled */
    alphaMode: AlphaMode;
    /** Visibility threshold in masked alpha mode */
    alphaCutoff: number;
}
/**
 * Controls how transparency is handled.
 */
export declare enum AlphaMode {
    /** The object is rendered opaque, and transparency info is discarded. */
    Opaque = "opaque",
    /**
     * Any parts with alpha above a certain cutoff ([[Material.alphaCutoff]])
     * will be rendered solid. Everything else is fully transparent.
     */
    Mask = "mask",
    /**
     * A pixel's transparency is directly proportional to its alpha value.
     */
    Blend = "blend"
}
/**
 * Represents a material on a mesh.
 */
export declare class Material extends Asset implements MaterialLike, Patchable<AssetLike> {
    private _color;
    private _mainTextureId;
    private _mainTextureOffset;
    private _mainTextureScale;
    private _alphaMode;
    private _alphaCutoff;
    private _internal;
    /** @hidden */
    readonly internal: InternalAsset;
    /** @inheritdoc */
    color: Color4;
    /** @returns A shared reference to this material's texture asset */
    mainTexture: Texture;
    /** @inheritdoc */
    mainTextureId: string;
    /** @inheritdoc */
    mainTextureOffset: Vector2;
    /** @inheritdoc */
    mainTextureScale: Vector2;
    /** @inheritdoc */
    alphaMode: AlphaMode;
    /** @inheritdoc */
    alphaCutoff: number;
    /** @inheritdoc */
    readonly material: MaterialLike;
    /** INTERNAL USE ONLY. To create a new material from scratch, use [[AssetManager.createMaterial]]. */
    constructor(manager: AssetManager, def: AssetLike);
    copy(from: Partial<AssetLike>): this;
    /** @hidden */
    toJSON(): AssetLike;
    private materialChanged;
}
//# sourceMappingURL=material.d.ts.map