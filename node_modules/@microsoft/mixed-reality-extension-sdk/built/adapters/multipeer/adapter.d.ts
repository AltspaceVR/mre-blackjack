/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as Restify from 'restify';
import { Adapter, AdapterOptions } from '..';
/**
 * Multi-peer adapter options
 */
export declare type MultipeerAdapterOptions = AdapterOptions & {
    /**
     * @member peerAuthoritative (Optional. Default: true) Whether or not to run in the `peer-authoritative`
     * operating model. When true, one peer is picked to synchonize actor changes, animation states, etc.
     * When false, no state is synchronized between peers.
     */
    peerAuthoritative?: boolean;
};
/**
 * The `MultipeerAdapter` is appropriate to use when the host environment has no authoritative
 * server simulation, where each client owns some part of the simulation, and a connection from each client to the Mixed
 * Reality Extension (MRE) app is necessary. The MultipeerAdapter serves as an aggregation point for these client
 * connections. This adapter is responsible for app state synchronization to new clients, and for managing distributed
 * state ownership (i.e., which client is authoritative over what parts of the simulated state).
 *
 * Example hosts:
 *  - AltspaceVR
 *  - Peer-to-peer multiuser topologies
 */
export declare class MultipeerAdapter extends Adapter {
    private sessions;
    /** @override */
    protected readonly options: MultipeerAdapterOptions;
    /**
     * Creates a new instance of the Multi-peer Adapter
     */
    constructor(options?: MultipeerAdapterOptions);
    /**
     * Start the adapter listening for new incoming connections from engine clients
     */
    listen(): Promise<Restify.Server>;
    private getOrCreateSession;
    private startListening;
    private joinClientToSession;
}
//# sourceMappingURL=adapter.d.ts.map