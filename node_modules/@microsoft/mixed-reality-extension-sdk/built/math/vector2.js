"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * Class representing a vector containing 2 coordinates
 */
class Vector2 {
    /**
     * Creates a new Vector2 from the given x and y coordinates
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     */
    constructor(
    /** defines the first coordinate */
    x = 0, 
    /** defines the second coordinate */
    y = 0) {
        this.x = x;
        this.y = y;
    }
    // Statics
    /**
     * Gets a new Vector2(0, 0)
     * @returns a new Vector2
     */
    static Zero() {
        return new Vector2(0, 0);
    }
    /**
     * Gets a new Vector2(1, 1)
     * @returns a new Vector2
     */
    static One() {
        return new Vector2(1, 1);
    }
    /**
     * Gets a new Vector2 set from the given index element of the given array
     * @param array defines the data source
     * @param offset defines the offset in the data source
     * @returns a new Vector2
     */
    static FromArray(array, offset = 0) {
        return new Vector2(array[offset], array[offset + 1]);
    }
    /**
     * Sets "result" from the given index element of the given array
     * @param array defines the data source
     * @param offset defines the offset in the data source
     * @param result defines the target vector
     */
    static FromArrayToRef(array, offset, result) {
        result.x = array[offset];
        result.y = array[offset + 1];
    }
    /**
     * Gets a new Vector2 located for "amount" (float) on the CatmullRom spline defined by the given four Vector2
     * @param value1 defines 1st point of control
     * @param value2 defines 2nd point of control
     * @param value3 defines 3rd point of control
     * @param value4 defines 4th point of control
     * @param amount defines the interpolation factor
     * @returns a new Vector2
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
        return new Vector2(x, y);
    }
    /**
     * Returns a new Vector2 set with same the coordinates than "value" ones if the vector "value" is in the square defined by "min" and "max".
     * If a coordinate of "value" is lower than "min" coordinates, the returned Vector2 is given this "min" coordinate.
     * If a coordinate of "value" is greater than "max" coordinates, the returned Vector2 is given this "max" coordinate
     * @param value defines the value to clamp
     * @param min defines the lower limit
     * @param max defines the upper limit
     * @returns a new Vector2
     */
    static Clamp(value, min, max) {
        let x = value.x;
        x = (x > max.x) ? max.x : x;
        x = (x < min.x) ? min.x : x;
        let y = value.y;
        y = (y > max.y) ? max.y : y;
        y = (y < min.y) ? min.y : y;
        return new Vector2(x, y);
    }
    /**
     * Returns a new Vector2 located for "amount" (float) on the Hermite spline defined by the vectors "value1", "value3", "tangent1", "tangent2"
     * @param value1 defines the 1st control point
     * @param tangent1 defines the outgoing tangent
     * @param value2 defines the 2nd control point
     * @param tangent2 defines the incoming tangent
     * @param amount defines the interpolation factor
     * @returns a new Vector2
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
        return new Vector2(x, y);
    }
    /**
     * Returns a new Vector2 located for "amount" (float) on the linear interpolation between the vector "start" adn the vector "end".
     * @param start defines the start vector
     * @param end defines the end vector
     * @param amount defines the interpolation factor
     * @returns a new Vector2
     */
    static Lerp(start, end, amount) {
        const x = start.x + ((end.x - start.x) * amount);
        const y = start.y + ((end.y - start.y) * amount);
        return new Vector2(x, y);
    }
    /**
     * Gets the dot product of the vector "left" and the vector "right"
     * @param left defines first vector
     * @param right defines second vector
     * @returns the dot product (float)
     */
    static Dot(left, right) {
        return left.x * right.x + left.y * right.y;
    }
    /**
     * Returns a new Vector2 equal to the normalized given vector
     * @param vector defines the vector to normalize
     * @returns a new Vector2
     */
    static Normalize(vector) {
        const newVector = vector.clone();
        newVector.normalize();
        return newVector;
    }
    /**
     * Gets a new Vector2 set with the minimal coordinate values from the "left" and "right" vectors
     * @param left defines 1st vector
     * @param right defines 2nd vector
     * @returns a new Vector2
     */
    static Minimize(left, right) {
        const x = (left.x < right.x) ? left.x : right.x;
        const y = (left.y < right.y) ? left.y : right.y;
        return new Vector2(x, y);
    }
    /**
     * Gets a new Vecto2 set with the maximal coordinate values from the "left" and "right" vectors
     * @param left defines 1st vector
     * @param right defines 2nd vector
     * @returns a new Vector2
     */
    static Maximize(left, right) {
        const x = (left.x > right.x) ? left.x : right.x;
        const y = (left.y > right.y) ? left.y : right.y;
        return new Vector2(x, y);
    }
    /**
     * Gets a new Vector2 set with the transformed coordinates of the given vector by the given transformation matrix
     * @param vector defines the vector to transform
     * @param transformation defines the matrix to apply
     * @returns a new Vector2
     */
    static Transform(vector, transformation) {
        const r = Vector2.Zero();
        Vector2.TransformToRef(vector, transformation, r);
        return r;
    }
    /**
     * Transforms the given vector coordinates by the given transformation matrix and stores the result in the vector "result" coordinates
     * @param vector defines the vector to transform
     * @param transformation defines the matrix to apply
     * @param result defines the target vector
     */
    static TransformToRef(vector, transformation, result) {
        const m = transformation.m;
        const x = (vector.x * m[0]) + (vector.y * m[4]) + m[12];
        const y = (vector.x * m[1]) + (vector.y * m[5]) + m[13];
        result.x = x;
        result.y = y;
    }
    /**
     * Determines if a given vector is included in a triangle
     * @param p defines the vector to test
     * @param p0 defines 1st triangle point
     * @param p1 defines 2nd triangle point
     * @param p2 defines 3rd triangle point
     * @returns true if the point "p" is in the triangle defined by the vertors "p0", "p1", "p2"
     */
    static PointInTriangle(p, p0, p1, p2) {
        const a = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
        const sign = a < 0 ? -1 : 1;
        const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
        const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
        return s > 0 && t > 0 && (s + t) < 2 * a * sign;
    }
    /**
     * Gets the distance between the vectors "value1" and "value2"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @returns the distance between vectors
     */
    static Distance(value1, value2) {
        return Math.sqrt(Vector2.DistanceSquared(value1, value2));
    }
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @returns the squared distance between vectors
     */
    static DistanceSquared(value1, value2) {
        const x = value1.x - value2.x;
        const y = value1.y - value2.y;
        return (x * x) + (y * y);
    }
    /**
     * Gets a new Vector2 located at the center of the vectors "value1" and "value2"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @returns a new Vector2
     */
    static Center(value1, value2) {
        const center = value1.add(value2);
        center.scaleInPlace(0.5);
        return center;
    }
    /**
     * Gets the shortest distance (float) between the point "p" and the segment defined by the two points "segA" and "segB".
     * @param p defines the middle point
     * @param segA defines one point of the segment
     * @param segB defines the other point of the segment
     * @returns the shortest distance
     */
    static DistanceOfPointFromSegment(p, segA, segB) {
        const l2 = Vector2.DistanceSquared(segA, segB);
        if (l2 === 0.0) {
            return Vector2.Distance(p, segA);
        }
        const v = segB.subtract(segA);
        const t = Math.max(0, Math.min(1, Vector2.Dot(p.subtract(segA), v) / l2));
        const proj = segA.add(v.multiplyByFloats(t, t));
        return Vector2.Distance(p, proj);
    }
    /**
     * Gets a string with the Vector2 coordinates
     * @returns a string with the Vector2 coordinates
     */
    toString() {
        return "{X: " + this.x + " Y:" + this.y + "}";
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
        };
    }
    /**
     * Gets class name
     * @returns the string "Vector2"
     */
    getClassName() {
        return "Vector2";
    }
    /**
     * Gets current vector hash code
     * @returns the Vector2 hash code as a number
     */
    getHashCode() {
        let hash = this.x || 0;
        hash = (hash * 397) ^ (this.y || 0);
        return hash;
    }
    // Operators
    /**
     * Sets the Vector2 coordinates in the given array or Float32Array from the given index.
     * @param array defines the source array
     * @param index defines the offset in source array
     * @returns the current Vector2
     */
    toArray(array, index = 0) {
        array[index] = this.x;
        array[index + 1] = this.y;
        return this;
    }
    /**
     * Copy the current vector to an array
     * @returns a new array with 2 elements: the Vector2 coordinates.
     */
    asArray() {
        const result = new Array();
        this.toArray(result, 0);
        return result;
    }
    /**
     * Sets the Vector2 coordinates with the given Vector2 coordinates
     * @param source defines the source Vector2
     * @returns the current updated Vector2
     */
    copyFrom(source) {
        this.x = source.x;
        this.y = source.y;
        return this;
    }
    /**
     * Sets the Vector2 coordinates with the given floats
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     * @returns the current updated Vector2
     */
    copyFromFloats(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Sets the Vector2 coordinates with the given floats
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     * @returns the current updated Vector2
     */
    set(x, y) {
        return this.copyFromFloats(x, y);
    }
    /**
     * Add another vector with the current one
     * @param otherVector defines the other vector
     * @returns a new Vector2 set with the addition of the current Vector2 and the given one coordinates
     */
    add(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }
    /**
     * Sets the "result" coordinates with the addition of the current Vector2 and the given one coordinates
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    addToRef(otherVector, result) {
        result.x = this.x + otherVector.x;
        result.y = this.y + otherVector.y;
        return this;
    }
    /**
     * Set the Vector2 coordinates by adding the given Vector2 coordinates
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    addInPlace(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
        return this;
    }
    /**
     * Gets a new Vector2 by adding the current Vector2 coordinates to the given Vector3 x, y coordinates
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    addVector3(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }
    /**
     * Gets a new Vector2 set with the subtracted coordinates of the given one from the current Vector2
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    subtract(otherVector) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    }
    /**
     * Sets the "result" coordinates with the subtraction of the given one from the current Vector2 coordinates.
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    subtractToRef(otherVector, result) {
        result.x = this.x - otherVector.x;
        result.y = this.y - otherVector.y;
        return this;
    }
    /**
     * Sets the current Vector2 coordinates by subtracting from it the given one coordinates
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    subtractInPlace(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        return this;
    }
    /**
     * Multiplies in place the current Vector2 coordinates by the given ones
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    multiplyInPlace(otherVector) {
        this.x *= otherVector.x;
        this.y *= otherVector.y;
        return this;
    }
    /**
     * Returns a new Vector2 set with the multiplication of the current Vector2 and the given one coordinates
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    multiply(otherVector) {
        return new Vector2(this.x * otherVector.x, this.y * otherVector.y);
    }
    /**
     * Sets "result" coordinates with the multiplication of the current Vector2 and the given one coordinates
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    multiplyToRef(otherVector, result) {
        result.x = this.x * otherVector.x;
        result.y = this.y * otherVector.y;
        return this;
    }
    /**
     * Gets a new Vector2 set with the Vector2 coordinates multiplied by the given floats
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     * @returns a new Vector2
     */
    multiplyByFloats(x, y) {
        return new Vector2(this.x * x, this.y * y);
    }
    /**
     * Returns a new Vector2 set with the Vector2 coordinates divided by the given one coordinates
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    divide(otherVector) {
        return new Vector2(this.x / otherVector.x, this.y / otherVector.y);
    }
    /**
     * Sets the "result" coordinates with the Vector2 divided by the given one coordinates
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    divideToRef(otherVector, result) {
        result.x = this.x / otherVector.x;
        result.y = this.y / otherVector.y;
        return this;
    }
    /**
     * Divides the current Vector2 coordinates by the given ones
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    divideInPlace(otherVector) {
        return this.divideToRef(otherVector, this);
    }
    /**
     * Gets a new Vector2 with current Vector2 negated coordinates
     * @returns a new Vector2
     */
    negate() {
        return new Vector2(-this.x, -this.y);
    }
    /**
     * Multiply the Vector2 coordinates by scale
     * @param scale defines the scaling factor
     * @returns the current updated Vector2
     */
    scaleInPlace(scale) {
        this.x *= scale;
        this.y *= scale;
        return this;
    }
    /**
     * Returns a new Vector2 scaled by "scale" from the current Vector2
     * @param scale defines the scaling factor
     * @returns a new Vector2
     */
    scale(scale) {
        const result = new Vector2(0, 0);
        this.scaleToRef(scale, result);
        return result;
    }
    /**
     * Scale the current Vector2 values by a factor to a given Vector2
     * @param scale defines the scale factor
     * @param result defines the Vector2 object where to store the result
     * @returns the unmodified current Vector2
     */
    scaleToRef(scale, result) {
        result.x = this.x * scale;
        result.y = this.y * scale;
        return this;
    }
    /**
     * Scale the current Vector2 values by a factor and add the result to a given Vector2
     * @param scale defines the scale factor
     * @param result defines the Vector2 object where to store the result
     * @returns the unmodified current Vector2
     */
    scaleAndAddToRef(scale, result) {
        result.x += this.x * scale;
        result.y += this.y * scale;
        return this;
    }
    /**
     * Gets a boolean if two vectors are equals
     * @param otherVector defines the other vector
     * @returns true if the given vector coordinates strictly equal the current Vector2 ones
     */
    equals(otherVector) {
        return otherVector && this.x === otherVector.x && this.y === otherVector.y;
    }
    /**
     * Gets a boolean if two vectors are equals (using an epsilon value)
     * @param otherVector defines the other vector
     * @param epsilon defines the minimal distance to consider equality
     * @returns true if the given vector coordinates are close to the current ones by a distance of epsilon.
     */
    equalsWithEpsilon(otherVector, epsilon = _1.Epsilon) {
        return otherVector && _1.Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) && _1.Scalar.WithinEpsilon(this.y, otherVector.y, epsilon);
    }
    /**
     * Gets a new Vector2 from current Vector2 floored values
     * @returns a new Vector2
     */
    floor() {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }
    /**
     * Gets a new Vector2 from current Vector2 floored values
     * @returns a new Vector2
     */
    fract() {
        return new Vector2(this.x - Math.floor(this.x), this.y - Math.floor(this.y));
    }
    // Properties
    /**
     * Gets the length of the vector
     * @returns the vector length (float)
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * Gets the vector squared length
     * @returns the vector squared length (float)
     */
    lengthSquared() {
        return (this.x * this.x + this.y * this.y);
    }
    // Methods
    /**
     * Normalize the vector
     * @returns the current updated Vector2
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            return this;
        }
        const num = 1.0 / len;
        this.x *= num;
        this.y *= num;
        return this;
    }
    /**
     * Gets a new Vector2 copied from the Vector2
     * @returns a new Vector2
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    /**
     * Updates the Vector2 from the sparsely populated value.
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
        return this;
    }
}
exports.Vector2 = Vector2;
//# sourceMappingURL=vector2.js.map