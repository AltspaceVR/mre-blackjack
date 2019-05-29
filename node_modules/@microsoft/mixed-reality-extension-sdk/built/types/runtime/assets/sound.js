"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const asset_1 = require("../../internal/asset");
class Sound extends _1.Asset {
    /** @hidden */
    constructor(manager, def) {
        super(manager, def);
        this._duration = 0;
        this._internal = new asset_1.InternalAsset(this);
        if (!def.sound) {
            throw new Error("Cannot construct sound from non-texture definition");
        }
        if (def.sound.uri) {
            this._uri = def.sound.uri;
        }
        if (def.sound.duration) {
            this._duration = def.sound.duration;
        }
    }
    // tslint:enable:variable-name
    /** @hidden */
    get internal() { return this._internal; }
    /** The URI, if any, this sound was loaded from */
    get uri() { return this._uri; }
    /** The length the loaded sound at default pitch */
    get duration() { return this._duration; }
    /** @inheritdoc */
    get sound() { return this; }
    copy(from) {
        if (!from) {
            return this;
        }
        // Pause change detection while we copy the values into the actor.
        const wasObserving = this.internal.observing;
        this.internal.observing = false;
        // tslint:disable:curly
        super.copy(from);
        if (from.sound && from.sound.uri)
            this._uri = from.sound.uri;
        if (from.sound && from.sound.duration)
            this._duration = from.sound.duration;
        // tslint:enable:curly
        this.internal.observing = wasObserving;
        return this;
    }
    /** @hidden */
    toJSON() {
        return Object.assign({}, super.toJSON(), { sound: {
                uri: this.uri,
                duration: this.duration,
            } });
    }
}
exports.Sound = Sound;
//# sourceMappingURL=sound.js.map