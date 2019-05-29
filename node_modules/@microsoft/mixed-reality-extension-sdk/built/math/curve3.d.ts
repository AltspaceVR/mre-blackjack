/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Vector3 } from '.';
/**
 * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
 * A Curve3 is designed from a series of successive Vector3.
 * @see https://doc.babylonjs.com/how_to/how_to_use_curve3
 */
export declare class Curve3 {
    private _points;
    private _length;
    /**
     * Returns a Curve3 object along a Quadratic Bezier curve :
     * http://doc.babylonjs.com/tutorials/How_to_use_Curve3#quadratic-bezier-curve
     * @param v0 (Vector3) the origin point of the Quadratic Bezier
     * @param v1 (Vector3) the control point
     * @param v2 (Vector3) the end point of the Quadratic Bezier
     * @param nbPoints (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    static CreateQuadraticBezier(v0: Vector3, v1: Vector3, v2: Vector3, nbPoints: number): Curve3;
    /**
     * Returns a Curve3 object along a Cubic Bezier curve :
     * http://doc.babylonjs.com/tutorials/How_to_use_Curve3#cubic-bezier-curve
     * @param v0 (Vector3) the origin point of the Cubic Bezier
     * @param v1 (Vector3) the first control point
     * @param v2 (Vector3) the second control point
     * @param v3 (Vector3) the end point of the Cubic Bezier
     * @param nbPoints (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    static CreateCubicBezier(v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3, nbPoints: number): Curve3;
    /**
     * Returns a Curve3 object along a Hermite Spline curve :
     * http://doc.babylonjs.com/tutorials/How_to_use_Curve3#hermite-spline
     * @param p1 (Vector3) the origin point of the Hermite Spline
     * @param t1 (Vector3) the tangent vector at the origin point
     * @param p2 (Vector3) the end point of the Hermite Spline
     * @param t2 (Vector3) the tangent vector at the end point
     * @param nbPoints (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    static CreateHermiteSpline(p1: Vector3, t1: Vector3, p2: Vector3, t2: Vector3, nbPoints: number): Curve3;
    /**
     * Returns a Curve3 object along a CatmullRom Spline curve :
     * @param points (array of Vector3) the points the spline must pass through. At least, four points required
     * @param nbPoints (integer) the wanted number of points between each curve control points
     * @param closed (boolean) optional with default false, when true forms a closed loop from the points
     * @returns the created Curve3
     */
    static CreateCatmullRomSpline(points: Vector3[], nbPoints: number, closed?: boolean): Curve3;
    /**
     * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
     * A Curve3 is designed from a series of successive Vector3.
     * Tuto : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#curve3-object
     * @param points points which make up the curve
     */
    constructor(points: Vector3[]);
    /**
     * @returns the Curve3 stored array of successive Vector3
     */
    readonly points: Vector3[];
    /**
     * @returns the computed length (float) of the curve.
     */
    readonly length: number;
    /**
     * Returns a new instance of Curve3 object : const curve = curveA.continue(curveB);
     * This new Curve3 is built by translating and sticking the curveB at the end of the curveA.
     * curveA and curveB keep unchanged.
     * @param curve the curve to continue from this curve
     * @returns the newly constructed curve
     */
    continue(curve: Curve3): Curve3;
    private _computeLength;
}
//# sourceMappingURL=curve3.d.ts.map