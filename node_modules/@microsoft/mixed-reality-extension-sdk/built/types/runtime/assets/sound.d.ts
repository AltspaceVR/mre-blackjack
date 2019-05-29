/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset, AssetLike, AssetManager } from '.';
import { InternalAsset } from '../../internal/asset';
import { Patchable } from '../../patchable';
export interface SoundLike {
    uri: string;
    duration: number;
}
export declare class Sound extends Asset implements SoundLike, Patchable<AssetLike> {
    private _uri;
    private _duration;
    private _internal;
    /** @hidden */
    readonly internal: InternalAsset;
    /** The URI, if any, this sound was loaded from */
    readonly uri: string;
    /** The length the loaded sound at default pitch */
    readonly duration: number;
    /** @inheritdoc */
    readonly sound: SoundLike;
    /** @hidden */
    constructor(manager: AssetManager, def: AssetLike);
    copy(from: Partial<AssetLike>): this;
    /** @hidden */
    toJSON(): AssetLike;
}
//# sourceMappingURL=sound.d.ts.map