"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
var TextAnchorLocation;
(function (TextAnchorLocation) {
    TextAnchorLocation["TopLeft"] = "top-left";
    TextAnchorLocation["TopCenter"] = "top-center";
    TextAnchorLocation["TopRight"] = "top-right";
    TextAnchorLocation["MiddleLeft"] = "middle-left";
    TextAnchorLocation["MiddleCenter"] = "middle-center";
    TextAnchorLocation["MiddleRight"] = "middle-right";
    TextAnchorLocation["BottomLeft"] = "bottom-left";
    TextAnchorLocation["BottomCenter"] = "bottom-center";
    TextAnchorLocation["BottomRight"] = "bottom-right";
})(TextAnchorLocation = exports.TextAnchorLocation || (exports.TextAnchorLocation = {}));
var TextJustify;
(function (TextJustify) {
    TextJustify["Left"] = "left";
    TextJustify["Center"] = "center";
    TextJustify["Right"] = "right";
})(TextJustify = exports.TextJustify || (exports.TextJustify = {}));
var TextFontFamily;
(function (TextFontFamily) {
    TextFontFamily["Serif"] = "serif";
    TextFontFamily["SansSerif"] = "sans-serif";
})(TextFontFamily = exports.TextFontFamily || (exports.TextFontFamily = {}));
class Text {
    constructor() {
        // tslint:enable:variable-name
        /**
         * Whether or not to draw the text
         */
        this.enabled = true;
        /**
         * The text string to be drawn
         */
        this.contents = '';
        /**
         * The height in meters of a line of text
         */
        this.height = 1;
        /**
         * The vertical resolution of a single line of text
         */
        this.pixelsPerLine = 50;
        /**
         * The position of the text anchor relative to the block of text
         */
        this.anchor = TextAnchorLocation.TopLeft;
        /**
         * The alignment of each text line relative to the others
         */
        this.justify = TextJustify.Left;
        /**
         * The font family to use to draw the text
         */
        this.font = TextFontFamily.SansSerif;
        this._color = __1.Color3.White();
    }
    /**
     * The text's color
     */
    get color() { return this._color; }
    set color(value) { this._color.copy(value); }
    copy(from) {
        if (!from)
            return this;
        if (from.enabled !== undefined)
            this.enabled = from.enabled;
        if (from.contents !== undefined)
            this.contents = from.contents;
        if (from.height !== undefined)
            this.height = from.height;
        if (from.pixelsPerLine !== undefined)
            this.pixelsPerLine = from.pixelsPerLine;
        if (from.anchor !== undefined)
            this.anchor = from.anchor;
        if (from.justify !== undefined)
            this.justify = from.justify;
        if (from.font !== undefined)
            this.font = from.font;
        if (from.color !== undefined)
            this.color = from.color;
        return this;
    }
    toJSON() {
        return {
            enabled: this.enabled,
            contents: this.contents,
            height: this.height,
            pixelsPerLine: this.pixelsPerLine,
            anchor: this.anchor,
            justify: this.justify,
            font: this.font,
            color: this.color.toJSON(),
        };
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map