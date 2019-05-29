"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class Transform {
    // tslint:enable:variable-name
    get position() { return this._position; }
    set position(value) { this._position.copy(value); }
    get rotation() { return this._rotation; }
    set rotation(value) { this._rotation.copy(value); }
    /**
     * PUBLIC METHODS
     */
    constructor() {
        this._position = __1.Vector3.Zero();
        this._rotation = __1.Quaternion.Identity();
    }
    copy(from) {
        if (!from)
            return this;
        if (from.position !== undefined)
            this.position.copy(from.position);
        if (from.rotation !== undefined)
            this.rotation.copy(from.rotation);
        return this;
    }
    toJSON() {
        return {
            position: this.position.toJSON(),
            rotation: this.rotation.toJSON(),
        };
    }
}
exports.Transform = Transform;
// tslint:disable-next-line:max-classes-per-file
class ScaledTransform extends Transform {
    get scale() { return this._scale; }
    set scale(value) { this._scale.copy(value); }
    constructor() {
        super();
        this._scale = __1.Vector3.One();
    }
    copy(from) {
        super.copy(from);
        if (from.scale !== undefined)
            this.scale.copy(from.scale);
        return this;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), { scale: this.scale.toJSON() });
    }
}
exports.ScaledTransform = ScaledTransform;
//# sourceMappingURL=transform.js.map