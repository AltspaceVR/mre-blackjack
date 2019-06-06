/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    Actor,
    AnimationEaseCurves,
    AnimationKeyframe,
    AnimationWrapMode,
    ButtonBehavior,
    Context,
    PrimitiveShape,
    Quaternion,
    TextAnchorLocation,
    Vector3,
} from '@microsoft/mixed-reality-extension-sdk';

/**
 * Imports the BlackJack engine.
 */

const blackjack = require('engine-blackjack');
const actions = blackjack.actions;
const Game = blackjack.Game;

/**
 * Instantiates a game of Blackjack, the game's state starts at READY. The  game's state will change based on actions.
 */

const game = new Game();

/**
 * The main class of this app. All the logic goes here.
 */

export default class MREBlackjack {
    private hitLabel: Actor;
    private dealLabel: Actor;
    private hitButton: Actor;
    private dealButton: Actor;
    private dealerCards: Actor;
    private desk: Actor;
    private blackjackDealer: Actor;
    private barStool: Actor;
    private collisionBox: Actor;

    constructor(private context: Context, private baseUrl: string) {
        this.context.onStarted(() => this.started());
    }

    /**
     * Once the context is "started", initialize the app.
     */
    private async started() {
            // Call the functions with forwarded promises here
        await Promise.all([

            this.createDealButton(),
            this.createDealerCards(),
            this.createHitButton(),
            this.createDesk(),
            this.createDealerCards(),
            this.createBlackJackDealer(),
            this.createStool()

        ]);

        this.hitAnimation();
        this.dealAnimation();
        this.enterGame();
    }

    private createHitButton() {
        const hitLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    // Positions the text
                    app: { position: { x: 0, y: 0, z: 0 } }
                },
                // Here we're configuring the properties of the displayed text.
                text: {
                    contents: "Hit",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.1,
                }
            }
        });

        // Assigns the currently null Actor to the promise value
        this.hitLabel = hitLabelPromise.value;

        const hitButtonPromise = Actor.CreateFromGLTF(this.context, {
            // assigning the actor an art asset
            resourceUrl: `${this.baseUrl}/card-button.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Hit Button',
                // Parent the glTF model to the text actor.
                parentId: this.hitLabel.id,
                transform: {
                    local: {
                        scale: { x: 0.01, y: 0.01, z: 0.02 },
                        rotation: Quaternion.FromEulerAngles(600, -Math.PI, 0),
                    }
                }
            }
        });
        this.hitButton = hitButtonPromise.value;

    }

    private createDealButton() {

        const dealLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0.5, y: 0, z: 0 } }
                },
                text: {
                    contents: "Deal",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.1,
                }
            }
        });

        this.dealLabel = dealLabelPromise.value;

        // Load a glTF model
        const dealButtonPromise = Actor.CreateFromGLTF(this.context, {
        // at the given URL
        resourceUrl: `${this.baseUrl}/card-button.glb`,
        // and spawn box colliders around the meshes.
        colliderType: 'box',
        // Also apply the following generic actor properties.
        actor: {
            name: 'Deal Button',
            // Parent the glTF model to the text actor.
            parentId: this.dealLabel.id,
            transform: {
                local: {
                    scale: { x: 0.01, y: 0.01, z: 0.02 },
                    rotation: Quaternion.FromEulerAngles(600, -Math.PI, 0),
                }
            }
        }
    });

        this.dealButton = dealButtonPromise.value;
    }

    private createDealerCards() {
        const dealerCardsPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0, y: 0, z: 1.5} }
                },
                text: {
                    contents: ``,
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
                }
            }
        });
        this.dealerCards = dealerCardsPromise.value;
    }

    private createBlackJackDealer() {

        const blackjackDealerPromise = Actor.CreateFromGLTF(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/phil.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Phil',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        position: { x: 0, y: -0.5, z: 3.1 },
                        scale: { x: .3, y: .3, z: .3 },
                        rotation: Quaternion.FromEulerAngles(300, -Math.PI, 0),
                    }
                }
            }
        });
        this.blackjackDealer = blackjackDealerPromise.value;

    }

    private createStool() {

        const stoolPromise = Actor.CreateFromGLTF(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/bar-stool.glb`,
            colliderType: 'none',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Bar Stool',
                transform: {
                    local: {
                        position: { x: -1, y: -2.5, z: -1.5 },
                        scale: { x: .3, y: .3, z: .3 },
                        rotation: Quaternion.FromEulerAngles(300, -Math.PI, 0),
                    }
                }
            }
        });
        this.barStool = stoolPromise.value;

    }

    private createDesk() {

        const deskPromise = Actor.CreateFromGLTF(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/blackjack-table.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Desk',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        position: { x: 0, y: -3, z: 1 },
                        scale: { x: .5, y: .5, z: .5 },
                        rotation: Quaternion.FromEulerAngles(300, -Math.PI, 0),
                    }
                }
            }
        });
        this.desk = deskPromise.value;

    }
       private hitAnimation() {

        const hitButtonBehavior = this.hitButton.setBehavior(ButtonBehavior);
        this.hitLabel.enableAnimation('Spin');
    // Trigger the grow/shrink animations on hover.
        hitButtonBehavior.onHover('enter', () => {
        this.hitButton.animateTo(
            { transform: { local: { scale: { x: 0.02, y: 0.02, z: 0.02 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
    });
        hitButtonBehavior.onHover('exit', () => {
        this.hitButton.animateTo(
            { transform: { local: { scale: { x: 0.01, y: 0.01, z: 0.01 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
    });

    // When hit button is clicked trigger game dispatch to hit
        hitButtonBehavior.onClick('pressed', () => {
        this.hitButton.enableAnimation('DoAFlip');
        game.dispatch(actions.hit("right"));
        console.log(game.getState());

    });

       }

       private dealAnimation() {
        this.dealLabel.enableAnimation('Spin');
        // Set up cursor interaction. We add the input behavior ButtonBehavior to the cube.
        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.

        const dealbuttonBehavior = this.dealButton.setBehavior(ButtonBehavior);

        dealbuttonBehavior.onHover('enter', () => {
            this.dealButton.animateTo(
// tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 0.02, y: 0.02, z: 0.02 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
        });
        dealbuttonBehavior.onHover('exit', () => {
            this.dealButton.animateTo(
// tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 0.01, y: 0.01, z: 0.01 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
        });

        // When deal button is clicked trigger deal action.
        dealbuttonBehavior.onClick('pressed', () => {
            this.dealButton.enableAnimation('DoAFlip');
            game.dispatch(actions.deal());
            console.log(game.getState());

            this.dealerCards.text.contents = '';
// tslint:disable-next-line: max-line-length
            this.dealerCards.text.contents = `Value:${game.getState().dealerCards[0].text} Suite: ${game.getState().dealerCards[0].suite}`;
        });

       }

       private enterGame() {

        const barStoolBehavior = this.barStool.setBehavior(ButtonBehavior);

        barStoolBehavior.onTarget('enter', () => {
            game.dispatch(actions.deal());
            console.log(game.getState());

            this.dealerCards.text.contents = '';
// tslint:disable-next-line: max-line-length
            this.dealerCards.text.contents = `Value:${game.getState().dealerCards[0].text} Suite: ${game.getState().dealerCards[0].suite}`;
        });

       }

}
