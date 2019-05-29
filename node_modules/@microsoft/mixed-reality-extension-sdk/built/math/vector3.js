"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const tmp_1 = require("./tmp");
/**
 * Classed used to store (x,y,z) vector representation
 * A Vector3 is the main object used in 3D geometry
 * It can represent etiher the coordinates of a point the space, either a direction
 * Reminder: Babylon.js uses a left handed forward facing system
 */
class Vector3 {
    /**
     * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
     * @param x defines the first coordinates (on X axis)
     * @param y defines the second coordinates (on Y axis)
     * @param z defines the third coordinates (on Z axis)
     */
    constructor(
    /**
     * Defines the first coordinates (on X axis)
     */
    x = 0, 
    /**
     * Defines the second coordinates (on Y axis)
     */
    y = 0, 
    /**
     * Defines the third coordinates (on Z axis)
     */
    z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Gets a boolean indicating that the vector is non uniform meaning x, y or z are not all the same
     */
    get isNonUniform() {
        const absX = Math.abs(this.x);
        const absY = Math.abs(this.y);
        if (absX !== absY) {
            return true;
        }
        const absZ = Math.abs(this.z);
        if (absX !== absZ) {
            return true;
        }
        if (absY !== absZ) {
            return true;
        }
        return false;
    }
    // Statics
    /**
     * Get the clip factor between two vectors
     * @param vector0 defines the first operand
     * @param vector1 defines the second operand
     * @param axis defines the axis to use
     * @param size defines the size along the axis
     * @returns the clip factor
     */
    static GetClipFactor(vector0, vector1, axis, size) {
        const d0 = Vector3.Dot(vector0, axis) - size;
        const d1 = Vector3.Dot(vector1, axis) - size;
        const s = d0 / (d0 - d1);
        return s;
    }
    /**
     * Get angle between two vectors
     * @param vector0 angle between vector0 and vector1
     * @param vector1 angle between vector0 and vector1
     * @param normal direction of the normal
     * @return the angle between vector0 and vector1
     */
    static GetAngleBetweenVectors(vector0, vector1, normal) {
        const v0 = vector0.normalizeToRef(tmp_1.MathTmp.Vector3[1]);
        const v1 = vector1.normalizeToRef(tmp_1.MathTmp.Vector3[2]);
        const dot = Vector3.Dot(v0, v1);
        const n = tmp_1.MathTmp.Vector3[3];
        Vector3.CrossToRef(v0, v1, n);
        if (Vector3.Dot(n, normal) > 0) {
            return Math.acos(dot);
        }
        return -Math.acos(dot);
    }
    /**
     * Returns a new Vector3 set from the index "offset" of the given array
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @returns the new Vector3
     */
    static FromArray(array, offset = 0) {
        return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
    }
    /**
     * Returns a new Vector3 set from the index "offset" of the given Float32Array
     * This function is deprecated. Use FromArray instead
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @returns the new Vector3
     */
    static FromFloatArray(array, offset) {
        return Vector3.FromArray(array, offset);
    }
    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given array
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @param result defines the Vector3 where to store the result
     */
    static FromArrayToRef(array, offset, result) {
        result.x = array[offset];
        result.y = array[offset + 1];
        result.z = array[offset + 2];
    }
    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given Float32Array
     * This function is deprecated.  Use FromArrayToRef instead.
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @param result defines the Vector3 where to store the result
     */
    static FromFloatArrayToRef(array, offset, result) {
        return Vector3.FromArrayToRef(array, offset, result);
    }
    /**
     * Sets the given vector "result" with the given floats.
     * @param x defines the x coordinate of the source
     * @param y defines the y coordinate of the source
     * @param z defines the z coordinate of the source
     * @param result defines the Vector3 where to store the result
     */
    static FromFloatsToRef(x, y, z, result) {
        result.copyFromFloats(x, y, z);
    }
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 0.0)
     * @returns a new empty Vector3
     */
    static Zero() {
        return new Vector3(0.0, 0.0, 0.0);
    }
    /**
     * Returns a new Vector3 set to (1.0, 1.0, 1.0)
     * @returns a new unit Vector3
     */
    static One() {
        return new Vector3(1.0, 1.0, 1.0);
    }
    /**
     * Returns a new Vector3 set to (0.0, 1.0, 0.0)
     * @returns a new up Vector3
     */
    static Up() {
        return new Vector3(0.0, 1.0, 0.0);
    }
    /**
     * Returns a new Vector3 set to (0.0, -1.0, 0.0)
     * @returns a new down Vector3
     */
    static Down() {
        return new Vector3(0.0, -1.0, 0.0);
    }
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 1.0)
     * @returns a new forward Vector3
     */
    static Forward() {
        return new Vector3(0.0, 0.0, 1.0);
    }
    /**
     * Returns a new Vector3 set to (0.0, 0.0, -1.0)
     * @returns a new forward Vector3
     */
    static Backward() {
        return new Vector3(0.0, 0.0, -1.0);
    }
    /**
     * Returns a new Vector3 set to (1.0, 0.0, 0.0)
     * @returns a new right Vector3
     */
    static Right() {
        return new Vector3(1.0, 0.0, 0.0);
    }
    /**
     * Returns a new Vector3 set to (-1.0, 0.0, 0.0)
     * @returns a new left Vector3
     */
    static Left() {
        return new Vector3(-1.0, 0.0, 0.0);
    }
    /**
     * Returns a new Vector3 set with the result of the transformation by the given matrix of the given vector.
     * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @returns the transformed Vector3
     */
    static TransformCoordinates(vector, transformation) {
        const result = Vector3.Zero();
        Vector3.TransformCoordinatesToRef(vector, transformation, result);
        return result;
    }
    /**
     * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
     * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformCoordinatesToRef(vector, transformation, result) {
        return Vector3.TransformCoordinatesFromFloatsToRef(vector.x, vector.y, vector.z, transformation, result);
    }
    /**
     * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
     * This method computes tranformed coordinates only, not transformed direction vectors
     * @param x define the x coordinate of the source vector
     * @param y define the y coordinate of the source vector
     * @param z define the z coordinate of the source vector
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformCoordinatesFromFloatsToRef(x, y, z, transformation, result) {
        const m = transformation.m;
        const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
        const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
        const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
        const rw = 1 / (x * m[3] + y * m[7] + z * m[11] + m[15]);
        result.x = rx * rw;
        result.y = ry * rw;
        result.z = rz * rw;
    }
    /**
     * Returns a new Vector3 set with the result of the normal transformation by the given matrix of the given vector
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @returns the new Vector3
     */
    static TransformNormal(vector, transformation) {
        const result = Vector3.Zero();
        Vector3.TransformNormalToRef(vector, transformation, result);
        return result;
    }
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformNormalToRef(vector, transformation, result) {
        this.TransformNormalFromFloatsToRef(vector.x, vector.y, vector.z, transformation, result);
    }
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z)
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param x define the x coordinate of the source vector
     * @param y define the y coordinate of the source vector
     * @param z define the z coordinate of the source vector
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformNormalFromFloatsToRef(x, y, z, transformation, result) {
        const m = transformation.m;
        result.x = x * m[0] + y * m[4] + z * m[8];
        result.y = x * m[1] + y * m[5] + z * m[9];
        result.z = x * m[2] + y * m[6] + z * m[10];
    }
    /**
     * Returns a new Vector3 located for "amount" on the CatmullRom interpolation spline defined by the vectors "value1", "value2", "value3", "value4"
     * @param value1 defines the first control point
     * @param value2 defines the second control point
     * @param value3 defines the third control point
     * @param value4 defines the fourth control point
     * @param amount defines the amount on the spline to use
     * @returns the new Vector3
     */
    static CatmullRom(value1, value2, value3, value4, amount) {
        const squared = amount * amount;
        const cubed = amount * squared;
        const x = 0.5 * ((((2.0 * value2.x) + ((-value1.x + value3.x) * amount)) +
            (((((2.0 * value1.x) - (5.0 * value2.x)) + (4.0 * value3.x)) - value4.x) * squared)) +
            ((((-value1.x + (3.0 * value2.x)) - (3.0 * value3.x)) + value4.x) * cubed));
        const y = 0.5 * ((((2.0 * value2.y) + ((-value1.y + value3.y) * amount)) +
            (((((2.0 * value1.y) - (5.0 * value2.y)) + (4.0 * value3.y)) - value4.y) * squared)) +
            ((((-value1.y + (3.0 * value2.y)) - (3.0 * value3.y)) + value4.y) * cubed));
        const z = 0.5 * ((((2.0 * value2.z) + ((-value1.z + value3.z) * amount)) +
            (((((2.0 * value1.z) - (5.0 * value2.z)) + (4.0 * value3.z)) - value4.z) * squared)) +
            ((((-value1.z + (3.0 * value2.z)) - (3.0 * value3.z)) + value4.z) * cubed));
        return new Vector3(x, y, z);
    }
    /**
     * Returns a new Vector3 set with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value defines the current value
     * @param min defines the lower range value
     * @param max defines the upper range value
     * @returns the new Vector3
     */
    static Clamp(value, min, max) {
        const v = new Vector3();
        Vector3.ClampToRef(value, min, max, v);
        return v;
    }
    /**
     * Sets the given vector "result" with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value defines the current value
     * @param min defines the lower range value
     * @param max defines the upper range value
     * @param result defines the Vector3 where to store the result
     */
    static ClampToRef(value, min, max, result) {
        let x = value.x;
        x = (x > max.x) ? max.x : x;
        x = (x < min.x) ? min.x : x;
        let y = value.y;
        y = (y > max.y) ? max.y : y;
        y = (y < min.y) ? min.y : y;
        let z = value.z;
        z = (z > max.z) ? max.z : z;
        z = (z < min.z) ? min.z : z;
        result.copyFromFloats(x, y, z);
    }
    /**
     * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
     * @param value1 defines the first control point
     * @param tangent1 defines the first tangent vector
     * @param value2 defines the second control point
     * @param tangent2 defines the second tangent vector
     * @param amount defines the amount on the interpolation spline (between 0 and 1)
     * @returns the new Vector3
     */
    static Hermite(value1, tangent1, value2, tangent2, amount) {
        const squared = amount * amount;
        const cubed = amount * squared;
        const part1 = ((2.0 * cubed) - (3.0 * squared)) + 1.0;
        const part2 = (-2.0 * cubed) + (3.0 * squared);
        const part3 = (cubed - (2.0 * squared)) + amount;
        const part4 = cubed - squared;
        const x = (((value1.x * part1) + (value2.x * part2)) + (tangent1.x * part3)) + (tangent2.x * part4);
        const y = (((value1.y * part1) + (value2.y * part2)) + (tangent1.y * part3)) + (tangent2.y * part4);
        const z = (((value1.z * part1) + (value2.z * part2)) + (tangent1.z * part3)) + (tangent2.z * part4);
        return new Vector3(x, y, z);
    }
    /**
     * Returns a new Vector3 located for "amount" (float) on the linear interpolation between the vectors "start" and "end"
     * @param start defines the start value
     * @param end defines the end value
     * @param amount max defines amount between both (between 0 and 1)
     * @returns the new Vector3
     */
    static Lerp(start, end, amount) {
        const result = new Vector3(0, 0, 0);
        Vector3.LerpToRef(start, end, amount, result);
        return result;
    }
    /**
     * Sets the given vector "result" with the result of the linear interpolation from the vector "start" for "amount" to the vector "end"
     * @param start defines the start value
     * @param end defines the end value
     * @param amount max defines amount between both (between 0 and 1)
     * @param result defines the Vector3 where to store the result
     */
    static LerpToRef(start, end, amount, result) {
        result.x = start.x + ((end.x - start.x) * amount);
        result.y = start.y + ((end.y - start.y) * amount);
        result.z = start.z + ((end.z - start.z) * amount);
    }
    /**
     * Returns the dot product (float) between the vectors "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @returns the dot product
     */
    static Dot(left, right) {
        return (left.x * right.x + left.y * right.y + left.z * right.z);
    }
    /**
     * Returns a new Vector3 as the cross product of the vectors "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @returns the cross product
     */
    static Cross(left, right) {
        const result = Vector3.Zero();
        Vector3.CrossToRef(left, right, result);
        return result;
    }
    /**
     * Sets the given vector "result" with the cross product of "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @param result defines the Vector3 where to store the result
     */
    static CrossToRef(left, right, result) {
        const x = left.y * right.z - left.z * right.y;
        const y = left.z * right.x - left.x * right.z;
        const z = left.x * right.y - left.y * right.x;
        result.copyFromFloats(x, y, z);
    }
    /**
     * Returns a new Vector3 as the normalization of the given vector
     * @param vector defines the Vector3 to normalize
     * @returns the new Vector3
     */
    static Normalize(vector) {
        const result = Vector3.Zero();
        Vector3.NormalizeToRef(vector, result);
        return result;
    }
    /**
     * Sets the given vector "result" with the normalization of the given first vector
     * @param vector defines the Vector3 to normalize
     * @param result defines the Vector3 where to store the result
     */
    static NormalizeToRef(vector, result) {
        vector.normalizeToRef(result);
    }
    /**
     * Project a Vector3 onto screen space
     * @param vector defines the Vector3 to project
     * @param world defines the world matrix to use
     * @param transform defines the transform (view x projection) matrix to use
     * @param viewport defines the screen viewport to use
     * @returns the new Vector3
     */
    static Project(vector, world, transform, viewport) {
        const cw = viewport.width;
        const ch = viewport.height;
        const cx = viewport.x;
        const cy = viewport.y;
        const viewportMatrix = tmp_1.MathTmp.Matrix[1];
        _1.Matrix.FromValuesToRef(cw / 2.0, 0, 0, 0, 0, -ch / 2.0, 0, 0, 0, 0, 0.5, 0, cx + cw / 2.0, ch / 2.0 + cy, 0.5, 1, viewportMatrix);
        const matrix = tmp_1.MathTmp.Matrix[0];
        world.multiplyToRef(transform, matrix);
        matrix.multiplyToRef(viewportMatrix, matrix);
        return Vector3.TransformCoordinates(vector, matrix);
    }
    /**
     * Unproject from screen space to object space
     * @param source defines the screen space Vector3 to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param transform defines the transform (view x projection) matrix to use
     * @returns the new Vector3
     */
    static UnprojectFromTransform(source, viewportWidth, viewportHeight, world, transform) {
        const matrix = tmp_1.MathTmp.Matrix[0];
        world.multiplyToRef(transform, matrix);
        matrix.invert();
        source.x = source.x / viewportWidth * 2 - 1;
        source.y = -(source.y / viewportHeight * 2 - 1);
        const vector = new Vector3();
        Vector3.UnprojectFromInvertedMatrixToRef(source, matrix, vector);
        return vector;
    }
    /**
     * Unproject from screen space to object space
     * @param source defines the screen space Vector3 to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @returns the new Vector3
     */
    static Unproject(source, viewportWidth, viewportHeight, world, view, projection) {
        const result = Vector3.Zero();
        Vector3.UnprojectToRef(source, viewportWidth, viewportHeight, world, view, projection, result);
        return result;
    }
    /**
     * Unproject from screen space to object space
     * @param source defines the screen space Vector3 to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @param result defines the Vector3 where to store the result
     */
    static UnprojectToRef(source, viewportWidth, viewportHeight, world, view, projection, result) {
        Vector3.UnprojectFloatsToRef(source.x, source.y, source.z, viewportWidth, viewportHeight, world, view, projection, result);
    }
    /**
     * Unproject from screen space to object space
     * @param sourceX defines the screen space x coordinate to use
     * @param sourceY defines the screen space y coordinate to use
     * @param sourceZ defines the screen space z coordinate to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @param result defines the Vector3 where to store the result
     */
    static UnprojectFloatsToRef(sourceX, sourceY, sourceZ, viewportWidth, viewportHeight, world, view, projection, result) {
        const matrix = tmp_1.MathTmp.Matrix[0];
        world.multiplyToRef(view, matrix);
        matrix.multiplyToRef(projection, matrix);
        matrix.invert();
        const screenSource = tmp_1.MathTmp.Vector3[0];
        screenSource.x = sourceX / viewportWidth * 2 - 1;
        screenSource.y = -(sourceY / viewportHeight * 2 - 1);
        screenSource.z = 2 * sourceZ - 1.0;
        Vector3.UnprojectFromInvertedMatrixToRef(screenSource, matrix, result);
    }
    /**
     * Unproject a ray from screen space to object space
     * @param sourceX defines the screen space x coordinate to use
     * @param sourceY defines the screen space y coordinate to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @param ray defines the Ray where to store the result
     */
    /*static UnprojectRayToRef(sourceX: float, sourceY: float, viewportWidth: number, viewportHeight: number, world: Readonly<Matrix>, view: Readonly<Matrix>, projection: Readonly<Matrix>, ray: Ray): void {
        var matrix = MathTmp.Matrix[0];
        world.multiplyToRef(view, matrix);
        matrix.multiplyToRef(projection, matrix);
        matrix.invert();
        var nearScreenSource = MathTmp.Vector3[0];
        nearScreenSource.x = sourceX / viewportWidth * 2 - 1;
        nearScreenSource.y = -(sourceY / viewportHeight * 2 - 1);
        nearScreenSource.z = -1.0;
        var farScreenSource = MathTmp.Vector3[1].copyFromFloats(nearScreenSource.x, nearScreenSource.y, 1.0);
        const nearVec3 = MathTmp.Vector3[2];
        const farVec3 = MathTmp.Vector3[3];
        Vector3.UnprojectFromInvertedMatrixToRef(nearScreenSource, matrix, nearVec3);
        Vector3.UnprojectFromInvertedMatrixToRef(farScreenSource, matrix, farVec3);

        ray.origin.copyFrom(nearVec3);
        farVec3.subtractToRef(nearVec3, ray.direction);
        ray.direction.normalize();
    }*/
    /**
     * Gets the minimal coordinate values between two Vector3
     * @param left defines the first operand
     * @param right defines the second operand
     * @returns the new Vector3
     */
    static Minimize(left, right) {
        const min = left.clone();
        min.minimizeInPlace(right);
        return min;
    }
    /**
     * Gets the maximal coordinate values between two Vector3
     * @param left defines the first operand
     * @param right defines the second operand
     * @returns the new Vector3
     */
    static Maximize(left, right) {
        const max = left.clone();
        max.maximizeInPlace(right);
        return max;
    }
    /**
     * Returns the distance between the vectors "value1" and "value2"
     * @param value1 defines the first operand
     * @param value2 defines the second operand
     * @returns the distance
     */
    static Distance(value1, value2) {
        return Math.sqrt(Vector3.DistanceSquared(value1, value2));
    }
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 defines the first operand
     * @param value2 defines the second operand
     * @returns the squared distance
     */
    static DistanceSquared(value1, value2) {
        const x = value1.x - value2.x;
        const y = value1.y - value2.y;
        const z = value1.z - value2.z;
        return (x * x) + (y * y) + (z * z);
    }
    /**
     * Returns a new Vector3 located at the center between "value1" and "value2"
     * @param value1 defines the first operand
     * @param value2 defines the second operand
     * @returns the new Vector3
     */
    static Center(value1, value2) {
        const center = value1.add(value2);
        center.scaleInPlace(0.5);
        return center;
    }
    /**
     * Given three orthogonal normalized left-handed oriented Vector3 axis in space (target system),
     * RotationFromAxis() returns the rotation Euler angles (ex : rotation.x, rotation.y, rotation.z) to apply
     * to something in order to rotate it from its local system to the given target system
     * Note: axis1, axis2 and axis3 are normalized during this operation
     * @param axis1 defines the first axis
     * @param axis2 defines the second axis
     * @param axis3 defines the third axis
     * @returns a new Vector3
     */
    static RotationFromAxis(axis1, axis2, axis3) {
        const rotation = Vector3.Zero();
        Vector3.RotationFromAxisToRef(axis1, axis2, axis3, rotation);
        return rotation;
    }
    /**
     * The same than RotationFromAxis but updates the given ref Vector3 parameter instead of returning a new Vector3
     * @param axis1 defines the first axis
     * @param axis2 defines the second axis
     * @param axis3 defines the third axis
     * @param ref defines the Vector3 where to store the result
     */
    static RotationFromAxisToRef(axis1, axis2, axis3, ref) {
        const quat = tmp_1.MathTmp.Quaternion[0];
        _1.Quaternion.RotationQuaternionFromAxisToRef(axis1, axis2, axis3, quat);
        quat.toEulerAnglesToRef(ref);
    }
    /**
     * @hidden
     */
    static UnprojectFromInvertedMatrixToRef(source, matrix, result) {
        Vector3.TransformCoordinatesToRef(source, matrix, result);
        const m = matrix.m;
        const num = source.x * m[3] + source.y * m[7] + source.z * m[11] + m[15];
        if (_1.Scalar.WithinEpsilon(num, 1.0)) {
            result.scaleInPlace(1.0 / num);
        }
    }
    /**
     * Creates a string representation of the Vector3
     * @returns a string with the Vector3 coordinates.
     */
    toString() {
        return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + "}";
    }
    /**
     * Returns a JSON representation of this vector. This is necessary due to the way
     * Actors detect changes on components like the actor's transform. They do this by adding
     * properties for observation, and we don't want these properties serialized.
     */
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
        };
    }
    /**
     * Gets the class name
     * @returns the string "Vector3"
     */
    getClassName() {
        return "Vector3";
    }
    /**
     * Creates the Vector3 hash code
     * @returns a number which tends to be unique between Vector3 instances
     */
    getHashCode() {
        let hash = this.x || 0;
        hash = (hash * 397) ^ (this.y || 0);
        hash = (hash * 397) ^ (this.z || 0);
        return hash;
    }
    // Operators
    /**
     * Creates an array containing three elements : the coordinates of the Vector3
     * @returns a new array of numbers
     */
    asArray() {
        const result = [];
        this.toArray(result, 0);
        return result;
    }
    /**
     * Populates the given array or Float32Array from the given index with the successive coordinates of the Vector3
     * @param array defines the destination array
     * @param index defines the offset in the destination array
     * @returns the current Vector3
     */
    toArray(array, index = 0) {
        array[index] = this.x;
        array[index + 1] = this.y;
        array[index + 2] = this.z;
        return this;
    }
    /**
     * Converts the current Vector3 into a quaternion (considering that the Vector3 contains Euler angles representation of a rotation)
     * @returns a new Quaternion object, computed from the Vector3 coordinates
     */
    toQuaternion() {
        return _1.Quaternion.RotationYawPitchRoll(this.y, this.x, this.z);
    }
    /**
     * Adds the given vector to the current Vector3
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    addInPlace(otherVector) {
        return this.addInPlaceFromFloats(otherVector.x, otherVector.y, otherVector.z);
    }
    /**
     * Adds the given coordinates to the current Vector3
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    addInPlaceFromFloats(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    /**
     * Gets a new Vector3, result of the addition the current Vector3 and the given vector
     * @param otherVector defines the second operand
     * @returns the resulting Vector3
     */
    add(otherVector) {
        return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
    }
    /**
     * Adds the current Vector3 to the given one and stores the result in the vector "result"
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    addToRef(otherVector, result) {
        return result.copyFromFloats(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
    }
    /**
     * Subtract the given vector from the current Vector3
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    subtractInPlace(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        this.z -= otherVector.z;
        return this;
    }
    /**
     * Returns a new Vector3, result of the subtraction of the given vector from the current Vector3
     * @param otherVector defines the second operand
     * @returns the resulting Vector3
     */
    subtract(otherVector) {
        return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
    }
    /**
     * Subtracts the given vector from the current Vector3 and stores the result in the vector "result".
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractToRef(otherVector, result) {
        return this.subtractFromFloatsToRef(otherVector.x, otherVector.y, otherVector.z, result);
    }
    /**
     * Returns a new Vector3 set with the subtraction of the given floats from the current Vector3 coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the resulting Vector3
     */
    subtractFromFloats(x, y, z) {
        return new Vector3(this.x - x, this.y - y, this.z - z);
    }
    /**
     * Subtracts the given floats from the current Vector3 coordinates and set the given vector "result" with this result
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractFromFloatsToRef(x, y, z, result) {
        return result.copyFromFloats(this.x - x, this.y - y, this.z - z);
    }
    /**
     * Gets a new Vector3 set with the current Vector3 negated coordinates
     * @returns a new Vector3
     */
    negate() {
        return new Vector3(-this.x, -this.y, -this.z);
    }
    /**
     * Multiplies the Vector3 coordinates by the float "scale"
     * @param scale defines the multiplier factor
     * @returns the current updated Vector3
     */
    scaleInPlace(scale) {
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        return this;
    }
    /**
     * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
     * @param scale defines the multiplier factor
     * @returns a new Vector3
     */
    scale(scale) {
        return new Vector3(this.x * scale, this.y * scale, this.z * scale);
    }
    /**
     * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
     * @param scale defines the multiplier factor
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    scaleToRef(scale, result) {
        return result.copyFromFloats(this.x * scale, this.y * scale, this.z * scale);
    }
    /**
     * Scale the current Vector3 values by a factor and add the result to a given Vector3
     * @param scale defines the scale factor
     * @param result defines the Vector3 object where to store the result
     * @returns the unmodified current Vector3
     */
    scaleAndAddToRef(scale, result) {
        return result.addInPlaceFromFloats(this.x * scale, this.y * scale, this.z * scale);
    }
    /**
     * Returns true if the current Vector3 and the given vector coordinates are strictly equal
     * @param otherVector defines the second operand
     * @returns true if both vectors are equals
     */
    equals(otherVector) {
        return otherVector && this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
    }
    /**
     * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
     * @param otherVector defines the second operand
     * @param epsilon defines the minimal distance to define values as equals
     * @returns true if both vectors are distant less than epsilon
     */
    equalsWithEpsilon(otherVector, epsilon = _1.Epsilon) {
        return otherVector && _1.Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) && _1.Scalar.WithinEpsilon(this.y, otherVector.y, epsilon) && _1.Scalar.WithinEpsilon(this.z, otherVector.z, epsilon);
    }
    /**
     * Returns true if the current Vector3 coordinates equals the given floats
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns true if both vectors are equals
     */
    equalsToFloats(x, y, z) {
        return this.x === x && this.y === y && this.z === z;
    }
    /**
     * Multiplies the current Vector3 coordinates by the given ones
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    multiplyInPlace(otherVector) {
        this.x *= otherVector.x;
        this.y *= otherVector.y;
        this.z *= otherVector.z;
        return this;
    }
    /**
     * Returns a new Vector3, result of the multiplication of the current Vector3 by the given vector
     * @param otherVector defines the second operand
     * @returns the new Vector3
     */
    multiply(otherVector) {
        return this.multiplyByFloats(otherVector.x, otherVector.y, otherVector.z);
    }
    /**
     * Multiplies the current Vector3 by the given one and stores the result in the given vector "result"
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    multiplyToRef(otherVector, result) {
        return result.copyFromFloats(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z);
    }
    /**
     * Returns a new Vector3 set with the result of the mulliplication of the current Vector3 coordinates by the given floats
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the new Vector3
     */
    multiplyByFloats(x, y, z) {
        return new Vector3(this.x * x, this.y * y, this.z * z);
    }
    /**
     * Returns a new Vector3 set with the result of the division of the current Vector3 coordinates by the given ones
     * @param otherVector defines the second operand
     * @returns the new Vector3
     */
    divide(otherVector) {
        return new Vector3(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
    }
    /**
     * Divides the current Vector3 coordinates by the given ones and stores the result in the given vector "result"
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    divideToRef(otherVector, result) {
        return result.copyFromFloats(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
    }
    /**
     * Divides the current Vector3 coordinates by the given ones.
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    divideInPlace(otherVector) {
        return this.divideToRef(otherVector, this);
    }
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given vector ones
     * @param other defines the second operand
     * @returns the current updated Vector3
     */
    minimizeInPlace(other) {
        return this.minimizeInPlaceFromFloats(other.x, other.y, other.z);
    }
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given vector ones.
     * @param other defines the second operand
     * @returns the current updated Vector3
     */
    maximizeInPlace(other) {
        return this.maximizeInPlaceFromFloats(other.x, other.y, other.z);
    }
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    minimizeInPlaceFromFloats(x, y, z) {
        if (x < this.x) {
            this.x = x;
        }
        if (y < this.y) {
            this.y = y;
        }
        if (z < this.z) {
            this.z = z;
        }
        return this;
    }
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given coordinates.
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    maximizeInPlaceFromFloats(x, y, z) {
        if (x > this.x) {
            this.x = x;
        }
        if (y > this.y) {
            this.y = y;
        }
        if (z > this.z) {
            this.z = z;
        }
        return this;
    }
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    floor() {
        return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    fract() {
        return new Vector3(this.x - Math.floor(this.x), this.y - Math.floor(this.y), this.z - Math.floor(this.z));
    }
    // Properties
    /**
     * Gets the length of the Vector3
     * @returns the length of the Vecto3
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Gets the squared length of the Vector3
     * @returns squared length of the Vector3
     */
    lengthSquared() {
        return (this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Normalize the current Vector3.
     * Please note that this is an in place operation.
     * @returns the current updated Vector3
     */
    normalize() {
        return this.normalizeFromLength(this.length());
    }
    /**
     * Reorders the x y z properties of the vector in place
     * @param order new ordering of the properties (eg. for vector 1,2,3 with "ZYX" will produce 3,2,1)
     * @returns the current updated vector
     */
    reorderInPlace(order) {
        order = order.toLowerCase();
        if (order === "xyz") {
            return this;
        }
        tmp_1.MathTmp.Vector3[0].copyFrom(this);
        ["x", "y", "z"].forEach((val, i) => {
            // tslint:disable-next-line:no-any
            this[val] = tmp_1.MathTmp.Vector3[0][order[i]];
        });
        return this;
    }
    /**
     * Rotates the vector around 0,0,0 by a quaternion
     * @param quaternion the rotation quaternion
     * @param result vector to store the result
     * @returns the resulting vector
     */
    rotateByQuaternionToRef(quaternion, result) {
        quaternion.toRotationMatrix(tmp_1.MathTmp.Matrix[0]);
        Vector3.TransformCoordinatesToRef(this, tmp_1.MathTmp.Matrix[0], result);
        return result;
    }
    /**
     * Rotates a vector around a given point
     * @param quaternion the rotation quaternion
     * @param point the point to rotate around
     * @param result vector to store the result
     * @returns the resulting vector
     */
    rotateByQuaternionAroundPointToRef(quaternion, point, result) {
        this.subtractToRef(point, tmp_1.MathTmp.Vector3[0]);
        tmp_1.MathTmp.Vector3[0].rotateByQuaternionToRef(quaternion, tmp_1.MathTmp.Vector3[0]);
        point.addToRef(tmp_1.MathTmp.Vector3[0], result);
        return result;
    }
    /**
     * Normalize the current Vector3 with the given input length.
     * Please note that this is an in place operation.
     * @param len the length of the vector
     * @returns the current updated Vector3
     */
    normalizeFromLength(len) {
        if (len === 0 || len === 1.0) {
            return this;
        }
        return this.scaleInPlace(1.0 / len);
    }
    /**
     * Normalize the current Vector3 to a new vector
     * @returns the new Vector3
     */
    normalizeToNew() {
        const normalized = new Vector3(0, 0, 0);
        this.normalizeToRef(normalized);
        return normalized;
    }
    /**
     * Normalize the current Vector3 to the reference
     * @param reference define the Vector3 to update
     * @returns the updated Vector3
     */
    normalizeToRef(reference) {
        const len = this.length();
        if (len === 0 || len === 1.0) {
            return reference.copyFromFloats(this.x, this.y, this.z);
        }
        return this.scaleToRef(1.0 / len, reference);
    }
    /**
     * Creates a new Vector3 copied from the current Vector3
     * @returns the new Vector3
     */
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    /**
     * Copies the given vector coordinates to the current Vector3 ones
     * @param source defines the source Vector3
     * @returns the current updated Vector3
     */
    copyFrom(source) {
        return this.copyFromFloats(source.x, source.y, source.z);
    }
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    copyFromFloats(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    set(x, y, z) {
        return this.copyFromFloats(x, y, z);
    }
    /**
     * Copies the given float to the current Vector3 coordinates
     * @param v defines the x, y and z coordinates of the operand
     * @returns the current updated Vector3
     */
    setAll(v) {
        this.x = this.y = this.z = v;
        return this;
    }
    /**
     * Updates the Vector3 from the sparsely populated value.
     * @param from The sparsely populated value to read from.
     */
    copy(from) {
        if (!from) {
            return this;
        }
        if (from.x !== undefined) {
            this.x = from.x;
        }
        if (from.y !== undefined) {
            this.y = from.y;
        }
        if (from.z !== undefined) {
            this.z = from.z;
        }
        return this;
    }
}
exports.Vector3 = Vector3;
//# sourceMappingURL=vector3.js.map