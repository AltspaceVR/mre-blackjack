"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * Clock to estimate the current server time from a known sample.
 */
class TrackingClock {
    constructor() {
        this.sampleMs = 0;
        this.sampleTimeMs = Date.now();
    }
    /**
     * Returns the current server time in milliseconds, estimated from last known value.
     */
    get nowMs() {
        if (this.sampleTimeMs > 0) {
            const currentTimeMs = Date.now();
            const timespanMs = currentTimeMs - this.sampleTimeMs;
            const estimatedTimeMs = (this.sampleMs + timespanMs);
            return estimatedTimeMs;
        }
        else {
            return 0;
        }
    }
    /**
     * Updates the last known server time.
     * @param valueMs The value, in milliseconds.
     */
    update(valueMs) {
        if (valueMs > this.sampleMs) {
            this.sampleMs = valueMs;
            this.sampleTimeMs = Date.now();
        }
    }
}
exports.TrackingClock = TrackingClock;
//# sourceMappingURL=trackingClock.js.map