/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as WS from 'ws';
import { EventedConnection } from '.';
/**
 * An implementation of the Connection interface that wraps a WebSocket.
 */
export declare class WebSocket extends EventedConnection {
    private _ws;
    private _remoteAddress;
    readonly remoteAddress: string;
    constructor(_ws: WS, _remoteAddress: string);
    /** @override */
    close(): void;
}
//# sourceMappingURL=webSocket.d.ts.map