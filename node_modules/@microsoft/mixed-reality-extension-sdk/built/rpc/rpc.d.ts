/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Context, User } from '..';
/**
 * @hidden
 * Type defining an rpc handler function callback.
 */
export declare type RPCHandler = (...args: any[]) => void;
/**
 * @hidden
 * Base RPC interface. Able to send and receive RPC calls.
 */
export declare class RPC {
    protected _context: Context;
    private handlers;
    readonly context: Context;
    constructor(_context: Context);
    on(procName: string, handler: RPCHandler): void;
    send(procName: string, ...args: any[]): void;
    emit: (procName: string, ...args: any[]) => void;
    receive(procName: string, ...args: any[]): void;
}
/**
 * @hidden
 * RPC interface bound to a user. Able to join and leave channels.
 */
export declare class UserRPC extends RPC {
    private user;
    readonly userId: string;
    constructor(user: User);
    join(channelName: string): void;
    leave(channelName: string): void;
}
/**
 * @hidden
 * RPC Channel interface. Able to send and receive RPC calls targeted to a channel.
 */
export declare class RPCChannel {
    private context;
    private _name;
    private userIds;
    readonly name: string;
    constructor(context: Context, _name: string);
    isEmpty(): boolean;
    contains(userId: string): boolean;
    join(userId: string): void;
    leave(userId: string): void;
    send(procName: string, ...args: any[]): void;
    emit: (procName: string, ...args: any[]) => void;
    receive(procName: string, ...args: any[]): void;
}
/**
 * @hidden
 * RPC interface bound to an context instance.
 */
export declare class ContextRPC extends RPC {
    private channels;
    /**
     * Creates a new RPC interface instance.
     * @param context The context that the interface should be attached to.
     */
    constructor(context: Context);
    cleanup(): void;
    channel(channelName: string, create?: boolean): RPCChannel;
    to: (channelName: string, create?: boolean) => RPCChannel;
    leaveAll(userId: string): void;
    private _receive;
}
//# sourceMappingURL=rpc.d.ts.map