"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/** Defines the 3 main axes */
class Axis {
    /** X axis */
    static get X() { return new _1.Vector3(1.0, 0.0, 0.0); }
    /** Y axis */
    static get Y() { return new _1.Vector3(0.0, 1.0, 0.0); }
    /** Z axis */
    static get Z() { return new _1.Vector3(0.0, 0.0, 1.0); }
}
exports.Axis = Axis;
//# sourceMappingURL=axis.js.map