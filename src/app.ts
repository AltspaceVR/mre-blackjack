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
    private desk: Actor;
    private dealer: Actor;
    private genericButton: Actor;

    private dealerCards: Object [] = [];

    constructor(private context: Context, private baseUrl: string) {
        this.context.onStarted(() => this.started());
    }

    /**
     * Once the context is "started", initialize the app.
     */
    private async started() {
        // Create a new actor with no mesh, but some text. This operation is asynchronous, so
        // it returns a "forward" promise (a special promise, as we'll see later).
        await Promise.all([this.createDealButton(), this.createDealer(), this.createHitButton(), this.createDesk(), this.createDealer()])

        this.hitAnimation();
        this.dealAnimation();
        this.createButton();
    }
    

    private createHitButton(){
        const hitLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0, y: 0.5, z: 0 } }
                },
                text: {
                    contents: "Hit",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
                }
            }
        });

        this.hitLabel = hitLabelPromise.value;

        const hitButtonPromise = Actor.CreateFromGLTF(this.context, {
            // at the given URL
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
                        position: { x: 0, y: -1, z: 0 },
                        scale: { x: 0.04, y: 0.04, z: 0.04 }
                    }
                }
            }
        });
    

     
        this.hitButton = hitButtonPromise.value;

    }

    private createDealButton(){

        const dealLabelPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 3, y: 2, z: 0 } }
                },
                text: {
                    contents: "Deal",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
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
                    position: { x: 0, y: -1, z: 0 },
                    scale: { x: 0.04, y: 0.04, z: 0.04 },
                }
            }
        }
    });


        
        this.dealButton = dealButtonPromise.value;


    }


    private createDealer(){
        const dealerPromise = Actor.CreateEmpty(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 2, y: 1, z: 2} }
                },
                text: {
                    contents: `Test`,
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
                }
            }
        });
    
    this.dealer = dealerPromise.value;

    }

    private createDesk(){

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
    
        // Grab that early reference again.
        
        
        this.desk = deskPromise.value;

    }
  
    
    
    
    // Even though the actor is not yet created in Altspace (because we didn't wait for the promise),
    // we can still get a reference to it by grabbing the `value` field from the forward promise.
    
    
       private hitAnimation(){

        const hitButtonBehavior = this.hitButton.setBehavior(ButtonBehavior);
        this.hitLabel.enableAnimation('Spin');

        
    // Trigger the grow/shrink animations on hover.
    hitButtonBehavior.onHover('enter', () => {
        this.hitButton.animateTo(
            { transform: { local: { scale: { x: 0.05, y: 0.05, z: 0.05 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
    });
    hitButtonBehavior.onHover('exit', () => {
        this.hitButton.animateTo(
            { transform: { local: { scale: { x: 0.04, y: 0.04, z: 0.04 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
    });

    // When hit button is clicked trigger game dispatch to hit
    hitButtonBehavior.onClick('pressed', () => {
        this.hitButton.enableAnimation('DoAFlip');
        game.dispatch(actions.hit("right"));
        console.log(game.getState());

    });

       }

    
       private dealAnimation(){
        this.dealLabel.enableAnimation('Spin');

        // Set up cursor interaction. We add the input behavior ButtonBehavior to the cube.
        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.
       
        const dealbuttonBehavior = this.dealButton.setBehavior(ButtonBehavior);
    
    
        dealbuttonBehavior.onHover('enter', () => {
            this.dealButton.animateTo(
                { transform: { local: { scale: { x: 0.05, y: 0.05, z: 0.05 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
        });
        dealbuttonBehavior.onHover('exit', () => {
            this.dealButton.animateTo(
                { transform: { local: { scale: { x: 0.04, y: 0.04, z: 0.04 } } } }, 0.03, AnimationEaseCurves.EaseOutSine);
        });
    
        // When deal button is clicked trigger deal action.
        dealbuttonBehavior.onClick('pressed', () => {
            this.dealButton.enableAnimation('DoAFlip');
            game.dispatch(actions.deal());
            console.log(game.getState());

            this.dealer.text.contents = ''
            this.dealer.text.contents = game.getState().dealerCards[0].text;
        });
    

       }

       
   
    private createButton(){

        const buttonPromise = Actor.CreatePrimitive(this.context, {

            definition: {
    
                shape: PrimitiveShape.Sphere,
    
                radius: 0.2,
    
                uSegments: 8,
    
                vSegments: 4
    
    
    
            },
    
            addCollider: true,
    
            actor: {
    
                name: 'Button',
    
    
                transform: {
    
                    local: {
    
                        position: { x: -0.8, y: 0.2, z: 0 }
    
                    }
    
                }
    
            }
    
        });

        this.genericButton = buttonPromise.value;
    }
 
}
