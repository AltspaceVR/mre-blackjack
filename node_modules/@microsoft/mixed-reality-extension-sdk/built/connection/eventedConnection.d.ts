/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Connection, ConnectionQuality } from '.';
import { Message } from '..';
import { QueuedPromise } from '../utils/queuedPromise';
/**
 * @hidden
 */
export declare class EventedConnection extends EventEmitter implements Connection {
    private _quality;
    private _promises;
    private queuedMessages;
    private timeout;
    /** @inheritdoc */
    readonly quality: ConnectionQuality;
    /** @inheritdoc */
    readonly promises: {
        [id: string]: QueuedPromise;
    };
    /** @inheritdoc */
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    /** @inheritdoc */
    close(): void;
    /** @inheritdoc */
    send(message: Message): void;
    /** @inheritdoc */
    recv(message: Message): void;
}
//# sourceMappingURL=eventedConnection.d.ts.map