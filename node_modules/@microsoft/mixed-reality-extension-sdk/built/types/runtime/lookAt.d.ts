/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { LookAtMode } from "../..";
export interface LookAtLike {
    actorId: string;
    mode: LookAtMode;
    backward: boolean;
}
export declare class LookAt implements LookAtLike {
    private _actorId;
    private _mode;
    private _backward;
    actorId: string;
    mode: LookAtMode;
    backward: boolean;
    /** @hidden */
    toJSON(): LookAtLike;
    copy(from: Partial<LookAtLike>): this;
}
//# sourceMappingURL=lookAt.d.ts.map