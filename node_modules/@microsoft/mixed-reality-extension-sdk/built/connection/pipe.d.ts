/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Connection } from '.';
/**
 * @hidden
 * Class representing two connected endpoints, allowing them to send and receive to and from one another
 */
export declare class Pipe {
    private _local;
    private _remote;
    readonly local: Connection;
    readonly remote: Connection;
    constructor();
    private onLocalClose;
    private onRemoteClose;
}
//# sourceMappingURL=pipe.d.ts.map