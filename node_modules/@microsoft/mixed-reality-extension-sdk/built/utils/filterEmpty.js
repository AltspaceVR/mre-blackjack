"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * If `obj` is an empty object, return undefined.
 */
function filterEmpty(obj) {
    if (typeof obj === 'object' && obj !== null && !Object.keys(obj).length) {
        return undefined;
    }
    else {
        return obj;
    }
}
exports.default = filterEmpty;
//# sourceMappingURL=filterEmpty.js.map