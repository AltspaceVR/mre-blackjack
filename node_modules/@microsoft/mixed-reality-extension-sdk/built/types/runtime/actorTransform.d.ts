/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ScaledTransform, ScaledTransformLike, Transform, TransformLike } from "./transform";
export interface ActorTransformLike {
    app: Partial<TransformLike>;
    local: Partial<ScaledTransformLike>;
}
export declare class ActorTransform implements ActorTransformLike {
    private _app;
    private _local;
    app: Transform;
    local: ScaledTransform;
    constructor();
    copy(from: Partial<ActorTransformLike>): this;
    toJSON(): ActorTransformLike;
}
//# sourceMappingURL=actorTransform.d.ts.map