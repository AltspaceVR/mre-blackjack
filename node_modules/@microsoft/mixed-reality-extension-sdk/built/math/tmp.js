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
const tools_1 = __importDefault(require("./tools"));
// tslint:disable:member-ordering variable-name one-variable-per-declaration trailing-comma no-bitwise curly
/**
 * @hidden
 */
class MathTmp {
    static get Vector3() { if (!this._v) {
        this._v = tools_1.default.BuildArray(6, _1.Vector3.Zero);
    } return this._v; }
    static get Matrix() { if (!this._m) {
        this._m = tools_1.default.BuildArray(2, _1.Matrix.Identity);
    } return this._m; }
    static get Quaternion() { if (!this._q) {
        this._q = tools_1.default.BuildArray(3, _1.Quaternion.Zero);
    } return this._q; }
}
exports.MathTmp = MathTmp;
//# sourceMappingURL=tmp.js.map