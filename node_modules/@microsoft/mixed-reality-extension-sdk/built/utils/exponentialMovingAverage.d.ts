/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 * Computes an Exponentially Weighted Moving Average (EWMA).
 * https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 */
export declare class ExponentialMovingAverage {
    alpha: number;
    value: number;
    /** Computes the latest value given a new sample */
    update(v: number): void;
}
//# sourceMappingURL=exponentialMovingAverage.d.ts.map