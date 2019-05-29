/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Connection } from '..';
import { Protocol } from './protocol';
/**
 * @hidden
 * Class to manage the join process with a client.
 */
export declare class Sync extends Protocol {
    constructor(conn: Connection);
    /** @override */
    startListening(): void;
}
//# sourceMappingURL=sync.d.ts.map