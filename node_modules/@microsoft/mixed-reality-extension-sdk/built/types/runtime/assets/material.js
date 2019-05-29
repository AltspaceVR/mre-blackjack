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
const constants_1 = require("../../../constants");
const math_1 = require("../../../math");
const observe_1 = require("../../../utils/observe");
const readPath_1 = __importDefault(require("../../../utils/readPath"));
const asset_1 = require("../../internal/asset");
/**
 * Controls how transparency is handled.
 */
var AlphaMode;
(function (AlphaMode) {
    /** The object is rendered opaque, and transparency info is discarded. */
    AlphaMode["Opaque"] = "opaque";
    /**
     * Any parts with alpha above a certain cutoff ([[Material.alphaCutoff]])
     * will be rendered solid. Everything else is fully transparent.
     */
    AlphaMode["Mask"] = "mask";
    /**
     * A pixel's transparency is directly proportional to its alpha value.
     */
    AlphaMode["Blend"] = "blend";
})(AlphaMode = exports.AlphaMode || (exports.AlphaMode = {}));
/**
 * Represents a material on a mesh.
 */
class Material extends _1.Asset {
    /** INTERNAL USE ONLY. To create a new material from scratch, use [[AssetManager.createMaterial]]. */
    constructor(manager, def) {
        super(manager, def);
        // tslint:disable:variable-name
        this._color = math_1.Color4.FromColor3(math_1.Color3.White(), 1.0);
        this._mainTextureId = constants_1.ZeroGuid;
        this._mainTextureOffset = math_1.Vector2.Zero();
        this._mainTextureScale = math_1.Vector2.One();
        this._alphaMode = AlphaMode.Opaque;
        this._alphaCutoff = 0.5;
        this._internal = new asset_1.InternalAsset(this);
        if (!def.material) {
            throw new Error("Cannot construct material from non-material definition");
        }
        if (def.material.color) {
            this._color.copy(def.material.color);
        }
        if (def.material.mainTextureId) {
            this._mainTextureId = def.material.mainTextureId;
        }
        if (def.material.mainTextureOffset) {
            this._mainTextureOffset.copy(def.material.mainTextureOffset);
        }
        if (def.material.mainTextureScale) {
            this._mainTextureScale.copy(def.material.mainTextureScale);
        }
        if (def.material.alphaMode) {
            this._alphaMode = def.material.alphaMode;
        }
        if (def.material.alphaCutoff) {
            this._alphaCutoff = def.material.alphaCutoff;
        }
        // material patching: observe the nested material properties
        // for changed values, and write them to a patch
        observe_1.observe({
            target: this._color,
            targetName: 'color',
            notifyChanged: (...path) => this.materialChanged(...path)
        });
        observe_1.observe({
            target: this._mainTextureOffset,
            targetName: 'mainTextureOffset',
            notifyChanged: (...path) => this.materialChanged(...path)
        });
        observe_1.observe({
            target: this._mainTextureScale,
            targetName: 'mainTextureScale',
            notifyChanged: (...path) => this.materialChanged(...path)
        });
    }
    // tslint:enable:variable-name
    /** @hidden */
    get internal() { return this._internal; }
    /** @inheritdoc */
    get color() { return this._color; }
    set color(value) { if (value) {
        this._color.copy(value);
    } }
    /** @returns A shared reference to this material's texture asset */
    get mainTexture() { return this.manager.assets[this._mainTextureId]; }
    set mainTexture(value) {
        this.mainTextureId = value && value.id || constants_1.ZeroGuid;
    }
    /** @inheritdoc */
    get mainTextureId() { return this._mainTextureId; }
    set mainTextureId(value) {
        if (!value || value.startsWith('0000')) {
            value = constants_1.ZeroGuid;
        }
        if (!this.manager.assets[value]) {
            value = constants_1.ZeroGuid; // throw?
        }
        this._mainTextureId = value;
        this.materialChanged('mainTextureId');
    }
    /** @inheritdoc */
    get mainTextureOffset() { return this._mainTextureOffset; }
    set mainTextureOffset(value) { if (value) {
        this._mainTextureOffset.copy(value);
    } }
    /** @inheritdoc */
    get mainTextureScale() { return this._mainTextureScale; }
    set mainTextureScale(value) { if (value) {
        this._mainTextureScale.copy(value);
    } }
    /** @inheritdoc */
    get alphaMode() { return this._alphaMode; }
    set alphaMode(value) { this._alphaMode = value; this.materialChanged('alphaMode'); }
    /** @inheritdoc */
    get alphaCutoff() { return this._alphaCutoff; }
    set alphaCutoff(value) { this._alphaCutoff = value; this.materialChanged('alphaCutoff'); }
    /** @inheritdoc */
    get material() { return this; }
    copy(from) {
        if (!from) {
            return this;
        }
        // Pause change detection while we copy the values into the actor.
        const wasObserving = this.internal.observing;
        this.internal.observing = false;
        super.copy(from);
        if (from.material) {
            if (from.material.color) {
                this._color.copy(from.material.color);
            }
            if (from.material.mainTextureOffset) {
                this._mainTextureOffset.copy(from.material.mainTextureOffset);
            }
            if (from.material.mainTextureScale) {
                this._mainTextureScale.copy(from.material.mainTextureScale);
            }
            this._mainTextureId = from.material.mainTextureId || null;
            this._alphaMode = from.material.alphaMode || AlphaMode.Opaque;
            this._alphaCutoff = from.material.alphaCutoff || 0.5;
        }
        this.internal.observing = wasObserving;
        return this;
    }
    /** @hidden */
    toJSON() {
        return Object.assign({}, super.toJSON(), { material: {
                color: this.color.toJSON(),
                mainTextureId: this.mainTextureId,
                mainTextureOffset: this.mainTextureOffset.toJSON(),
                mainTextureScale: this.mainTextureScale.toJSON(),
                alphaMode: this.alphaMode,
                alphaCutoff: this.alphaCutoff
            } });
    }
    materialChanged(...path) {
        if (this.internal.observing) {
            this.manager.context.internal.incrementGeneration();
            this.internal.patch = this.internal.patch || { material: {} };
            readPath_1.default(this, this.internal.patch.material, ...path);
        }
    }
}
exports.Material = Material;
//# sourceMappingURL=material.js.map