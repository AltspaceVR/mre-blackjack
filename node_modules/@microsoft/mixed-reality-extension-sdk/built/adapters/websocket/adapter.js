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
const __2 = require("../..");
const Constants = __importStar(require("../../constants"));
const verifyClient_1 = __importDefault(require("../../utils/verifyClient"));
const log_1 = require("./../../log");
// tslint:disable-next-line:no-var-requires
const forwarded = require('forwarded-for');
/**
 * The `WebSocketAdapter` is appropriate to use when the host environment has an authoritative simluation, and that
 * authoritative simulation is the only connection made to the Mixed Reality Extension (MRE) app.
 *
 * Example hosts:
 *  - Single player environments
 *  - Server-based multiuser topologies
 */
class WebSocketAdapter extends __1.Adapter {
    /**
     * Creates a new instance of the WebSocket Adapter.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Start the adapter listening for new connections.
     * @param onNewConnection Handler for new connections.
     */
    listen() {
        if (!this.server) {
            // If necessary, create a new web server.
            return new Promise((resolve) => {
                const server = this.server = Restify.createServer({ name: "WebSocket Adapter" });
                this.server.listen(this.port, () => {
                    this.startListening();
                    resolve(server);
                });
            });
        }
        else {
            // Already have a server, so just start listening.
            this.startListening();
            return Promise.resolve(this.server);
        }
    }
    startListening() {
        // Create a server for upgrading HTTP connections to WebSockets.
        const wss = new WS.Server({ server: this.server, verifyClient: verifyClient_1.default });
        // Handle connection upgrades
        wss.on('connection', (ws, request) => {
            log_1.log.info('network', "New WebSocket connection");
            // Read the sessionId header.
            let sessionId = request.headers[Constants.HTTPHeaders.SessionID] || v4_1.default();
            sessionId = decodeURIComponent(sessionId);
            // Parse URL parameters.
            const params = query_string_1.default.parseUrl(request.url).query;
            // Get the client's IP address rather than the last proxy connecting to you.
            const address = forwarded(request, request.headers);
            // Create a WebSocket for the connection.
            const connection = new __2.WebSocket(ws, address.ip);
            // Create a new context for the connection.
            const context = new __2.Context({
                sessionId,
                connection
            });
            // Start the context listening to network traffic.
            context.internal.startListening().catch(() => connection.close());
            // Pass the new context to the app
            this.emitter.emit('connection', context, params);
            // Start context's update loop.
            context.internal.start();
        });
    }
}
exports.WebSocketAdapter = WebSocketAdapter;
//# sourceMappingURL=adapter.js.map