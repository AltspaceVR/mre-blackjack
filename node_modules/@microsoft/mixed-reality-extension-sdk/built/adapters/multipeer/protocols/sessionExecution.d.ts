/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Session } from '..';
import { Message } from '../../..';
import * as Protocols from '../../../protocols';
/**
 * @hidden
 * Class for routing messages from the app over to the session
 */
export declare class SessionExecution extends Protocols.Protocol implements Protocols.Middleware {
    private session;
    constructor(session: Session);
    /** @private */
    beforeRecv: (message: Message<import("../../../types/network/payloads/payloads").Payload>) => Message<import("../../../types/network/payloads/payloads").Payload>;
}
//# sourceMappingURL=sessionExecution.d.ts.map