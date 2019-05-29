"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// tslint:disable:member-ordering variable-name one-variable-per-declaration trailing-comma no-bitwise
/**
 * Represents a 3D path made up of multiple 3D points
 */
class Path3 {
    /**
     * new Path3D(path, normal, raw)
     * Creates a Path3D. A Path3D is a logical math object, so not a mesh.
     * please read the description in the tutorial :  http://doc.babylonjs.com/tutorials/How_to_use_Path3D
     * @param path an array of Vector3, the curve axis of the Path3D
     * @param normal (options) Vector3, the first wanted normal to the curve. Ex (0, 1, 0) for a vertical normal.
     * @param raw (optional, default false) : boolean, if true the returned Path3D isn't normalized. Useful to
     * depict path acceleration or speed.
     */
    constructor(
    /**
     * an array of Vector3, the curve axis of the Path3D
     */
    path, firstNormal, raw) {
        this._curve = new Array();
        this._distances = new Array();
        this._tangents = new Array();
        this._normals = new Array();
        this._binormals = new Array();
        for (let p = 0; p < path.length; p++) {
            this._curve[p] = path[p].clone(); // hard copy
        }
        this._raw = raw || false;
        this._compute(firstNormal);
    }
    /**
     * Returns the Path3D array of successive Vector3 designing its curve.
     * @returns the Path3D array of successive Vector3 designing its curve.
     */
    getCurve() {
        return this._curve;
    }
    /**
     * Returns an array populated with tangent vectors on each Path3D curve point.
     * @returns an array populated with tangent vectors on each Path3D curve point.
     */
    getTangents() {
        return this._tangents;
    }
    /**
     * Returns an array populated with normal vectors on each Path3D curve point.
     * @returns an array populated with normal vectors on each Path3D curve point.
     */
    getNormals() {
        return this._normals;
    }
    /**
     * Returns an array populated with binormal vectors on each Path3D curve point.
     * @returns an array populated with binormal vectors on each Path3D curve point.
     */
    getBinormals() {
        return this._binormals;
    }
    /**
     * Returns an array populated with distances (float) of the i-th point from the first curve point.
     * @returns an array populated with distances (float) of the i-th point from the first curve point.
     */
    getDistances() {
        return this._distances;
    }
    /**
     * Forces the Path3D tangent, normal, binormal and distance recomputation.
     * @param path path which all values are copied into the curves points
     * @param firstNormal which should be projected onto the curve
     * @returns the same object updated.
     */
    update(path, firstNormal) {
        for (let p = 0; p < path.length; p++) {
            this._curve[p].x = path[p].x;
            this._curve[p].y = path[p].y;
            this._curve[p].z = path[p].z;
        }
        this._compute(firstNormal);
        return this;
    }
    // private function compute() : computes tangents, normals and binormals
    _compute(firstNormal) {
        const l = this._curve.length;
        // first and last tangents
        this._tangents[0] = this._getFirstNonNullVector(0);
        if (!this._raw) {
            this._tangents[0].normalize();
        }
        this._tangents[l - 1] = this._curve[l - 1].subtract(this._curve[l - 2]);
        if (!this._raw) {
            this._tangents[l - 1].normalize();
        }
        // normals and binormals at first point : arbitrary vector with _normalVector()
        const tg0 = this._tangents[0];
        const pp0 = this._normalVector(this._curve[0], tg0, firstNormal);
        this._normals[0] = pp0;
        if (!this._raw) {
            this._normals[0].normalize();
        }
        this._binormals[0] = _1.Vector3.Cross(tg0, this._normals[0]);
        if (!this._raw) {
            this._binormals[0].normalize();
        }
        this._distances[0] = 0.0;
        // normals and binormals : next points
        let prev; // previous vector (segment)
        let cur; // current vector (segment)
        let curTang; // current tangent
        // previous normal
        let prevBinor; // previous binormal
        for (let i = 1; i < l; i++) {
            // tangents
            prev = this._getLastNonNullVector(i);
            if (i < l - 1) {
                cur = this._getFirstNonNullVector(i);
                this._tangents[i] = prev.add(cur);
                this._tangents[i].normalize();
            }
            this._distances[i] = this._distances[i - 1] + prev.length();
            // normals and binormals
            // http://www.cs.cmu.edu/afs/andrew/scs/cs/15-462/web/old/asst2camera.html
            curTang = this._tangents[i];
            prevBinor = this._binormals[i - 1];
            this._normals[i] = _1.Vector3.Cross(prevBinor, curTang);
            if (!this._raw) {
                this._normals[i].normalize();
            }
            this._binormals[i] = _1.Vector3.Cross(curTang, this._normals[i]);
            if (!this._raw) {
                this._binormals[i].normalize();
            }
        }
    }
    // private function getFirstNonNullVector(index)
    // returns the first non null vector from index : curve[index + N].subtract(curve[index])
    _getFirstNonNullVector(index) {
        let i = 1;
        let nNVector = this._curve[index + i].subtract(this._curve[index]);
        while (nNVector.length() === 0 && index + i + 1 < this._curve.length) {
            i++;
            nNVector = this._curve[index + i].subtract(this._curve[index]);
        }
        return nNVector;
    }
    // private function getLastNonNullVector(index)
    // returns the last non null vector from index : curve[index].subtract(curve[index - N])
    _getLastNonNullVector(index) {
        let i = 1;
        let nLVector = this._curve[index].subtract(this._curve[index - i]);
        while (nLVector.length() === 0 && index > i + 1) {
            i++;
            nLVector = this._curve[index].subtract(this._curve[index - i]);
        }
        return nLVector;
    }
    // private function normalVector(v0, vt, va) :
    // returns an arbitrary point in the plane defined by the point v0 and the vector vt orthogonal to this plane
    // if va is passed, it returns the va projection on the plane orthogonal to vt at the point v0
    _normalVector(v0, vt, va) {
        let normal0;
        let tgl = vt.length();
        if (tgl === 0.0) {
            tgl = 1.0;
        }
        if (va === undefined || va === null) {
            let point;
            if (!_1.Scalar.WithinEpsilon(Math.abs(vt.y) / tgl, 1.0, _1.Epsilon)) { // search for a point in the plane
                point = new _1.Vector3(0.0, -1.0, 0.0);
            }
            else if (!_1.Scalar.WithinEpsilon(Math.abs(vt.x) / tgl, 1.0, _1.Epsilon)) {
                point = new _1.Vector3(1.0, 0.0, 0.0);
            }
            else if (!_1.Scalar.WithinEpsilon(Math.abs(vt.z) / tgl, 1.0, _1.Epsilon)) {
                point = new _1.Vector3(0.0, 0.0, 1.0);
            }
            else {
                point = _1.Vector3.Zero();
            }
            normal0 = _1.Vector3.Cross(vt, point);
        }
        else {
            normal0 = _1.Vector3.Cross(vt, va);
            _1.Vector3.CrossToRef(normal0, vt, normal0);
        }
        normal0.normalize();
        return normal0;
    }
}
exports.Path3 = Path3;
//# sourceMappingURL=path3.js.map