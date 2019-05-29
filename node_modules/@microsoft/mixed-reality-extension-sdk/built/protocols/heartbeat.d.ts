/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Protocol } from '.';
/**
 * @hidden
 * Periodically measures performance characteristics of the connection (latency).
 */
export declare class Heartbeat {
    private protocol;
    /**
     * Creates a new Heartbeat instance.
     * @param protocol The parent protocol object.
     */
    constructor(protocol: Protocol);
    /**
     * Polls connection quality the specified number of times.
     */
    runIterations(sampleCount: number): Promise<void>;
    send(): Promise<number>;
}
//# sourceMappingURL=heartbeat.d.ts.map