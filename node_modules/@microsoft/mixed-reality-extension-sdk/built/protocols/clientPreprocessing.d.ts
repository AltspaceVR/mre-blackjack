/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Middleware, Protocol } from '.';
import { Message } from '..';
/**
 * @hidden
 */
export declare class ClientPreprocessing implements Middleware {
    private protocol;
    constructor(protocol: Protocol);
    /** @private */
    beforeRecv: (message: Message<import("../types/network/payloads/payloads").Payload>) => Message<import("../types/network/payloads/payloads").Payload>;
}
//# sourceMappingURL=clientPreprocessing.d.ts.map