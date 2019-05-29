/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as Restify from 'restify';
import { Adapter, AdapterOptions } from '..';
/**
 * WebSocket Adapter options.
 */
export declare type WebSocketAdapterOptions = AdapterOptions;
/**
 * The `WebSocketAdapter` is appropriate to use when the host environment has an authoritative simluation, and that
 * authoritative simulation is the only connection made to the Mixed Reality Extension (MRE) app.
 *
 * Example hosts:
 *  - Single player environments
 *  - Server-based multiuser topologies
 */
export declare class WebSocketAdapter extends Adapter {
    /**
     * Creates a new instance of the WebSocket Adapter.
     */
    constructor(options?: WebSocketAdapterOptions);
    /**
     * Start the adapter listening for new connections.
     * @param onNewConnection Handler for new connections.
     */
    listen(): Promise<Restify.Server>;
    private startListening;
}
//# sourceMappingURL=adapter.d.ts.map