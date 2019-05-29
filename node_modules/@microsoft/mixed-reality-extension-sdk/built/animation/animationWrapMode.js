"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Indicates how an animation should behave when it reaches the end.
 */
var AnimationWrapMode;
(function (AnimationWrapMode) {
    /**
     * When the animation reaches the end, perform these actions:
     *  - Disable the animation.
     *  - Reset the animation time to zero.
     */
    AnimationWrapMode["Once"] = "once";
    /**
     * Restart the animation at the beginning once it reaches the end.
     */
    AnimationWrapMode["Loop"] = "loop";
    /**
     * At the end of the animation, run the animation backward to the beginning, and vice versa.
     */
    AnimationWrapMode["PingPong"] = "ping-pong";
})(AnimationWrapMode = exports.AnimationWrapMode || (exports.AnimationWrapMode = {}));
//# sourceMappingURL=animationWrapMode.js.map