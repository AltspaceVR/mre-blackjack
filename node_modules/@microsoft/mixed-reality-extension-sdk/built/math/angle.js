"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:variable-name member-ordering
/**
 * Defines angle representation
 */
class Angle {
    /**
     * Creates an Angle object of "radians" radians (float).
     */
    constructor(_radians) {
        this._radians = _radians;
        if (this._radians < 0.0) {
            this._radians += (2.0 * Math.PI);
        }
    }
    /**
     * Get value in degrees
     * @returns the Angle value in degrees (float)
     */
    degrees() {
        return this._radians * 180.0 / Math.PI;
    }
    /**
     * Get value in radians
     * @returns the Angle value in radians (float)
     */
    radians() {
        return this._radians;
    }
    /**
     * Gets a new Angle object valued with the angle value in radians between the two given vectors
     * @param a defines first vector
     * @param b defines second vector
     * @returns a new Angle
     */
    static BetweenTwoPoints(a, b) {
        const delta = b.subtract(a);
        const theta = Math.atan2(delta.y, delta.x);
        return new Angle(theta);
    }
    /**
     * Gets a new Angle object from the given float in radians
     * @param radians defines the angle value in radians
     * @returns a new Angle
     */
    static FromRadians(radians) {
        return new Angle(radians);
    }
    /**
     * Gets a new Angle object from the given float in degrees
     * @param degrees defines the angle value in degrees
     * @returns a new Angle
     */
    static FromDegrees(degrees) {
        return new Angle(degrees * Math.PI / 180.0);
    }
}
exports.Angle = Angle;
//# sourceMappingURL=angle.js.map