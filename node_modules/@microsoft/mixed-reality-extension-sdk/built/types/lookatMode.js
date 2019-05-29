"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Describes the ways in which an actor can face (point its local +Z axis toward) and track another object in the scene
 */
var LookAtMode;
(function (LookAtMode) {
    /**
     * Actor is world-locked and does not rotate
     */
    LookAtMode["None"] = "None";
    /**
     * Actor rotates around its Y axis to face the target, offset by its rotation
     */
    LookAtMode["TargetY"] = "TargetY";
    /**
     * Actor rotates around its X and Y axes to face the target, offset by its rotation
     */
    LookAtMode["TargetXY"] = "TargetXY";
})(LookAtMode = exports.LookAtMode || (exports.LookAtMode = {}));
//# sourceMappingURL=lookatMode.js.map