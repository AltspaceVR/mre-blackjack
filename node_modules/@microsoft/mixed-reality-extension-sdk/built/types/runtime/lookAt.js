"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const constants_1 = require("../../constants");
class LookAt {
    constructor() {
        // tslint:disable:variable-name
        this._actorId = constants_1.ZeroGuid;
        this._mode = __1.LookAtMode.None;
        this._backward = false;
    }
    // tslint:enable:variable-name
    get actorId() { return this._actorId; }
    set actorId(value) { value ? this._actorId = value : this._actorId = constants_1.ZeroGuid; }
    get mode() { return this._mode; }
    set mode(value) { value ? this._mode = value : this._mode = __1.LookAtMode.None; }
    get backward() { return this._backward; }
    set backward(value) { this._backward = !!value; }
    /** @hidden */
    toJSON() {
        return {
            actorId: this.actorId,
            mode: this.mode,
            backward: this.backward
        };
    }
    copy(from) {
        if (!from)
            return this;
        if (from.actorId !== undefined)
            this.actorId = from.actorId;
        if (from.mode !== undefined)
            this.mode = from.mode;
        if (from.backward !== undefined)
            this.backward = from.backward;
        return this;
    }
}
exports.LookAt = LookAt;
//# sourceMappingURL=lookAt.js.map