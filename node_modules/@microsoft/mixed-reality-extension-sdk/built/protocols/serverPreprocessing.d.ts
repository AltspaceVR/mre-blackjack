/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Middleware } from '.';
import { Message } from '..';
import { ExportedPromise } from '../utils/exportedPromise';
/**
 * @hidden
 */
export declare class ServerPreprocessing implements Middleware {
    constructor();
    /** @private */
    beforeSend: (message: Message<import("../types/network/payloads/payloads").Payload>, promise?: ExportedPromise) => Message<import("../types/network/payloads/payloads").Payload>;
}
//# sourceMappingURL=serverPreprocessing.d.ts.map