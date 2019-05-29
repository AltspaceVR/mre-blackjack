"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const exponentialMovingAverage_1 = require("../utils/exponentialMovingAverage");
const trackingClock_1 = require("../utils/trackingClock");
// tslint:disable:no-any
/**
 * @hidden
 * Class for tracking connection quality.
 */
class ConnectionQuality {
    constructor() {
        // tslint:disable:variable-name
        this._latencyMs = new exponentialMovingAverage_1.ExponentialMovingAverage();
        this._trackingClock = new trackingClock_1.TrackingClock();
    }
    // tslint:enable:variable-name
    /**
     * Calculates a moving average of latency on the connection.
     */
    get latencyMs() { return this._latencyMs; }
    /**
     * If this is a client, tracks last known "server time" and can estimate current server time.
     * For a most accurate estimate, subtract the value of latency from the current server time.
     */
    get trackingClock() { return this._trackingClock; }
}
exports.ConnectionQuality = ConnectionQuality;
//# sourceMappingURL=connection.js.map