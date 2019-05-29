/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import events from 'events';
import { Actor, Connection, User } from '../..';
import { InternalContext } from '../../types/internal/context';
import { AssetManager } from '../../types/runtime/assets';
/**
 * Settings used to configure a `Context` instance.
 */
export interface ContextSettings {
    connection?: Connection;
    sessionId?: string;
}
/**
 * Container for an application session. The Context contains all application state for a session of your application.
 * This includes Actors, Users, Assets, and other state.
 */
export declare class Context {
    private _internal;
    /** @hidden */
    readonly internal: InternalContext;
    private _emitter;
    /** @hidden */
    readonly emitter: events.EventEmitter;
    private _assetManager;
    private _sessionId;
    private _conn;
    readonly assetManager: AssetManager;
    readonly sessionId: string;
    readonly conn: Connection;
    readonly actors: Actor[];
    readonly rootActors: Actor[];
    readonly users: User[];
    actor: (actorId: string) => Actor;
    user: (userId: string) => User;
    /**
     * Creates a new `Context` instance.
     */
    constructor(settings: ContextSettings);
    /**
     * Exits this context.
     */
    quit(): void;
    /**
     * The onStarted event is raised after the Context is fully initialized and ready for your application logic to
     * start executing.
     * @event
     */
    onStarted(handler: () => void): this;
    /**
     * The onStopped event is raised before the Context starts shutting down, which happens after the last user
     * disconnects.
     * @event
     */
    onStopped(handler: () => void): this;
    /**
     * The onUserJoined event is raised after a new user has joined the Context.
     * @event
     */
    onUserJoined(handler: (user: User) => void): this;
    /**
     * Remove the onUserJoined event handler from the Context.
     * @event
     */
    offUserJoined(handler: (user: User) => void): this;
    /**
     * The onUserLeft event is raised when the given user has left the Context. After the last user leaves, the Context
     * will be shutdown (and a 'stopped' event will soon follow).
     * @event
     */
    onUserLeft(handler: (user: User) => void): this;
    /**
     * Remove the onUserLeft event handler from the Context
     * @event
     */
    offUserLeft(handler: (user: User) => void): this;
    /**
     * @hidden
     * (for now)
     */
    onActorCreated(handler: (actor: Actor) => void): this;
    /**
     * @hidden
     * (for now)
     */
    offActorCreated(handler: (actor: Actor) => void): this;
    /**
     * @hidden
     * (for now)
     */
    onActorDestroyed(handler: (actor: Actor) => void): this;
    /**
     * @hidden
     * (for now)
     */
    offActorDestroyed(handler: (actor: Actor) => void): this;
    /**
     * @hidden
     */
    onReceiveRPC(handler: (procName: string, channelName: string, args: any[]) => void): this;
    /**
     * @hidden
     */
    offReceiveRPC(handler: (procName: string, channelName: string, args: any[]) => void): this;
}
//# sourceMappingURL=context.d.ts.map