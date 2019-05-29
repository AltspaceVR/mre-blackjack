"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = __importDefault(require("query-string"));
const Restify = __importStar(require("restify"));
const v4_1 = __importDefault(require("uuid/v4"));
const WS = __importStar(require("ws"));
const __1 = require("..");
const __2 = require("../../");
const Constants = __importStar(require("../../constants"));
const verifyClient_1 = __importDefault(require("../../utils/verifyClient"));
const log_1 = require("./../../log");
const client_1 = require("./client");
const session_1 = require("./session");
// tslint:disable-next-line:no-var-requires
const forwarded = require('forwarded-for');
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
class MultipeerAdapter extends __1.Adapter {
    /**
     * Creates a new instance of the Multi-peer Adapter
     */
    constructor(options) {
        super(options);
        // FUTURE: Make these child processes?
        this.sessions = {};
        this._options = Object.assign({ peerAuthoritative: true }, this._options);
    }
    /** @override */
    get options() { return this._options; }
    /**
     * Start the adapter listening for new incoming connections from engine clients
     */
    listen() {
        if (!this.server) {
            // If necessary, create a new web server
            return new Promise((resolve) => {
                const server = this.server = Restify.createServer({ name: "Multi-peer Adapter" });
                this.server.listen(this.port, () => {
                    this.startListening();
                    resolve(server);
                });
            });
        }
        else {
            // Already have a server, so just start listening
            this.startListening();
            return Promise.resolve(this.server);
        }
    }
    async getOrCreateSession(sessionId, params) {
        let session = this.sessions[sessionId];
        if (!session) {
            // Create an in-memory "connection" (If the app were running remotely, we would connect
            // to it via WebSocket here instead)
            const pipe = new __2.Pipe();
            // Create a new context for the connection, passing it the remote side of the pipe.
            const context = new __2.Context({
                sessionId,
                connection: pipe.remote
            });
            // Start the context listening to network traffic.
            context.internal.startListening().catch(() => pipe.remote.close());
            // Instantiate a new session.
            session = this.sessions[sessionId] = new session_1.Session(pipe.local, sessionId, this.options.peerAuthoritative);
            // Handle session close.
            const $this = this;
            session.on('close', () => delete $this.sessions[sessionId]);
            // Connect the session to the context.
            await session.connect(); // Allow exceptions to propagate.
            // Pass the new context to the app.
            this.emitter.emit('connection', context, params);
            // Start context's update loop.
            context.internal.start();
        }
        return session;
    }
    startListening() {
        // Create a server for upgrading HTTP connections to WebSockets
        const wss = new WS.Server({ server: this.server, verifyClient: verifyClient_1.default });
        // Handle WebSocket connection upgrades
        wss.on('connection', async (ws, request) => {
            try {
                log_1.log.info('network', "New Multi-peer connection");
                // Read the sessionId header.
                let sessionId = request.headers[Constants.HTTPHeaders.SessionID] || v4_1.default();
                sessionId = decodeURIComponent(sessionId);
                // Parse URL parameters.
                const params = query_string_1.default.parseUrl(request.url).query;
                // Get the client's IP address rather than the last proxy connecting to you.
                const address = forwarded(request, request.headers);
                // Create a WebSocket for this connection.
                const conn = new __2.WebSocket(ws, address.ip);
                // Instantiate a client for this connection.
                const client = new client_1.Client(conn);
                // Join the client to the session.
                await this.joinClientToSession(client, sessionId, params);
            }
            catch (e) {
                log_1.log.error('network', e);
                ws.close();
            }
        });
    }
    async joinClientToSession(client, sessionId, params) {
        try {
            // Handshake with the client.
            const handshake = new __1.ClientHandshake(client, sessionId);
            await handshake.run();
            // Measure the connection quality and wait for sync-request message.
            const startup = new __1.ClientStartup(client, handshake.syncRequest);
            await startup.run();
            // Get the session for the sessionId.
            const session = await this.getOrCreateSession(sessionId, params);
            // Join the client to the session.
            await session.join(client);
        }
        catch (e) {
            log_1.log.error('network', e);
            client.conn.close();
        }
    }
}
exports.MultipeerAdapter = MultipeerAdapter;
//# sourceMappingURL=adapter.js.map