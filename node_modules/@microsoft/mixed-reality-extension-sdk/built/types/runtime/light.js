"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class Light {
    /**
     * PUBLIC METHODS
     */
    constructor() {
        this.enabled = true;
        this.type = 'point';
        this.intensity = 1;
        // spot- and point-only:
        this.range = 1;
        // spot-only:
        this.spotAngle = Math.PI / 4;
        this._color = __1.Color3.White();
    }
    // tslint:enable:variable-name
    get color() { return this._color; }
    set color(value) { this._color.copy(value); }
    copy(from) {
        if (!from)
            return this;
        if (from.enabled !== undefined)
            this.enabled = from.enabled;
        if (from.type !== undefined)
            this.type = from.type;
        if (from.color !== undefined)
            this.color.copy(from.color);
        if (from.range !== undefined)
            this.range = from.range;
        if (from.intensity !== undefined)
            this.intensity = from.intensity;
        if (from.spotAngle !== undefined)
            this.spotAngle = from.spotAngle;
        return this;
    }
    toJSON() {
        return {
            enabled: this.enabled,
            type: this.type,
            color: this.color.toJSON(),
            range: this.range,
            intensity: this.intensity,
            spotAngle: this.spotAngle,
        };
    }
}
exports.Light = Light;
//# sourceMappingURL=light.js.map