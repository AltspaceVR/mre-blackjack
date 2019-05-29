"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// tslint:disable:member-ordering variable-name one-variable-per-declaration trailing-comma no-bitwise
/**
 * Represents a 2D path made up of multiple 2D points
 */
class Path2 {
    /**
     * Creates a Path2 object from the starting 2D coordinates x and y.
     * @param x the starting points x value
     * @param y the starting points y value
     */
    constructor(x, y) {
        this._points = new Array();
        this._length = 0.0;
        /**
         * If the path start and end point are the same
         */
        this.closed = false;
        this._points.push(new _1.Vector2(x, y));
    }
    /**
     * Adds a new segment until the given coordinates (x, y) to the current Path2.
     * @param x the added points x value
     * @param y the added points y value
     * @returns the updated Path2.
     */
    addLineTo(x, y) {
        if (this.closed) {
            return this;
        }
        const newPoint = new _1.Vector2(x, y);
        const previousPoint = this._points[this._points.length - 1];
        this._points.push(newPoint);
        this._length += newPoint.subtract(previousPoint).length();
        return this;
    }
    /**
     * Adds _numberOfSegments_ segments according to the arc definition (middle point coordinates,
     * end point coordinates, the arc start point being the current Path2 last point) to the current Path2.
     * @param midX middle point x value
     * @param midY middle point y value
     * @param endX end point x value
     * @param endY end point y value
     * @param numberOfSegments (default: 36)
     * @returns the updated Path2.
     */
    addArcTo(midX, midY, endX, endY, numberOfSegments = 36) {
        if (this.closed) {
            return this;
        }
        const startPoint = this._points[this._points.length - 1];
        const midPoint = new _1.Vector2(midX, midY);
        const endPoint = new _1.Vector2(endX, endY);
        const arc = new _1.Arc2(startPoint, midPoint, endPoint);
        let increment = arc.angle.radians() / numberOfSegments;
        if (arc.orientation === _1.Orientation.CW) {
            increment *= -1;
        }
        let currentAngle = arc.startAngle.radians() + increment;
        for (let i = 0; i < numberOfSegments; i++) {
            const x = Math.cos(currentAngle) * arc.radius + arc.centerPoint.x;
            const y = Math.sin(currentAngle) * arc.radius + arc.centerPoint.y;
            this.addLineTo(x, y);
            currentAngle += increment;
        }
        return this;
    }
    /**
     * Closes the Path2.
     * @returns the Path2.
     */
    close() {
        this.closed = true;
        return this;
    }
    /**
     * Gets the sum of the distance between each sequential point in the path
     * @returns the Path2 total length (float).
     */
    length() {
        let result = this._length;
        if (!this.closed) {
            const lastPoint = this._points[this._points.length - 1];
            const firstPoint = this._points[0];
            result += (firstPoint.subtract(lastPoint).length());
        }
        return result;
    }
    /**
     * Gets the points which construct the path
     * @returns the Path2 internal array of points.
     */
    getPoints() {
        return this._points;
    }
    /**
     * Retreives the point at the distance aways from the starting point
     * @param normalizedLengthPosition the length along the path to retreive the point from
     * @returns a new Vector2 located at a percentage of the Path2 total length on this path.
     */
    getPointAtLengthPosition(normalizedLengthPosition) {
        if (normalizedLengthPosition < 0 || normalizedLengthPosition > 1) {
            return _1.Vector2.Zero();
        }
        const lengthPosition = normalizedLengthPosition * this.length();
        let previousOffset = 0;
        for (let i = 0; i < this._points.length; i++) {
            const j = (i + 1) % this._points.length;
            const a = this._points[i];
            const b = this._points[j];
            const bToA = b.subtract(a);
            const nextOffset = (bToA.length() + previousOffset);
            if (lengthPosition >= previousOffset && lengthPosition <= nextOffset) {
                const dir = bToA.normalize();
                const localOffset = lengthPosition - previousOffset;
                return new _1.Vector2(a.x + (dir.x * localOffset), a.y + (dir.y * localOffset));
            }
            previousOffset = nextOffset;
        }
        return _1.Vector2.Zero();
    }
    /**
     * Creates a new path starting from an x and y position
     * @param x starting x value
     * @param y starting y value
     * @returns a new Path2 starting at the coordinates (x, y).
     */
    static StartingAt(x, y) {
        return new Path2(x, y);
    }
}
exports.Path2 = Path2;
//# sourceMappingURL=path2.js.map