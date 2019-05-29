"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class AssetCollection {
    constructor() {
        this.collection = {};
        // tslint:disable-next-line:variable-name
        this._count = 0;
    }
    get count() { return this._count; }
    byIndex(index) {
        return this.collection[index];
    }
    byName(name) {
        return this.collection[name];
    }
    push(asset) {
        if (asset.name) {
            this.collection[asset.name] = asset;
        }
        this.collection[this._count++] = asset;
    }
}
exports.default = AssetCollection;
//# sourceMappingURL=assetCollection.js.map