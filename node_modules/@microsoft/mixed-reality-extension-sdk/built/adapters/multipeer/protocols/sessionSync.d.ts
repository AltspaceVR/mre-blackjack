/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Session } from '..';
import * as Protocols from '../../../protocols';
import * as Payloads from '../../../types/network/payloads';
/**
 * @hidden
 * Class to manage the synchronization phase when connecting to the app. There should be no state to synchronize
 */
export declare class SessionSync extends Protocols.Protocol {
    constructor(session: Session);
    /** @override */
    startListening(): void;
    /** @private */
    'recv-sync-complete': (payload: Payloads.SyncComplete) => void;
}
//# sourceMappingURL=sessionSync.d.ts.map