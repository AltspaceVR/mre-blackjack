/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/// <reference types="node" />
import { Adapter } from '.';
/**
 * Sets up an HTTP server, and generates an MRE context for your app to use.
 */
export declare class WebHost {
    private _adapter;
    private _baseDir;
    private _baseUrl;
    readonly adapter: Adapter;
    readonly baseDir: string;
    readonly baseUrl: string;
    private bufferMap;
    constructor(options?: {
        baseDir?: string;
        baseUrl?: string;
        port?: string | number;
    });
    private serveStaticFiles;
    private readonly bufferRegex;
    private serveStaticBuffers;
    /**
     * Serve arbitrary binary blobs from a URL
     * @param filename A unique string ID for the blob
     * @param blob A binary blob
     * @returns The URL to fetch the provided blob
     */
    registerStaticBuffer(filename: string, blob: Buffer): string;
}
//# sourceMappingURL=webHost.d.ts.map