/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Connection } from '..';
import { OperatingModel } from '../types/network/operatingModel';
import * as Payloads from '../types/network/payloads';
import { Protocol } from './protocol';
/**
 * @hidden
 * Class to manage the handshake process with a client.
 */
export declare class Handshake extends Protocol {
    private sessionId;
    private operatingModel;
    syncRequest: Payloads.SyncRequest;
    constructor(conn: Connection, sessionId: string, operatingModel: OperatingModel);
    /** @private */
    'recv-handshake': (payload: Payloads.Handshake) => void;
    /** @private */
    'recv-handshake-complete': (payload: Payloads.HandshakeComplete) => void;
    /** @private */
    'recv-sync-request': (payload: Payloads.SyncRequest) => void;
}
//# sourceMappingURL=handshake.d.ts.map