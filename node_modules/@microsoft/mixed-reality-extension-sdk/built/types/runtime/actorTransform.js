"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const transform_1 = require("./transform");
class ActorTransform {
    // tslint:enable:variable-name
    get app() { return this._app; }
    set app(value) { this._app.copy(value); }
    get local() { return this._local; }
    set local(value) { this._local.copy(value); }
    constructor() {
        this._app = new transform_1.Transform();
        this._local = new transform_1.ScaledTransform();
    }
    copy(from) {
        if (!from)
            return this;
        if (from.app !== undefined)
            this.app.copy(from.app);
        if (from.local !== undefined)
            this.local.copy(from.local);
        return this;
    }
    toJSON() {
        return {
            app: this.app.toJSON(),
            local: this.local.toJSON()
        };
    }
}
exports.ActorTransform = ActorTransform;
//# sourceMappingURL=actorTransform.js.map