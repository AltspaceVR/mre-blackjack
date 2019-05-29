"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/** The base class for all asset types. */
class Asset {
    constructor(manager, def) {
        this.manager = manager;
        this._id = def.id;
        this._name = def.name;
        this._source = def.source;
    }
    // tslint:enable:variable-name
    /** @inheritdoc */
    get id() { return this._id; }
    /** @inheritdoc */
    get name() { return this._name; }
    /** @inheritdoc */
    get source() { return this._source; }
    /** @hidden */
    toJSON() {
        return {
            id: this._id,
            name: this._name,
            source: this._source
        };
    }
    /** @hidden */
    copy(from) {
        // tslint:disable:curly
        if (from.id)
            this._id = from.id;
        if (from.name)
            this._name = from.name;
        if (from.source)
            this._source = from.source;
        // tslint:enable:curly
        return this;
    }
    /** @hidden */
    static Parse(manager, def) {
        if (def.prefab) {
            return new _1.Prefab(manager, def);
        }
        else if (def.mesh) {
            return new _1.Mesh(manager, def);
        }
        else if (def.material) {
            return new _1.Material(manager, def);
        }
        else if (def.texture) {
            return new _1.Texture(manager, def);
        }
        else if (def.sound) {
            return new _1.Sound(manager, def);
        }
        else {
            throw new Error(`Asset ${def.id} is not of a known type.`);
        }
    }
}
exports.Asset = Asset;
//# sourceMappingURL=asset.js.map