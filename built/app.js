"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mixed_reality_extension_sdk_1 = require("@microsoft/mixed-reality-extension-sdk");
/**
 * The main class of this app. All the logic goes here.
 */
class MREBlackjack {
    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
        this.text = null;
        this.cube = null;
        this.context.onStarted(() => this.started());
    }
    /**
     * Once the context is "started", initialize the app.
     */
    started() {
        // Create a new actor with no mesh, but some text. This operation is asynchronous, so
        // it returns a "forward" promise (a special promise, as we'll see later).
        const textPromise = mixed_reality_extension_sdk_1.Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0, y: 0.5, z: 0 } }
                },
                text: {
                    contents: "MRE BlackJack!",
                    anchor: mixed_reality_extension_sdk_1.TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
                }
            }
        });
        // Even though the actor is not yet created in Altspace (because we didn't wait for the promise),
        // we can still get a reference to it by grabbing the `value` field from the forward promise.
        this.text = textPromise.value;
        // Here we create an animation on our text actor. Animations have three mandatory arguments:
        // a name, an array of keyframes, and an array of events.
        this.text.createAnimation(
        // The name is a unique identifier for this animation. We'll pass it to "startAnimation" later.
        "Spin", {
            // Keyframes define the timeline for the animation: where the actor should be, and when.
            // We're calling the generateSpinKeyframes function to produce a simple 20-second revolution.
            keyframes: this.generateSpinKeyframes(20, mixed_reality_extension_sdk_1.Vector3.Up()),
            // Events are points of interest during the animation. The animating actor will emit a given
            // named event at the given timestamp with a given string value as an argument.
            events: [],
            // Optionally, we also repeat the animation infinitely. PingPong alternately runs the animation
            // foward then backward.
            wrapMode: mixed_reality_extension_sdk_1.AnimationWrapMode.PingPong
        });
        // Load a glTF model
        const cubePromise = mixed_reality_extension_sdk_1.Actor.CreateFromGLTF(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/altspace-cube.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Altspace Cube',
                // Parent the glTF model to the text actor.
                parentId: this.text.id,
                transform: {
                    local: {
                        position: { x: 0, y: -1, z: 0 },
                        scale: { x: 0.4, y: 0.4, z: 0.4 }
                    }
                }
            }
        });
        // Grab that early reference again.
        this.cube = cubePromise.value;
        // Create some animations on the cube.
        this.cube.createAnimation('DoAFlip', {
            keyframes: this.generateSpinKeyframes(1.0, mixed_reality_extension_sdk_1.Vector3.Right()),
            events: []
        });
        // Now that the text and its animation are all being set up, we can start playing
        // the animation.
        this.text.enableAnimation('Spin');
        // Set up cursor interaction. We add the input behavior ButtonBehavior to the cube.
        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.
        const buttonBehavior = this.cube.setBehavior(mixed_reality_extension_sdk_1.ButtonBehavior);
        // Trigger the grow/shrink animations on hover.
        buttonBehavior.onHover('enter', () => {
            this.cube.animateTo({ transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.3, mixed_reality_extension_sdk_1.AnimationEaseCurves.EaseOutSine);
        });
        buttonBehavior.onHover('exit', () => {
            this.cube.animateTo({ transform: { local: { scale: { x: 0.4, y: 0.4, z: 0.4 } } } }, 0.3, mixed_reality_extension_sdk_1.AnimationEaseCurves.EaseOutSine);
        });
        // When clicked, do a 360 sideways.
        buttonBehavior.onClick('pressed', () => {
            this.cube.enableAnimation('DoAFlip');
        });
    }
    /**
     * Generate keyframe data for a simple spin animation.
     * @param duration The length of time in seconds it takes to complete a full revolution.
     * @param axis The axis of rotation in local space.
     */
    generateSpinKeyframes(duration, axis) {
        return [{
                time: 0 * duration,
                value: { transform: { local: { rotation: mixed_reality_extension_sdk_1.Quaternion.RotationAxis(axis, 0) } } }
            }, {
                time: 0.25 * duration,
                value: { transform: { local: { rotation: mixed_reality_extension_sdk_1.Quaternion.RotationAxis(axis, Math.PI / 2) } } }
            }, {
                time: 0.5 * duration,
                value: { transform: { local: { rotation: mixed_reality_extension_sdk_1.Quaternion.RotationAxis(axis, Math.PI) } } }
            }, {
                time: 0.75 * duration,
                value: { transform: { local: { rotation: mixed_reality_extension_sdk_1.Quaternion.RotationAxis(axis, 3 * Math.PI / 2) } } }
            }, {
                time: 1 * duration,
                value: { transform: { local: { rotation: mixed_reality_extension_sdk_1.Quaternion.RotationAxis(axis, 2 * Math.PI) } } }
            }];
    }
}
exports.default = MREBlackjack;
//# sourceMappingURL=app.js.map