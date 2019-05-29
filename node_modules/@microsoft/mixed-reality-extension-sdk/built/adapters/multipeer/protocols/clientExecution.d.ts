/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Client } from '..';
import { Message } from '../../..';
import * as Protocols from '../../../protocols';
/**
 * @hidden
 * Class for routing messages between the client and the session
 */
export declare class ClientExecution extends Protocols.Protocol implements Protocols.Middleware {
    private client;
    private heartbeat;
    private heartbeatTimer;
    /** @override */
    readonly name: string;
    constructor(client: Client);
    startListening(): void;
    stopListening(): void;
    private setHeartbeatTimer;
    beforeRecv: (message: Message<import("../../../types/network/payloads/payloads").Payload>) => Message<import("../../../types/network/payloads/payloads").Payload>;
}
//# sourceMappingURL=clientExecution.d.ts.map