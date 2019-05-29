"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Restify = __importStar(require("restify"));
const _1 = require(".");
const log_1 = require("./log");
const url_1 = require("url");
const BUFFER_KEYWORD = 'buffers';
/**
 * Sets up an HTTP server, and generates an MRE context for your app to use.
 */
class WebHost {
    constructor(options = {}) {
        this.bufferMap = {};
        this.bufferRegex = new RegExp(`^/${BUFFER_KEYWORD}/(.+)$`);
        const pjson = require('../package.json');
        log_1.log.info('app', `Node: ${process.version}`);
        log_1.log.info('app', `${pjson.name}: v${pjson.version}`);
        this._baseDir = options.baseDir || process.env.BASE_DIR;
        this._baseUrl = options.baseUrl || process.env.BASE_URL;
        // Azure defines WEBSITE_HOSTNAME.
        if (!this._baseUrl && process.env.WEBSITE_HOSTNAME) {
            this._baseUrl = `https://${process.env.WEBSITE_HOSTNAME}`;
        }
        // Resolve the port number. Heroku defines a PORT environment var (remapped from 80).
        const port = options.port || process.env.PORT || 3901;
        // Create a Multi-peer adapter
        this._adapter = new _1.MultipeerAdapter({ port });
        // Start listening for new app connections from a multi-peer client.
        this._adapter.listen()
            .then(server => {
            this._baseUrl = this._baseUrl || server.url.replace(/\[::\]/, '127.0.0.1');
            log_1.log.info('app', `${server.name} listening on ${JSON.stringify(server.address())}`);
            log_1.log.info('app', `baseUrl: ${this.baseUrl}`);
            log_1.log.info('app', `baseDir: ${this.baseDir}`);
            if (!!this.baseDir) {
                this.serveStaticFiles(server);
            }
        })
            .catch(reason => log_1.log.error('app', `Failed to start HTTP server: ${reason}`));
    }
    // tslint:enable:variable-name
    get adapter() { return this._adapter; }
    get baseDir() { return this._baseDir; }
    get baseUrl() { return this._baseUrl; }
    serveStaticFiles(server) {
        server.get('/*', 
        // host static binaries
        (req, res, next) => this.serveStaticBuffers(req, res, next), 
        // host static files
        Restify.plugins.serveStatic({
            directory: this._baseDir,
            default: 'index.html'
        }));
    }
    serveStaticBuffers(req, res, next) {
        // grab path part of URL
        const matches = this.bufferRegex.exec(req.url);
        const procPath = matches && matches[1] || null;
        // see if there's a handler registered for it
        if (!procPath || !this.bufferMap[procPath]) {
            return next();
        }
        // if so, serve binary
        res.sendRaw(200, this.bufferMap[procPath]);
        next();
    }
    /**
     * Serve arbitrary binary blobs from a URL
     * @param filename A unique string ID for the blob
     * @param blob A binary blob
     * @returns The URL to fetch the provided blob
     */
    registerStaticBuffer(filename, blob) {
        this.bufferMap[filename] = blob;
        return url_1.resolve(this._baseUrl, `${BUFFER_KEYWORD}/${filename}`);
    }
}
exports.WebHost = WebHost;
//# sourceMappingURL=webHost.js.map