"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const asset_1 = require("../../internal/asset");
class Prefab extends _1.Asset {
    /** @hidden */
    constructor(manager, def) {
        super(manager, def);
        this._internal = new asset_1.InternalAsset(this);
        if (!def.prefab) {
            throw new Error("Cannot construct prefab from non-prefab definition");
        }
        this._actorCount = def.prefab.actorCount;
    }
    // tslint:enable:variable-name
    /** @hidden */
    get internal() { return this._internal; }
    /** @inheritdoc */
    get actorCount() { return this._actorCount; }
    /** @inheritdoc */
    get prefab() { return this; }
    copy(from) {
        if (!from) {
            return this;
        }
        // Pause change detection while we copy the values into the actor.
        const wasObserving = this.internal.observing;
        this.internal.observing = false;
        // tslint:disable:curly
        super.copy(from);
        if (from.prefab)
            this._actorCount = from.prefab.actorCount;
        // tslint:enable:curly
        this.internal.observing = wasObserving;
        return this;
    }
    /** @hidden */
    toJSON() {
        return Object.assign({}, super.toJSON(), { prefab: {
                actorCount: this._actorCount
            } });
    }
}
exports.Prefab = Prefab;
//# sourceMappingURL=prefab.js.map