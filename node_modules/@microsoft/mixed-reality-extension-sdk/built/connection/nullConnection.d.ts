/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Connection, ConnectionQuality } from '.';
import { Message } from '..';
/**
 * @hidden
 * A Connection that does performs nops for send and receive.
 */
export declare class NullConnection extends EventEmitter implements Connection {
    private _quality;
    /** @inheritdoc */
    readonly quality: ConnectionQuality;
    /** @inheritdoc */
    readonly promises: {};
    /** @inheritdoc */
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    /** @inheritdoc */
    close(): void;
    /** @inheritdoc */
    send(message: Message): void;
    /** @inheritdoc */
    recv(message: Message): void;
}
//# sourceMappingURL=nullConnection.d.ts.map