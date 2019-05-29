/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import { ExportedPromise } from './exportedPromise';
/** @hidden */
export interface QueuedPromise {
    promise: ExportedPromise;
    timeout: NodeJS.Timer;
}
//# sourceMappingURL=queuedPromise.d.ts.map