/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Matrix, Plane } from '.';
/**
 * Represents a camera frustum
 */
export declare class Frustum {
    /**
     * Gets the planes representing the frustum
     * @param transform matrix to be applied to the returned planes
     * @returns a new array of 6 Frustum planes computed by the given transformation matrix.
     */
    static GetPlanes(transform: Matrix): Plane[];
    /**
     * Gets the near frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resuling frustum plane
     */
    static GetNearPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the far frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resuling frustum plane
     */
    static GetFarPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the left frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resuling frustum plane
     */
    static GetLeftPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the right frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resuling frustum plane
     */
    static GetRightPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the top frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resuling frustum plane
     */
    static GetTopPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the bottom frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resuling frustum plane
     */
    static GetBottomPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Sets the given array "frustumPlanes" with the 6 Frustum planes computed by the given transformation matrix.
     * @param transform transformation matrix to be applied to the resulting frustum planes
     * @param frustumPlanes the resuling frustum planes
     */
    static GetPlanesToRef(transform: Matrix, frustumPlanes: Plane[]): void;
}
//# sourceMappingURL=frustum.d.ts.map