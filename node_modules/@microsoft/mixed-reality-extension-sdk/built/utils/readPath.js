"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateJsonFieldName_1 = __importDefault(require("./validateJsonFieldName"));
/**
 * @hidden
 * Reads the value at the path in the src object and writes it to the dst object.
 */
function readPath(src, dst, ...path) {
    let field;
    while (path.length) {
        field = path.shift();
        validateJsonFieldName_1.default(field);
        if (path.length) {
            if (!dst.hasOwnProperty(field)) {
                dst[field] = {};
            }
            dst = dst[field];
        }
        if (typeof src[field] === 'undefined') {
            return;
        }
        src = src[field];
    }
    dst[field] = (src && src.toJSON) ? src.toJSON() : src;
}
exports.default = readPath;
//# sourceMappingURL=readPath.js.map