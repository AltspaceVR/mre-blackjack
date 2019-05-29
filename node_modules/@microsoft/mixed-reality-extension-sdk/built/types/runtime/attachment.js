"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
/**
 * Implementation of AttachmentLike. This class is observable.
 */
class Attachment {
    constructor() {
        // tslint:disable:variable-name
        this._userId = constants_1.ZeroGuid;
        this._attachPoint = 'none';
    }
    // tslint:enable:variable-name
    get userId() { return this._userId; }
    set userId(value) { this._userId = value || constants_1.ZeroGuid; }
    get attachPoint() { return this._attachPoint; }
    set attachPoint(value) { this._attachPoint = value || 'none'; }
    /** @hidden */
    toJSON() {
        return {
            userId: this.userId,
            attachPoint: this.attachPoint
        };
    }
    copy(from) {
        if (!from)
            return this;
        if (from.userId)
            this._userId = from.userId;
        if (from.attachPoint)
            this._attachPoint = from.attachPoint;
        return this;
    }
}
exports.Attachment = Attachment;
//# sourceMappingURL=attachment.js.map