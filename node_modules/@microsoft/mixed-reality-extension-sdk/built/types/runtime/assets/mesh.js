"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Mesh extends _1.Asset {
    // tslint:disable:variable-name
    /** @inheritdoc */
    get vertexCount() { return this._vertexCount; }
    /** @inheritdoc */
    get triangleCount() { return this._triangleCount; }
    /** @inheritdoc */
    get mesh() { return this; }
    /** @hidden */
    constructor(manager, def) {
        super(manager, def);
        if (!def.mesh) {
            throw new Error("Cannot construct mesh from non-mesh definition");
        }
        this._vertexCount = def.mesh.vertexCount;
        this._triangleCount = def.mesh.triangleCount;
    }
    /** @hidden */
    toJSON() {
        return Object.assign({}, super.toJSON(), { mesh: {
                vertexCount: this.vertexCount,
                triangleCount: this.triangleCount
            } });
    }
}
exports.Mesh = Mesh;
//# sourceMappingURL=mesh.js.map