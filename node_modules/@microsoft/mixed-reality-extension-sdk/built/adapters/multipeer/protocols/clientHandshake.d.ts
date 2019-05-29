/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Client } from '../../..';
import { Handshake } from '../../../protocols/handshake';
/**
 * @hidden
 */
export declare class ClientHandshake extends Handshake {
    private client;
    /** @override */
    readonly name: string;
    constructor(client: Client, sessionId: string);
}
//# sourceMappingURL=clientHandshake.d.ts.map