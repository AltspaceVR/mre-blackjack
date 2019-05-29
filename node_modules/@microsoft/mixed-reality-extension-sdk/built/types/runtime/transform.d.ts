/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Quaternion, QuaternionLike, Vector3, Vector3Like } from '../..';
export interface TransformLike {
    position: Partial<Vector3Like>;
    rotation: Partial<QuaternionLike>;
}
export interface ScaledTransformLike extends TransformLike {
    scale: Partial<Vector3Like>;
}
export declare class Transform implements TransformLike {
    private _position;
    private _rotation;
    position: Vector3;
    rotation: Quaternion;
    /**
     * PUBLIC METHODS
     */
    constructor();
    copy(from: Partial<TransformLike>): this;
    toJSON(): TransformLike;
}
export declare class ScaledTransform extends Transform implements ScaledTransformLike {
    private _scale;
    scale: Vector3;
    constructor();
    copy(from: Partial<ScaledTransformLike>): this;
    toJSON(): ScaledTransformLike;
}
//# sourceMappingURL=transform.d.ts.map