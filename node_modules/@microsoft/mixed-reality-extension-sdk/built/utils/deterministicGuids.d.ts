/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 * Class for generating a sequence of deterministic GUID values.
 * NOTE: This is a quick hack, and does not generate valid UUIDs.
 * To generate a deterministic sequence of values that are also valid
 * UUIDs, we must employ the "Name-based UUID" method described in
 * RFC 4122 §4.3 (http://www.ietf.org/rfc/rfc4122.txt), which is
 * supported by Node's 'uuid/v3' module.
 */
export declare class DeterministicGuids {
    private seed;
    constructor(seed: string);
    next(): string;
}
//# sourceMappingURL=deterministicGuids.d.ts.map