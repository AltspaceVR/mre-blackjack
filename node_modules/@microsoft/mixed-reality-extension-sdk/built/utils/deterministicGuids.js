"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
/**
 * @hidden
 * Class for generating a sequence of deterministic GUID values.
 * NOTE: This is a quick hack, and does not generate valid UUIDs.
 * To generate a deterministic sequence of values that are also valid
 * UUIDs, we must employ the "Name-based UUID" method described in
 * RFC 4122 §4.3 (http://www.ietf.org/rfc/rfc4122.txt), which is
 * supported by Node's 'uuid/v3' module.
 */
class DeterministicGuids {
    constructor(seed) {
        this.seed = seed;
    }
    next() {
        const result = this.seed;
        const hashedBytes = crypto.createHash('sha1').update(this.seed, 'ascii').digest();
        const sizedBytes = new Buffer(16);
        sizedBytes.set(hashedBytes);
        this.seed = uuid_parse(sizedBytes);
        return result;
    }
}
exports.DeterministicGuids = DeterministicGuids;
function uuid_parse(buf) {
    let i = 0;
    const bth = byteToHex;
    return (bth[buf[i++]] + bth[buf[i++]] +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] +
        bth[buf[i++]] + bth[buf[i++]] +
        bth[buf[i++]] + bth[buf[i++]]);
}
// Map for byte <-> hex string conversion
const byteToHex = [];
for (let i = 0; i < 256; i++) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
}
//# sourceMappingURL=deterministicGuids.js.map