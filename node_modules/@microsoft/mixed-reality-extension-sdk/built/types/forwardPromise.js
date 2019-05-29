"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a new ForwardPromise from a literal value and a regular promise.
 * @param value An early-resolved value of the promise.
 * @param promise The promise to be converted.
 */
function createForwardPromise(value, promise) {
    const fp = promise;
    fp.value = value;
    return fp;
}
exports.createForwardPromise = createForwardPromise;
//# sourceMappingURL=forwardPromise.js.map