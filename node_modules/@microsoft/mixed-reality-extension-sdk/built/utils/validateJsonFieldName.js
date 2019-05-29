"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * Verifies that `key` isn't an invalid key name. Useful for detecting when we're leaking private
 * fields into network payloads.
 */
function validateJsonFieldName(key) {
    // Uncomment to validate JSON payloads
    /*
    if (key.startsWith('_')) {
        throw new Error(`JSON contains invalid key name "${key}".`);
    }
    */
}
exports.default = validateJsonFieldName;
//# sourceMappingURL=validateJsonFieldName.js.map