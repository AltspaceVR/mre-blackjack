"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const math_1 = require("../../../math");
const readPath_1 = __importDefault(require("../../../utils/readPath"));
const asset_1 = require("../../internal/asset");
/** How a material should interpret UV coordinates outside the [0,1) range. */
var TextureWrapMode;
(function (TextureWrapMode) {
    /** The texture is tiled for every 1 unit in the UVs. */
    TextureWrapMode["Repeat"] = "repeat";
    /** The edge pixels of the texture are stretched out to the bounds of the UVs. */
    TextureWrapMode["Clamp"] = "clamp";
    /** The texture is tiled and flipped for every 1 unit in the UVs. */
    TextureWrapMode["Mirror"] = "mirror";
})(TextureWrapMode = exports.TextureWrapMode || (exports.TextureWrapMode = {}));
class Texture extends _1.Asset {
    /** INTERNAL USE ONLY. To load a new texture from scratch, use [[AssetManager.createTexture]] */
    constructor(manager, def) {
        super(manager, def);
        this._resolution = math_1.Vector2.One();
        this._wrapU = TextureWrapMode.Repeat;
        this._wrapV = TextureWrapMode.Repeat;
        this._internal = new asset_1.InternalAsset(this);
        if (!def.texture) {
            throw new Error("Cannot construct texture from non-texture definition");
        }
        if (def.texture.uri) {
            this._uri = def.texture.uri;
        }
        if (def.texture.resolution) {
            this._resolution = new math_1.Vector2(def.texture.resolution.x, def.texture.resolution.y);
        }
        if (def.texture.wrapU) {
            this._wrapU = def.texture.wrapU;
        }
        if (def.texture.wrapV) {
            this._wrapV = def.texture.wrapV;
        }
    }
    // tslint:enable:variable-name
    /** @hidden */
    get internal() { return this._internal; }
    /** The URI, if any, this texture was loaded from */
    get uri() { return this._uri; }
    /** The pixel dimensions of the loaded texture */
    get resolution() { return this._resolution; }
    /** How overflowing UVs are handled horizontally. */
    get wrapU() { return this._wrapU; }
    set wrapU(val) { this._wrapU = val; this.textureChanged('wrapU'); }
    /** How overflowing UVs are handled vertically. */
    get wrapV() { return this._wrapV; }
    set wrapV(val) { this._wrapV = val; this.textureChanged('wrapV'); }
    /** @inheritdoc */
    get texture() { return this; }
    copy(from) {
        if (!from) {
            return this;
        }
        // Pause change detection while we copy the values into the actor.
        const wasObserving = this.internal.observing;
        this.internal.observing = false;
        // tslint:disable:curly
        super.copy(from);
        if (from.texture && from.texture.uri)
            this._uri = from.texture.uri;
        if (from.texture && from.texture.resolution)
            this._resolution = new math_1.Vector2(from.texture.resolution.x, from.texture.resolution.y);
        if (from.texture && from.texture.wrapU)
            this._wrapU = from.texture.wrapU;
        if (from.texture && from.texture.wrapV)
            this._wrapV = from.texture.wrapV;
        // tslint:enable:curly
        this.internal.observing = wasObserving;
        return this;
    }
    /** @hidden */
    toJSON() {
        return Object.assign({}, super.toJSON(), { texture: {
                uri: this.uri,
                resolution: this.resolution.toJSON(),
                wrapU: this.wrapU,
                wrapV: this.wrapV
            } });
    }
    textureChanged(...path) {
        if (this.internal.observing) {
            this.manager.context.internal.incrementGeneration();
            this.internal.patch = this.internal.patch || { texture: {} };
            readPath_1.default(this, this.internal.patch.texture, ...path);
        }
    }
}
exports.Texture = Texture;
//# sourceMappingURL=texture.js.map