/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Session } from '..';
import * as Protocols from '../../../protocols';
import * as Payloads from '../../../types/network/payloads';
/**
 * @hidden
 * Protocol for handling handshake with the app instance (Session is a client of App)
 */
export declare class SessionHandshake extends Protocols.Protocol {
    constructor(session: Session);
    /** @override */
    startListening(): void;
    /** @private */
    'recv-handshake-reply': (payload: Payloads.HandshakeReply) => void;
}
//# sourceMappingURL=sessionHandshake.d.ts.map