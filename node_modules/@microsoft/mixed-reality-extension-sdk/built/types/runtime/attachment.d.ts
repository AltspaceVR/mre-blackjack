/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The complete set of attach points.
 */
export declare type AttachPoint = 'none' | 'camera' | 'head' | 'neck' | 'hips' | 'center-eye' | 'spine-top' | 'spine-middle' | 'spine-bottom' | 'left-eye' | 'left-upper-leg' | 'left-lower-leg' | 'left-foot' | 'left-toes' | 'left-shoulder' | 'left-upper-arm' | 'left-lower-arm' | 'left-hand' | 'left-thumb' | 'left-index' | 'left-middle' | 'left-ring' | 'left-pinky' | 'right-eye' | 'right-upper-leg' | 'right-lower-leg' | 'right-foot' | 'right-toes' | 'right-shoulder' | 'right-upper-arm' | 'right-lower-arm' | 'right-hand' | 'right-thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
/**
 * The characteristics of an active attachment.
 */
export interface AttachmentLike {
    userId: string;
    attachPoint: AttachPoint;
}
/**
 * Implementation of AttachmentLike. This class is observable.
 */
export declare class Attachment implements AttachmentLike {
    private _userId;
    private _attachPoint;
    userId: string;
    attachPoint: AttachPoint;
    /** @hidden */
    toJSON(): AttachmentLike;
    copy(from: Partial<AttachmentLike>): this;
}
//# sourceMappingURL=attachment.d.ts.map