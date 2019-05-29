/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Color3, Color3Like } from '../..';
export declare enum TextAnchorLocation {
    TopLeft = "top-left",
    TopCenter = "top-center",
    TopRight = "top-right",
    MiddleLeft = "middle-left",
    MiddleCenter = "middle-center",
    MiddleRight = "middle-right",
    BottomLeft = "bottom-left",
    BottomCenter = "bottom-center",
    BottomRight = "bottom-right"
}
export declare enum TextJustify {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare enum TextFontFamily {
    Serif = "serif",
    SansSerif = "sans-serif"
}
export interface TextLike {
    enabled: boolean;
    contents: string;
    height: number;
    pixelsPerLine: number;
    anchor: TextAnchorLocation;
    justify: TextJustify;
    font: TextFontFamily;
    color: Partial<Color3Like>;
}
export declare class Text implements TextLike {
    private _color;
    /**
     * Whether or not to draw the text
     */
    enabled: boolean;
    /**
     * The text string to be drawn
     */
    contents: string;
    /**
     * The height in meters of a line of text
     */
    height: number;
    /**
     * The vertical resolution of a single line of text
     */
    pixelsPerLine: number;
    /**
     * The position of the text anchor relative to the block of text
     */
    anchor: TextAnchorLocation;
    /**
     * The alignment of each text line relative to the others
     */
    justify: TextJustify;
    /**
     * The font family to use to draw the text
     */
    font: TextFontFamily;
    /**
     * The text's color
     */
    color: Partial<Color3>;
    constructor();
    copy(from: Partial<TextLike>): this;
    toJSON(): TextLike;
}
//# sourceMappingURL=text.d.ts.map