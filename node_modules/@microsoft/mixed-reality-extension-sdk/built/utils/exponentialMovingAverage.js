"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * Computes an Exponentially Weighted Moving Average (EWMA).
 * https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 */
class ExponentialMovingAverage {
    constructor() {
        this.alpha = 0.75;
        this.value = 0;
    }
    /** Computes the latest value given a new sample */
    update(v) {
        if (typeof v === 'number') {
            this.value = this.alpha * v + (1 - this.alpha) * this.value;
        }
    }
}
exports.ExponentialMovingAverage = ExponentialMovingAverage;
//# sourceMappingURL=exponentialMovingAverage.js.map