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
    RigidBody,
    ForwardPromise,
    Plane,
    Sound,
    Asset,
} from '@microsoft/mixed-reality-extension-sdk';
import { platform } from 'os';
import { ENGINE_METHOD_ALL } from 'constants';


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
    private rootActor: Actor;
    private hitLabel: Actor;
    private hitButton: Actor;
    private dealLabel: Actor;
    private dealButton: Actor;
    private stayLabel: Actor;
    private stayButton: Actor;
    private desk: Actor;
    private blackjackDealer: Actor;

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
            this.createHitButton(),
            this.createStayButton(),
            this.createDesk(),
            this.createBlackJackDealer(),
            this.createRootActor(),

        ]);

        this.hitAnimation();
        this.dealAnimation();
        this.stayAnimation();

    }

    private displayWinner() {

            if (game.getState().stage === 'done'){
// tslint:disable-next-line: max-line-length
                if (game.getState().dealerHasBlackjack || game.getState().handInfo.right.playerHasBusted === true || game.getState().handInfo.right.playerValue.hi < game.getState().dealerValue.hi){

                    Actor.CreateEmpty(this.context, {
                        actor: {
                            parentId: this.rootActor.id,
                            name: 'dealer win',
                            transform: {
                                // Positions the text
                                app: { position: { x: 0.5, y: 1, z: 0 } }
                            },
                            // Here we're configuring the properties of the displayed text.
                            text: {
                                contents: "Dealer Wins! :C",
                                anchor: TextAnchorLocation.MiddleCenter,
                                color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                                height: 0.1,
                            }
                        }
                    });
                    game.setState({stage: 'ready'});
                    this.rootActor.destroy();
                //   this.createRootActor();
// tslint:disable-next-line: max-line-length
                } else if (game.getState().handInfo.right.playerHasBlackjack || game.getState().dealerHasBusted === true || game.getState().handInfo.right.playerValue.hi > game.getState().dealerValue.hi){
                    Actor.CreateEmpty(this.context, {
                        actor: {
                            parentId: this.rootActor.id,
                            name: 'player win',
                            transform: {
                                // Positions the text
                                app: { position: { x: 0.5, y: 1, z: 0 } }
                            },
                            // Here we're configuring the properties of the displayed text.
                            text: {
                                contents: "You Win! :D",
                                anchor: TextAnchorLocation.MiddleCenter,
                                color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                                height: 0.1,
                            }
                        }
                    });
                    game.setState({stage: 'ready'});
                    this.rootActor.destroy();
                    // this.createRootActor();
                }
            }
    }

    private createRootActor() {

        const rootActorPromise = Actor.CreateEmpty(this.context, {
            // Also apply the following generic actor properties.
            actor: {
                name: 'Root Actor',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        scale: { x: 1, y: 1, z: 1 },
                        rotation: Quaternion.FromEulerAngles(600, -Math.PI, 0),
                    }
                }
            }
        });
        this.rootActor = rootActorPromise.value;



    }
    private createHitButton() {
        const hitLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    // Positions the text
                    app: { position: { x: 0.5, y: 0, z: 0 } }
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

        const hitButtonPromise = Actor.CreateFromGltf(this.context, {
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

    private createStayButton() {
        const stayLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    // Positions the text
                    app: { position: { x: 1, y: 0, z: 0.4 } }
                },
                // Here we're configuring the properties of the displayed text.
                text: {
                    contents: "Stay",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.1,
                }
            }
        });

        // Assigns the currently null Actor to the promise value
        this.stayLabel = stayLabelPromise.value;

        const stayButtonPromise = Actor.CreateFromGltf(this.context, {
            // assigning the actor an art asset
            resourceUrl: `${this.baseUrl}/card-button.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Stay Button',
                // Parent the glTF model to the text actor.
                parentId: this.stayLabel.id,
                transform: {
                    local: {
                        scale: { x: 0.015, y: 0.015, z: 0.01 },
                        rotation: Quaternion.FromEulerAngles(600, -Math.PI, 0),
                    }
                }
            }
        });
        this.stayButton = stayButtonPromise.value;

    }

    private createDealButton() {

        const dealLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0.5, y: 0, z: 1 } }
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
        const dealButtonPromise = Actor.CreateFromGltf(this.context, {
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
        const handArray = game.getState().dealerCards;
        let cardPosition = 0;

        for(let cards = 0; cards < handArray.length; cards++){

            Actor.CreateEmpty(this.context, {
                actor: {
                    parentId: this.rootActor.id,
                    name: 'Text',
                    transform: {
                        app: { position: { x: cardPosition, y: 0, z: 1} }
                    },
                    text: {
                        contents: `${handArray[cards].value}`,
                        anchor: TextAnchorLocation.MiddleCenter,
                        color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                        height: 0.3
                    }
                }
            });

            Actor.CreateFromGltf(this.context, {
            resourceUrl: `${this.baseUrl}/playingcard2.glb`,
            actor: {
                parentId: this.rootActor.id,
                name: 'Dealer Card',
                transform: {
                    local: {
                        scale: { x: 5, y: 5, z: 5 },
                        rotation: Quaternion.FromEulerAngles(300, -Math.PI, 0),
                        position: {x: cardPosition , y: 0, z: 1}
                    }
                }
            }
        });
            cardPosition -= 0.4;
        }
    }

    private createPlayerCards() {

        const handArray = game.getState().handInfo.right.cards;
        let cardPosition = 0;

        for(let cards = 0; cards < handArray.length; cards++){
            Actor.CreateEmpty(this.context, {
                actor: {
                    parentId: this.rootActor.id,
                    name: 'Text',
                    transform: {
                        app: { position: { x: cardPosition, y: cardPosition, z: 0} }
                    },
                    text: {
                        contents: `${handArray[cards].value}`,
                        anchor: TextAnchorLocation.MiddleCenter,
                        color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                        height: 0.3
                    }
                }
            });
            // Load a glTF model
            Actor.CreateFromGltf(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/playingcard2.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                parentId: this.rootActor.id,
                name: 'Player Card',
                // Parent the glTF model to the text actor. 
                transform: {
                    local: {
                        scale: { x: 5, y: 5, z: 5 },
                        position: {  x: cardPosition, y: cardPosition, z: cardPosition },
                        rotation: Quaternion.FromEulerAngles(300, -Math.PI, 0),
                    }
                }
            }
        });


            cardPosition += 0.1;
        }
    }

    private createBlackJackDealer() {

        const blackjackDealerPromise = Actor.CreateFromGltf(this.context, {
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

    private createDesk() {

        const deskPromise = Actor.CreateFromGltf(this.context, {
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
        hitButtonBehavior.onClick(() => {
        this.hitButton.enableAnimation('DoAFlip');
        game.dispatch(actions.hit("right"));
        // console.log(game.getState());
        this.createDealerCards();
        this.createPlayerCards();
        this.displayWinner();
    });

       }

       private dealAnimation() {
        this.dealLabel.enableAnimation('Spin');

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
        dealbuttonBehavior.onClick(() => {

            this.dealButton.enableAnimation('DoAFlip');
            game.dispatch(actions.deal());
            this.createDealerCards();
            this.createPlayerCards();
            this.displayWinner();
        });
       }

       private stayAnimation() {

        this.stayLabel.enableAnimation('Spin');

        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.

        const stayButtonBehavior = this.stayButton.setBehavior(ButtonBehavior);

        stayButtonBehavior.onHover('enter', () => {
            this.stayButton.animateTo(
// tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 0.02, y: 0.02, z: 0.02 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
        });
        stayButtonBehavior.onHover('exit', () => {
            this.stayButton.animateTo(
// tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 0.01, y: 0.01, z: 0.01 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
        });

        // When deal button is clicked trigger deal action.
        stayButtonBehavior.onClick(() => {

            this.stayButton.enableAnimation('DoAFlip');
            game.dispatch(actions.stand('right'));
            this.createDealerCards();
            this.createPlayerCards();
            this.displayWinner();
            // console.log(game.getState())     
        });

       }

}
