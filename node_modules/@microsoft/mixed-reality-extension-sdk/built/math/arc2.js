"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * This represents an arc in a 2d space.
 */
class Arc2 {
    /**
     * Creates an Arc object from the three given points : start, middle and end.
     * @param startPoint Defines the start point of the arc
     * @param midPoint Defines the midlle point of the arc
     * @param endPoint Defines the end point of the arc
     */
    constructor(
    /** Defines the start point of the arc */
    startPoint, 
    /** Defines the mid point of the arc */
    midPoint, 
    /** Defines the end point of the arc */
    endPoint) {
        this.startPoint = startPoint;
        this.midPoint = midPoint;
        this.endPoint = endPoint;
        const temp = Math.pow(midPoint.x, 2) + Math.pow(midPoint.y, 2);
        const startToMid = (Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2) - temp) / 2.;
        const midToEnd = (temp - Math.pow(endPoint.x, 2) - Math.pow(endPoint.y, 2)) / 2.;
        const det = (startPoint.x - midPoint.x) * (midPoint.y - endPoint.y) -
            (midPoint.x - endPoint.x) * (startPoint.y - midPoint.y);
        this.centerPoint = new _1.Vector2((startToMid * (midPoint.y - endPoint.y) - midToEnd * (startPoint.y - midPoint.y)) / det, ((startPoint.x - midPoint.x) * midToEnd - (midPoint.x - endPoint.x) * startToMid) / det);
        this.radius = this.centerPoint.subtract(this.startPoint).length();
        this.startAngle = _1.Angle.BetweenTwoPoints(this.centerPoint, this.startPoint);
        const a1 = this.startAngle.degrees();
        let a2 = _1.Angle.BetweenTwoPoints(this.centerPoint, this.midPoint).degrees();
        let a3 = _1.Angle.BetweenTwoPoints(this.centerPoint, this.endPoint).degrees();
        // angles correction
        if (a2 - a1 > +180.0) {
            a2 -= 360.0;
        }
        if (a2 - a1 < -180.0) {
            a2 += 360.0;
        }
        if (a3 - a2 > +180.0) {
            a3 -= 360.0;
        }
        if (a3 - a2 < -180.0) {
            a3 += 360.0;
        }
        this.orientation = (a2 - a1) < 0 ? _1.Orientation.CW : _1.Orientation.CCW;
        this.angle = _1.Angle.FromDegrees(this.orientation === _1.Orientation.CW ? a1 - a3 : a3 - a1);
    }
}
exports.Arc2 = Arc2;
//# sourceMappingURL=arc2.js.map