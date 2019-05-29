/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Color3, Color3Like } from '../..';
export declare type LightType = 'spot' | 'point';
export interface LightLike {
    enabled: boolean;
    type: LightType;
    color: Partial<Color3Like>;
    intensity: number;
    range: number;
    spotAngle: number;
}
export declare class Light implements LightLike {
    enabled: boolean;
    type: LightType;
    intensity: number;
    range: number;
    spotAngle: number;
    private _color;
    color: Partial<Color3>;
    /**
     * PUBLIC METHODS
     */
    constructor();
    copy(from: Partial<LightLike>): this;
    toJSON(): LightLike;
}
//# sourceMappingURL=light.d.ts.map