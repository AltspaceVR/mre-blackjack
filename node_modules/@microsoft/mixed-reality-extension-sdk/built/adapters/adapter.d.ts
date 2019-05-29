/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import events from 'events';
import * as Restify from 'restify';
import { Context, ParameterSet } from '..';
/**
 * Adapter options
 */
export declare type AdapterOptions = {
    /**
     * @member {http.Server} server Provide an existing web server to use. Will create one otherwise
     */
    server?: Restify.Server;
    /**
     * @member {string | number} port Optional. When options.server is not supplied and an internal web server is to be
     * created, this is the port number it should listen on. If this value is not given, it will attempt to read the
     * PORT environment variable, then default to 3901
     */
    port?: string | number;
};
/**
 * Base Adapter class. Adapters are where connections from hosts are accepted and mapped to Contexts. The host
 * connection requests a Context from a sessionId. If no matching Context is found, a new one is created and
 * the 'connection' event is raised.
 */
export declare abstract class Adapter {
    protected _options: AdapterOptions;
    protected emitter: events.EventEmitter;
    protected readonly options: AdapterOptions;
    server: Restify.Server;
    readonly port: string | number;
    constructor(_options: AdapterOptions);
    abstract listen(): Promise<Restify.Server>;
    /**
     * The onConnection event is raised when a new Context is created for an application session. This happens when the
     * first client connects to your application.
     * @event
     */
    onConnection(handler: (context: Context, params: ParameterSet) => void): this;
}
//# sourceMappingURL=adapter.d.ts.map