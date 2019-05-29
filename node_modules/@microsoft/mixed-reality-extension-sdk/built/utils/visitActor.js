"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** @hidden */
function VisitActor(actor, callback) {
    actor.children.forEach(child => VisitActor(child, callback));
    callback(actor);
}
exports.default = VisitActor;
//# sourceMappingURL=visitActor.js.map