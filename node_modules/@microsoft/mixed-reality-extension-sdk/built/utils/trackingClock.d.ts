/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 * Clock to estimate the current server time from a known sample.
 */
export declare class TrackingClock {
    private sampleMs;
    private sampleTimeMs;
    /**
     * Returns the current server time in milliseconds, estimated from last known value.
     */
    readonly nowMs: number;
    /**
     * Updates the last known server time.
     * @param valueMs The value, in milliseconds.
     */
    update(valueMs: number): void;
}
//# sourceMappingURL=trackingClock.d.ts.map