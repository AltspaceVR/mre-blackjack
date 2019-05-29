/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { SetSoundStateOptions, SoundCommand } from '../../sound';
import { ForwardPromise } from '../forwardPromise';
import { Actor } from './actor';
export declare class SoundInstance {
    id: string;
    actor: Actor;
    private soundAssetId;
    constructor(actor: Actor, soundAssetId: string);
    start(options: SetSoundStateOptions, startTimeOffset?: number): ForwardPromise<SoundInstance>;
    setSoundState(options: SetSoundStateOptions, soundCommand?: SoundCommand): void;
    pause(): void;
    resume(): void;
    stop(): void;
}
//# sourceMappingURL=soundInstance.d.ts.map