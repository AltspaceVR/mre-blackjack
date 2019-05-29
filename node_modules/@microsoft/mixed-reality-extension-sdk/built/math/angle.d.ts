/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Vector2 } from '.';
/**
 * Defines angle representation
 */
export declare class Angle {
    private _radians;
    /**
     * Creates an Angle object of "radians" radians (float).
     */
    constructor(_radians: number);
    /**
     * Get value in degrees
     * @returns the Angle value in degrees (float)
     */
    degrees(): number;
    /**
     * Get value in radians
     * @returns the Angle value in radians (float)
     */
    radians(): number;
    /**
     * Gets a new Angle object valued with the angle value in radians between the two given vectors
     * @param a defines first vector
     * @param b defines second vector
     * @returns a new Angle
     */
    static BetweenTwoPoints(a: Vector2, b: Vector2): Angle;
    /**
     * Gets a new Angle object from the given float in radians
     * @param radians defines the angle value in radians
     * @returns a new Angle
     */
    static FromRadians(radians: number): Angle;
    /**
     * Gets a new Angle object from the given float in degrees
     * @param degrees defines the angle value in degrees
     * @returns a new Angle
     */
    static FromDegrees(degrees: number): Angle;
}
//# sourceMappingURL=angle.d.ts.map