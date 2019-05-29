"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Describes the general shape of a primitive. Specifics are described in a [[PrimitiveDefinition]] object.
 */
var PrimitiveShape;
(function (PrimitiveShape) {
    /**
     * The primitive is a sphere with a radius of [[PrimitiveDefinition.radius]], horizontal segment count
     * [[PrimitiveDefinition.uSegments]], and vertical segment count [[PrimitiveDefinition.vSegments]], centered
     * at the origin.
     */
    PrimitiveShape["Sphere"] = "sphere";
    /**
     * The primitive is a box with dimensions defined by [[PrimitiveDefinition.dimensions]], centered at the origin.
     */
    PrimitiveShape["Box"] = "box";
    /**
     * The primitive is a capsule whose height (not counting caps) and axis are defined by the largest component of
     * [[PrimitiveDefinition.dimensions]], with radius [[PrimitiveDefinition.radius]], radial segment count
     * [[PrimitiveDefinition.uSegments]], and axial segment count [[PrimitiveDefinition.vSegments]], centered at
     * the origin.
     */
    PrimitiveShape["Capsule"] = "capsule";
    /**
     * The primitive is a cylinder whose height and axis are defined by the largest component of
     * [[PrimitiveDefinition.dimensions]], with radius [[PrimitiveDefinition.radius]], and radial segment count
     * [[PrimitiveDefinition.uSegments]], centered at the origin.
     */
    PrimitiveShape["Cylinder"] = "cylinder";
    /**
     * The primitive is a plane with dimensions from the x and z coordinates of [[PrimitiveDefinition.dimensions]] (y
     * coordinate is ignored), horizontal segment count [[PrimitiveDefinition.uSegments]], and vertical segment count
     * [[PrimitiveDefinition.vSegments]], centered at the origin.
     */
    PrimitiveShape["Plane"] = "plane";
    /**
     * The primitive is a sphere with a radius of [[PrimitiveDefinition.radius]], horizontal segment count
     * [[PrimitiveDefinition.uSegments]], and vertical segment count [[PrimitiveDefinition.vSegments]], with normals
     * pointed inward, centered at the origin.
     */
    PrimitiveShape["InnerSphere"] = "inner-sphere";
})(PrimitiveShape = exports.PrimitiveShape || (exports.PrimitiveShape = {}));
//# sourceMappingURL=primitiveTypes.js.map