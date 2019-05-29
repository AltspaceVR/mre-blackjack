"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const v4_1 = __importDefault(require("uuid/v4"));
const __1 = require("../..");
const context_1 = require("../../types/internal/context");
const assets_1 = require("../../types/runtime/assets");
/**
 * Container for an application session. The Context contains all application state for a session of your application.
 * This includes Actors, Users, Assets, and other state.
 */
class Context {
    /**
     * Creates a new `Context` instance.
     */
    // tslint:disable-next-line:member-ordering
    constructor(settings) {
        this._emitter = new events_1.default.EventEmitter();
        this.actor = (actorId) => this.internal.actorSet[actorId];
        this.user = (userId) => this.internal.userSet[userId];
        this._conn = settings.connection || new __1.NullConnection();
        this._sessionId = settings.sessionId || v4_1.default();
        this._internal = new context_1.InternalContext(this);
        this._assetManager = new assets_1.AssetManager(this);
    }
    /** @hidden */
    get internal() { return this._internal; }
    /** @hidden */
    get emitter() { return this._emitter; }
    // tslint:enable:variable-name
    get assetManager() { return this._assetManager; }
    get sessionId() { return this._sessionId; }
    get conn() { return this._conn; }
    get actors() { return Object.keys(this.internal.actorSet).map(actorId => this.internal.actorSet[actorId]); }
    get rootActors() {
        return Object.keys(this.internal.actorSet)
            .filter(actorId => !this.internal.actorSet[actorId].parent).map(actorId => this.internal.actorSet[actorId]);
    }
    get users() { return Object.keys(this.internal.userSet).map(userId => this.internal.userSet[userId]); }
    /**
     * Exits this context.
     */
    quit() {
        // Closing the connection triggers events that will tear down the context.
        this.conn.close();
    }
    /**
     * The onStarted event is raised after the Context is fully initialized and ready for your application logic to
     * start executing.
     * @event
     */
    onStarted(handler) {
        this.emitter.addListener('started', handler);
        return this;
    }
    /**
     * The onStopped event is raised before the Context starts shutting down, which happens after the last user
     * disconnects.
     * @event
     */
    onStopped(handler) {
        this.emitter.addListener('stopped', handler);
        return this;
    }
    /**
     * The onUserJoined event is raised after a new user has joined the Context.
     * @event
     */
    onUserJoined(handler) {
        this.emitter.addListener('user-joined', handler);
        return this;
    }
    /**
     * Remove the onUserJoined event handler from the Context.
     * @event
     */
    offUserJoined(handler) {
        this.emitter.removeListener('user-joined', handler);
        return this;
    }
    /**
     * The onUserLeft event is raised when the given user has left the Context. After the last user leaves, the Context
     * will be shutdown (and a 'stopped' event will soon follow).
     * @event
     */
    onUserLeft(handler) {
        this.emitter.addListener('user-left', handler);
        return this;
    }
    /**
     * Remove the onUserLeft event handler from the Context
     * @event
     */
    offUserLeft(handler) {
        this.emitter.removeListener('user-left', handler);
        return this;
    }
    /**
     * @hidden
     * (for now)
     */
    onActorCreated(handler) {
        this.emitter.addListener('actor-created', handler);
        return this;
    }
    /**
     * @hidden
     * (for now)
     */
    offActorCreated(handler) {
        this.emitter.removeListener('actor-created', handler);
        return this;
    }
    /**
     * @hidden
     * (for now)
     */
    onActorDestroyed(handler) {
        this.emitter.addListener('actor-destroyed', handler);
        return this;
    }
    /**
     * @hidden
     * (for now)
     */
    offActorDestroyed(handler) {
        this.emitter.removeListener('actor-destroyed', handler);
        return this;
    }
    /**
     * @hidden
     */
    // tslint:disable-next-line:max-line-length
    onReceiveRPC(handler) {
        this.emitter.addListener('context.receive-rpc', handler);
        return this;
    }
    /**
     * @hidden
     */
    // tslint:disable-next-line:max-line-length
    offReceiveRPC(handler) {
        this.emitter.removeListener('context.receive-rpc', handler);
        return this;
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map