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
const assetCollection_1 = __importDefault(require("./assetCollection"));
class AssetGroup {
    // tslint:disable-next-line:variable-name
    constructor(name, _source) {
        this.name = name;
        this._source = _source;
        this.prefabs = new assetCollection_1.default();
        this.meshes = new assetCollection_1.default();
        this.materials = new assetCollection_1.default();
        this.textures = new assetCollection_1.default();
    }
    get source() { return this._source; }
    add(asset) {
        if (asset instanceof _1.Prefab) {
            this.prefabs.push(asset);
        }
        else if (asset instanceof _1.Mesh) {
            this.meshes.push(asset);
        }
        else if (asset instanceof _1.Material) {
            this.materials.push(asset);
        }
        else if (asset instanceof _1.Texture) {
            this.textures.push(asset);
        }
    }
}
exports.AssetGroup = AssetGroup;
//# sourceMappingURL=assetGroup.js.map