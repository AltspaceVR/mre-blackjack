"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * Recursively look for values with a `toJSON()` method. If found,
 * call it and replace the value with the return value.
 */
function resolveJsonValues(obj) {
    if (typeof obj === 'object') {
        if (typeof obj.toJSON === 'function') {
            obj = obj.toJSON();
        }
        const keys = Object.keys(obj);
        for (const key of keys) {
            const value = obj[key];
            if (!!value && typeof value.toJSON === 'function') {
                obj[key] = value.toJSON();
            }
            resolveJsonValues(obj[key]);
        }
    }
    return obj;
}
exports.default = resolveJsonValues;
//# sourceMappingURL=resolveJsonValues.js.map