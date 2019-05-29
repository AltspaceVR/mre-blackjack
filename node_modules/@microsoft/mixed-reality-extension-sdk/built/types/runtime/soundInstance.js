"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const log_1 = require("../../log");
const sound_1 = require("../../sound");
const forwardPromise_1 = require("../forwardPromise");
class SoundInstance {
    constructor(actor, soundAssetId) {
        this.id = v4_1.default();
        this.actor = actor;
        this.soundAssetId = soundAssetId;
    }
    start(options, startTimeOffset) {
        return forwardPromise_1.createForwardPromise(this, new Promise((resolve, reject) => {
            this.actor.context.assetManager.assetLoaded(this.soundAssetId).then(() => {
                this.actor.context.internal.setSoundState(this, sound_1.SoundCommand.Start, options, this.soundAssetId, startTimeOffset);
                resolve();
            }).catch((reason) => {
                log_1.log.error('app', `Failed StartSound on actor ${this.actor.id}. ${(reason || '').toString()}`.trim());
                reject();
            });
        }));
    }
    setSoundState(options, soundCommand) {
        this.actor.context.assetManager.assetLoaded(this.soundAssetId).then(() => {
            if (soundCommand === undefined) {
                soundCommand = sound_1.SoundCommand.Update;
            }
            this.actor.context.internal.setSoundState(this, soundCommand, options);
        }).catch((reason) => {
            log_1.log.error('app', `SetSoundState failed ${this.actor.id}. ${(reason || '').toString()}`.trim());
        });
    }
    pause() {
        this.setSoundState({ paused: true });
    }
    resume() {
        this.setSoundState({ paused: false });
    }
    stop() {
        this.setSoundState({}, sound_1.SoundCommand.Stop);
    }
}
exports.SoundInstance = SoundInstance;
//# sourceMappingURL=soundInstance.js.map