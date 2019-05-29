/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Client } from '..';
import * as Protocols from '../../../protocols';
import * as Payloads from '../../../types/network/payloads';
export declare class ClientStartup extends Protocols.Protocol {
    private client;
    /** @override */
    readonly name: string;
    constructor(client: Client, syncRequest: Payloads.SyncRequest);
    /**
     * @hidden
     */
    'recv-sync-request': (payload: Payloads.SyncRequest) => Promise<void>;
    private performStartup;
}
//# sourceMappingURL=clientStartup.d.ts.map