/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Connection, Message } from '..';
import { Payload } from '../types/network/payloads';
import { ExportedPromise } from '../utils/exportedPromise';
import { Middleware } from './middleware';
/**
 * The amount of time to wait for a reply message before closing the connection.
 * Set to zero to disable timeouts.
 */
export declare let DefaultConnectionTimeoutSeconds: number;
/**
 * @hidden
 * Class to handle sending and receiving messages with a client.
 */
export declare class Protocol extends EventEmitter {
    private _conn;
    private middlewares;
    private _timeoutSeconds;
    private promise;
    private promiseResolve;
    private promiseReject;
    readonly conn: Connection;
    readonly promises: {
        [id: string]: import("../utils/queuedPromise").QueuedPromise;
    };
    readonly name: string;
    timeoutSeconds: number;
    constructor(_conn: Connection);
    run(): Promise<void>;
    completed(): Promise<void>;
    use(middleware: Middleware): void;
    startListening(): void;
    stopListening(): void;
    sendPayload(payload: Partial<Payload>, promise?: ExportedPromise): void;
    sendMessage(message: Message, promise?: ExportedPromise): void;
    recvMessage(message: Message): void;
    recvPayload(payload: Partial<Payload>): void;
    drainPromises(): Promise<void>;
    protected resolve(): void;
    protected reject(e?: any): void;
    protected handleReplyMessage(message: Message): void;
    private rejectPromiseForMessage;
    protected missingPromiseForReplyMessage(message: Message): void;
    private onReceive;
    private onClose;
}
//# sourceMappingURL=protocol.d.ts.map