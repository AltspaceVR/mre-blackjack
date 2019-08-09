/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    Actor,
    AnimationEaseCurves,
    AnimationKeyframe,
    AnimationWrapMode,
    Asset,
    AssetContainer,
    ButtonBehavior,
    Context,
    log,
    Material,
    Plane,
    PrimitiveShape,
    Quaternion,
    RigidBody,
    Sound,
    Text,
    TextAnchorLocation,
    Texture,
    Vector3,
} from '@microsoft/mixed-reality-extension-sdk';

interface CardJSON {
    text: string;
    suite: string;
    value: number;
    color: string;
    material?: Material;
}

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

game.setState({
    rules:
    {
        decks: 2,
        standOnSoft17: true,
        double: '9or10or11',
        split: true,
        doubleAfterSplit: true,
        surrender: true,
        insurance: false,
        showdownAfterAceSplit: true
    }
});

// game.setState({rules: {insurance: false}});
game.dispatch(actions.join({ seatPosition: 'P2' }));
game.dispatch(actions.join({ seatPosition: 'P3' }));
game.dispatch(actions.join({ seatPosition: 'P4' }));
// console.log(game.getState())
console.log(game.getState().seat[0].handInfoP2.right)
console.log(game.getState().seat[1].handInfoP3.right)
console.log(game.getState().seat[2].handInfoP4.right)
/**
 * The main class of this app. All the logic goes here.
 */

export default class MREBlackjack {
    // tslint:disable-next-line: max-line-length
    // Here, we're creating null anctors. We'll set the values of the forwarded promises of the created GLTFs to these variables for reference.
    private rootActor: Actor;
    private lightActor: Actor;
    private hitButton: Actor;
    private dealButton: Actor;

    private stayButton: Actor;

    private doubleDownButton: Actor;

    private splitButton: Actor;
    private yesButton: Actor;
    private noButton: Actor;
    private roundText: Actor;

    private desk: Actor;
    // tslint:disable-next-line: max-line-length
    // Same concept as before only this time using an an array, we want to put the actors into an array so that it will be easier to add behaviors to all of the actors later.

    private rightHandArray: Actor[] = [];
    private leftHandArray: Actor[] = [];


    private cardTextures: Texture[] = [];
    private cardMaterials: Material[] = [];
    private cardTextureSheet: Texture;
    // Here we're creating an array JSON data that corresponds to cards in a deck.
    // The reason that this array is in JSON format is because the NPM package that we're using generates card data in this format.
    // We're going to add an extra value called "Material" and mutate the state of the blackjack engine later on.
    private JSON: CardJSON[] = [{ text: "2", suite: "spades", value: 2, color: "B" },
    { text: "3", suite: "spades", value: 3, color: "B" },
    { text: "4", suite: "spades", value: 4, color: "B" },
    { text: "5", suite: "spades", value: 5, color: "B" },
    { text: "6", suite: "spades", value: 6, color: "B" },
    { text: "7", suite: "spades", value: 7, color: "B" },
    { text: "8", suite: "spades", value: 8, color: "B" },
    { text: "9", suite: "spades", value: 9, color: "B" },
    { text: "10", suite: "spades", value: 10, color: "B" },
    { text: "J", suite: "spades", value: 10, color: "B" },
    { text: "Q", suite: "spades", value: 10, color: "B" },
    { text: "K", suite: "spades", value: 10, color: "B" },
    { text: "A", suite: "spades", value: 1, color: "B" },
    { text: "2", suite: "hearts", value: 2, color: "R" },
    { text: "3", suite: "hearts", value: 3, color: "R" },
    { text: "4", suite: "hearts", value: 4, color: "R" },
    { text: "5", suite: "hearts", value: 5, color: "R" },
    { text: "6", suite: "hearts", value: 6, color: "R" },
    { text: "7", suite: "hearts", value: 7, color: "R" },
    { text: "8", suite: "hearts", value: 8, color: "R" },
    { text: "9", suite: "hearts", value: 9, color: "R" },
    { text: "10", suite: "hearts", value: 10, color: "R" },
    { text: "J", suite: "hearts", value: 10, color: "R" },
    { text: "Q", suite: "hearts", value: 10, color: "R" },
    { text: "K", suite: "hearts", value: 10, color: "R" },
    { text: "A", suite: "hearts", value: 1, color: "R" },
    { text: "2", suite: "clubs", value: 2, color: "B" },
    { text: "3", suite: "clubs", value: 3, color: "B" },
    { text: "4", suite: "clubs", value: 4, color: "B" },
    { text: "5", suite: "clubs", value: 5, color: "B" },
    { text: "6", suite: "clubs", value: 6, color: "B" },
    { text: "7", suite: "clubs", value: 7, color: "B" },
    { text: "8", suite: "clubs", value: 8, color: "B" },
    { text: "9", suite: "clubs", value: 9, color: "B" },
    { text: "10", suite: "clubs", value: 10, color: "B" },
    { text: "J", suite: "clubs", value: 10, color: "B" },
    { text: "Q", suite: "clubs", value: 10, color: "B" },
    { text: "K", suite: "clubs", value: 10, color: "B" },
    { text: "A", suite: "clubs", value: 1, color: "B" },
    { text: "2", suite: "diamonds", value: 2, color: "R" },
    { text: "3", suite: "diamonds", value: 3, color: "R" },
    { text: "4", suite: "diamonds", value: 4, color: "R" },
    { text: "5", suite: "diamonds", value: 5, color: "R" },
    { text: "6", suite: "diamonds", value: 6, color: "R" },
    { text: "7", suite: "diamonds", value: 7, color: "R" },
    { text: "8", suite: "diamonds", value: 8, color: "R" },
    { text: "9", suite: "diamonds", value: 9, color: "R" },
    { text: "10", suite: "diamonds", value: 10, color: "R" },
    { text: "J", suite: "diamonds", value: 10, color: "R" },
    { text: "Q", suite: "diamonds", value: 10, color: "R" },
    { text: "K", suite: "diamonds", value: 10, color: "R" },
    { text: "A", suite: "diamonds", value: 1, color: "R" }]

    private blackJackWin: Sound;

    constructor(private context: Context, private baseUrl: string, private assets: AssetContainer) {
        this.context.onStarted(() => this.started());
        this.assets = new AssetContainer(this.context);
    }

    /**
     * Once the context is "started", initialize the app.
     * This method will intialize the majority of the create actor methods as well as the animations and behaviors of said actors.
     */
    private async started() {
        // Call the functions with forwarded promises here
        await Promise.all([

            this.createDealButton(),
            this.createHitButton(),
            this.createStayButton(),
            this.createDesk(),
            this.createRootActor(),
            this.createSplitButton(),
            this.createDeckIndicator(),
            this.createDoubleDownButton(),
            this.loadCardTextures(),
            this.createCardMaterials(),
            this.loadSound(),

        ]).catch(() => {
            log.error('app', "Actor not loaded");
        });

        this.createLightActor();
        this.hitAnimation();
        this.dealAnimation();
        this.stayAnimation();
        this.splitAnimation();
        this.doubleDownAnimation();


        for (let i = 0; i < 52; i++) {
            this.JSON[i].material = this.cardMaterials[i];
        }
        game.setState({ deck: this.shuffle(this.JSON) });
    }


    private playerOneHandAnchor(pos?: Vector3) {

        return this.desk.children[0].findChildrenByName('P1_Hand', false)[0].transform.app.position;

    }
    private playerTwoHandAnchor(pos?: Vector3) {

        return this.desk.children[0].findChildrenByName('P2_Hand', false)[0].transform.app.position;

    }

    private dealerHandAnchor(pos?: Vector3) {

        return this.desk.children[0].findChildrenByName('Dealer_Hand', false)[0].transform.app.position;

    }

    private playerPotAnchor(pos?: Vector3) {

        return this.desk.children[0].findChildrenByName('P1_Pot', false)[0].transform.app.position;

    }

    private shuffle(array: any) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    private async createCardMaterials() {
        for (let cardRow = 0; cardRow < 6; cardRow++) {
            for (let cardColumn = 0; cardColumn < 9; cardColumn++) {
                let posX = 15 + (16 + 210) * cardColumn;
                let posY = 2048 - (283 + 50) * (cardRow + 1);
                this.cardMaterials.push(this.assets.createMaterial('cardMaterial', {
                    mainTextureId: this.cardTextureSheet.id,
                    mainTextureOffset: { x: posX / 2048, y: posY / 2048 },
                    mainTextureScale: { x: .1, y: .134 }, //1/14
                }));

            }
        }

    }
    private async loadCardTextures() {
        const cardTexturePromise = this.assets.createTexture('card', {
            uri: `${this.baseUrl}/card-texture-sheet.png`,
            // resolution: {x: 2048, y: 2048}
        });
        this.cardTextureSheet = cardTexturePromise;
    }

    private async loadSound() {

        this.blackJackWin = this.assets.createSound('blackjackwin', { uri: '${this.baseUrl}/CAABlackJackWin.wav' });

    }
    /**
     * This method will be called every time the Dealer DEALS or the User HITS or STANDS.
     * It will check the the conditions for whether the Dealer or
     * the User has won the round and then display the result.
     */
    private displayWinnerRight() {

        if (game.getState().stage === 'done') {
            // tslint:disable-next-line: max-line-length
            if (game.getState().dealerHasBlackjack || game.getState().handInfo.right.playerHasBusted === true || game.getState().handInfo.right.playerValue.hi < game.getState().dealerValue.hi && game.getState().dealerHasBusted !== true) {

                Actor.CreateEmpty(this.context, {
                    actor: {
                        parentId: this.rootActor.id,
                        name: 'dealer win',
                        transform: {
                            // Positions the text
                            app: { position: { x: 0.5, y: -0.2, z: 0 } }
                        },
                        // Here we're configuring the properties of the displayed text.
                        text: {
                            contents: "right hand lost :C",
                            anchor: TextAnchorLocation.MiddleCenter,
                            color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                            height: 0.1,
                        }
                    }
                });
                this.newRound();
                this.newRoundAnimation();
                // tslint:disable-next-line: max-line-length
            } else if (game.getState().handInfo.right.playerHasBlackjack || game.getState().dealerHasBusted === true || game.getState().handInfo.right.playerValue.hi > game.getState().dealerValue.hi) {
                Actor.CreateEmpty(this.context, {
                    actor: {
                        parentId: this.rootActor.id,
                        name: 'player win',
                        transform: {
                            // Positions the text
                            app: { position: { x: 0.5, y: -0.2, z: 0 } }
                        },
                        // Here we're configuring the properties of the displayed text.
                        text: {
                            contents: "right hand wins :D ",
                            anchor: TextAnchorLocation.MiddleCenter,
                            color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                            height: 0.1,
                        }
                    }
                });
                this.rootActor.startSound(this.blackJackWin.id, { /* options */ });
                this.newRound();
                this.newRoundAnimation();
            } else if (game.getState().handInfo.right.playerValue.hi === game.getState().dealerValue.hi) {

                Actor.CreateEmpty(this.context, {
                    actor: {
                        parentId: this.rootActor.id,
                        name: 'PUSH RIGHT',
                        transform: {
                            // Positions the text
                            app: { position: { x: 0.5, y: -0.2, z: 0 } }
                        },
                        // Here we're configuring the properties of the displayed text.
                        text: {
                            contents: "PUSH RIGHT",
                            anchor: TextAnchorLocation.MiddleCenter,
                            color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                            height: 0.1,
                        }
                    }
                });
                this.newRound();
                this.newRoundAnimation();
            }

        }
    }

    private displayWinnerLeft() {

        if (game.getState().stage === 'done') {
            // tslint:disable-next-line: max-line-length
            if (game.getState().dealerHasBlackjack || game.getState().handInfo.left.playerHasBusted === true || game.getState().handInfo.left.playerValue.hi < game.getState().dealerValue.hi && game.getState().dealerHasBusted !== true) {

                Actor.CreateEmpty(this.context, {
                    actor: {
                        parentId: this.rootActor.id,
                        name: 'dealer win',
                        transform: {
                            // Positions the text
                            app: { position: { x: -0.5, y: -0.2, z: 0 } }
                        },
                        // Here we're configuring the properties of the displayed text.
                        text: {
                            contents: "Left hand lost :c",
                            anchor: TextAnchorLocation.MiddleCenter,
                            color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                            height: 0.1,
                        }
                    }
                });
                // game.setState({stage: 'ready'});
                this.newRound();
                this.newRoundAnimation();

                // tslint:disable-next-line: max-line-length
            } else if (game.getState().handInfo.left.playerHasBlackjack || game.getState().dealerHasBusted === true || game.getState().handInfo.left.playerValue.hi > game.getState().dealerValue.hi) {
                Actor.CreateEmpty(this.context, {
                    actor: {
                        parentId: this.rootActor.id,
                        name: 'player win',
                        transform: {
                            // Positions the text
                            app: { position: { x: -0.5, y: -0.2, z: 0 } }
                        },
                        // Here we're configuring the properties of the displayed text.
                        text: {
                            contents: "left hand won :D",
                            anchor: TextAnchorLocation.MiddleCenter,
                            color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                            height: 0.1,
                        }
                    }
                });
                this.newRound();
                this.newRoundAnimation();
            }
        } else if (game.getState().handInfo.left.playerValue.hi === game.getState().dealerValue.hi) {
            Actor.CreateEmpty(this.context, {
                actor: {
                    parentId: this.rootActor.id,
                    name: 'PUSH left',
                    transform: {
                        // Positions the text
                        app: { position: { x: -0.5, y: -0.2, z: 0 } }
                    },
                    // Here we're configuring the properties of the displayed text.
                    text: {
                        contents: "PUSH LEFT",
                        anchor: TextAnchorLocation.MiddleCenter,
                        color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                        height: 0.1,
                    }
                }
            });
            this.newRound();
            this.newRoundAnimation();
        }
    }
    /**
     * This method will create a blank Actor
     * We want this guy so that we can delete multiple actors with ease.
     * Set any actor you want mass deleted with the id of this actor.
     */
    private createRootActor() {
        const rootActorPromise = Actor.CreateEmpty(this.context, {
            // Also apply the following generic actor properties.
            actor: {
                name: 'Root Actor',
                // Parent the glTF model to the text actor.
            }
        });
        this.rootActor = rootActorPromise;
    }

    private createLightActor() {
        const lightActorPromise = Actor.CreateEmpty(this.context, {
            // Also apply the following generic actor properties.
            actor: {
                name: 'Light Actor',
                // Parent the glTF model to the text actor.
                light: {
                    enabled: true,
                    intensity: 5,
                    range: 10
                }
            }
        });
        this.lightActor = lightActorPromise;
    }

    private async newRound() {

        const roundTextPromise = Actor.CreateEmpty(this.context, {
            actor: {
                parentId: this.rootActor.id,
                name: 'New Round?',
                transform: {
                    app: { position: { x: 0, y: -0.7, z: -0.7 } }
                },
                text: {
                    contents: "Play Again?",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.1,
                }
            }
        });

        this.roundText = roundTextPromise;

        // Load a glTF model
        const yesButtonPromise = Actor.CreateFromGltf(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/UI/BlackjackUI_Button_Yes.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                parentId: this.roundText.id,
                name: 'New Round',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        scale: { x: 0.8, y: 1, z: 1.1 },
                        rotation: Quaternion.FromEulerAngles(0, -Math.PI, 0),
                    }
                }
            }
        });

        this.yesButton = yesButtonPromise;

    }
    private async createHitButton() {

        // Assigns the currently null Actor to the promise value

        const hitButtonPromise = Actor.CreateFromGltf(this.context, {
            // assigning the actor an art asset
            resourceUrl: `${this.baseUrl}/UI/BlackjackUI_Button_Hit.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Hit Button',
                transform: {
                    local: {
                        scale: { x: 0.5, y: 0.5, z: 0.5 },
                        rotation: Quaternion.FromEulerAngles(100, -Math.PI, 0),
                        position: { x: 0.5, y: -0.8, z: -0.8 }
                    }
                }
            }
        });
        this.hitButton = hitButtonPromise;

    }

    private async createStayButton() {

        const stayButtonPromise = Actor.CreateFromGltf(this.context, {
            // assigning the actor an art asset
            resourceUrl: `${this.baseUrl}/UI/BlackjackUI_Button_Stay.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Stay Button',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        scale: { x: 0.5, y: 0.5, z: 0.5 },
                        rotation: Quaternion.FromEulerAngles(100, -Math.PI, 0),
                        position: { x: 0.5, y: -0.9, z: -0.8 }
                    }
                }
            }
        });
        this.stayButton = stayButtonPromise;

    }

    private async createDoubleDownButton() {

        const doubleDownButtonPromise = Actor.CreateFromGltf(this.context, {
            // assigning the actor an art asset
            resourceUrl: `${this.baseUrl}/UI/BlackjackUI_Button_DoubleDown.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'DoubleDown Button',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        scale: { x: 0.5, y: 0.5, z: 0.5 },
                        rotation: Quaternion.FromEulerAngles(100, -Math.PI, 0),
                        position: { x: 0.6, y: -0.8, z: -0.8 }
                    }
                }
            }
        });
        this.doubleDownButton = doubleDownButtonPromise;

    }

    private async createDealButton() {

        // Load a glTF model
        this.dealButton = Actor.CreateFromGltf(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/UI/BlackjackUI_Button_Join.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Deal Button',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        scale: { x: 1, y: 1, z: 1 },
                        rotation: Quaternion.FromEulerAngles(0, -Math.PI, 0),
                        position: { x: 0, y: -0.8, z: -0.9 }
                    }
                }
            }
        });
    }

    private async createDealerCards() {
        const handArray = game.getState().dealerCards;
        let cardPosition = 0;

        for (let cards = 0; cards < handArray.length; cards++) {
            Actor.CreatePrimitive(this.context, {
                definition: {
                    shape: PrimitiveShape.Plane
                },
                actor: {
                    parentId: this.rootActor.id,
                    name: 'Dealer Card',
                    transform: {
                        local: {
                            scale: { x: 0.2, y: 1, z: 0.2 },
                            rotation: Quaternion.FromEulerAngles(0, -Math.PI, 0),
                            position: { x: cardPosition, y: this.dealerHandAnchor().y, z: this.dealerHandAnchor().z }
                        }
                    },
                    appearance: {
                        materialId: handArray[cards].material.id
                    }
                }
            });
            cardPosition -= 0.2;
        }
    }

    private async createSplitButton() {

        const splitButtonPromise = Actor.CreateFromGltf(this.context, {
            // assigning the actor an art asset
            resourceUrl: `${this.baseUrl}/UI/BlackjackUI_Button_Split.glb`,
            // and spawn box colliders around the meshes.
            colliderType: 'box',
            // Also apply the following generic actor properties.
            actor: {
                name: 'Hit Button',
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        scale: { x: 0.5, y: 0.5, z: 0.5 },
                        rotation: Quaternion.FromEulerAngles(100, -Math.PI, 0),
                        position: { x: 0.6, y: -0.9, z: -0.8 }
                    }
                }
            }
        });
        this.splitButton = splitButtonPromise;

    }

    private async createPlayerCards() {
        const rightHandArray = game.getState().handInfo.right.cards;
        const leftHandArray = game.getState().handInfo.left.cards;
        let rightCardPositionX = 0.5;
        let rightCardPositionY = 0;
        let rightCardPositionZ = 0.2;
        let leftCardPositionX = 0.2;
        let leftCardPositionY = 0;
        let leftCardPositionZ = -0.2;
        for (let card = 0; card < rightHandArray.length; card++) {

            // Load a glTF model
            let rightPlayerCard = Actor.CreatePrimitive(this.context, {
                // at the given URL
                definition: {
                    shape: PrimitiveShape.Plane
                },
                actor: {
                    parentId: this.rootActor.id,
                    name: 'Player Card Right',
                    // Parent the glTF model to the text actor. 
                    transform: {
                        local: {
                            scale: { x: 0.2, y: 1, z: 0.2 },
                            // tslint:disable-next-line: max-line-length
                            position: { x: rightCardPositionX, y: this.playerOneHandAnchor().y + rightCardPositionY, z: this.playerOneHandAnchor().z - rightCardPositionZ },
                            rotation: Quaternion.FromEulerAngles(0, -Math.PI, 0),
                        }
                    },
                    appearance: {
                        materialId: rightHandArray[card].material.id
                    }
                }
            });
            rightCardPositionX -= 0.1;
            rightCardPositionY += 0.01
            rightCardPositionZ -= 0.1;
            this.rightHandArray.push(rightPlayerCard);
        }

        if (leftHandArray !== undefined) {
            for (let card = 0; card < leftHandArray.length; card++) {
                // Load a glTF model
                let leftPlayerCard = Actor.CreatePrimitive(this.context, {
                    // at the given URL
                    definition: {
                        shape: PrimitiveShape.Plane
                    },
                    actor: {
                        parentId: this.rootActor.id,
                        name: 'Player Card Left',
                        // Parent the glTF model to the text actor. 
                        transform: {
                            local: {
                                scale: { x: 0.2, y: 1, z: 0.2 },
                                // tslint:disable-next-line: max-line-length
                                position: { x: leftCardPositionX, y: this.playerOneHandAnchor().y + leftCardPositionY, z: this.playerOneHandAnchor().z + leftCardPositionZ },
                                rotation: Quaternion.FromEulerAngles(0, -Math.PI, 0),
                            }
                        },
                        appearance: {
                            materialId: leftHandArray[card].material.id
                        }
                    }
                });
                leftCardPositionX -= 0.1;
                leftCardPositionY += 0.01;
                leftCardPositionZ += 0.1;
                this.leftHandArray.push(leftPlayerCard);
            }
        }
        this.createDeckIndicator();
    }

    /**
     * This method will create an indicator to show which hand you're playing with.
     *  It's position depends entirely on the value of the first actor of either the rightHandArray or the leftHandArray 
     */
    private async createDeckIndicator() {

        if (game.getState().stage === 'player-turn-right') {
            Actor.CreateFromGltf(this.context, {
                // at the given URL
                resourceUrl: `${this.baseUrl}/red-arrow.glb`,
                // and spawn box colliders around the meshes.
                colliderType: 'box',
                // Also apply the following generic actor properties.
                actor: {
                    parentId: this.rootActor.id,
                    name: 'Red Arrow',
                    // Parent the glTF model to the text actor.
                    transform: {
                        local: {
                            // tslint:disable-next-line: max-line-length
                            position: { x: this.rightHandArray[0].transform.app.position.x + 0.1, y: -0.4, z: this.rightHandArray[0].transform.app.position.z },
                            scale: { x: 1, y: 1, z: 1 },
                            rotation: Quaternion.FromEulerAngles(0, 0, 1.5),
                        }
                    }
                }
            });
        } else if (game.getState().stage === 'player-turn-left') {

            Actor.CreateFromGltf(this.context, {
                // at the given URL
                resourceUrl: `${this.baseUrl}/red-arrow.glb`,
                // and spawn box colliders around the meshes.
                colliderType: 'box',
                // Also apply the following generic actor properties.
                actor: {
                    parentId: this.rootActor.id,
                    name: 'Red Arrow',
                    // Parent the glTF model to the text actor.
                    transform: {
                        local: {
                            position: { x: this.leftHandArray[0].transform.app.position.x - 0.1, y: -0.4, z: this.leftHandArray[0].transform.app.position.z },
                            scale: { x: 1, y: 1, z: 1 },
                            rotation: Quaternion.FromEulerAngles(0, 0, 1.5),
                        }
                    }
                }
            });


        }



    }

    private async createDesk() {

        const deskPromise = Actor.CreateFromGltf(this.context, {
            // at the given URL
            resourceUrl: `${this.baseUrl}/blackjack-table-2.glb`,
            assetName: 'Table/Table_Mesh',
            // and spawn box colliders around the meshes.
            // Also apply the following generic actor properties.
            actor: {
                name: "desk",
                // Parent the glTF model to the text actor.
                transform: {
                    local: {
                        position: { x: 0, y: -2, z: 1 },
                        scale: { x: 1, y: 1, z: 1 },
                        rotation: Quaternion.FromEulerAngles(0, -Math.PI, 0),
                    }
                },
            }
        });
        this.desk = deskPromise;
        // console.log(this.desk);
    }
    private hitAnimation() {

        const hitButtonBehavior = this.hitButton.setBehavior(ButtonBehavior);
        // Trigger the grow/shrink animations on hover.
        hitButtonBehavior.onHover('enter', () => {
            this.hitButton.animateTo(
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });
        hitButtonBehavior.onHover('exit', () => {
            this.hitButton.animateTo(
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });

        // We placed the HIT action in an onclick as we want the game's STATE to mutate based on the click.
        // Since there is a possibility of multiple HANDS due to SPLITTING we will call the HIT action based on the STAGE.
        hitButtonBehavior.onClick(() => {
            if (game.getState().stage === 'player-turn-right') {
                this.hitButton.enableAnimation('DoAFlip');
                game.dispatch(actions.hit("right"));
                if (game.getState().stage === 'player-turn-left' && game.getState().handInfo.left.availableActions === undefined) {
                    console.log('hey')
                    game.setState({ stage: 'done' });
                }
                this.rootActor.destroy();
                this.createRootActor();
                this.createPlayerCards();
                this.createDealerCards();
                this.displayWinnerRight();
            } else if (game.getState().stage === 'player-turn-left') {
                this.hitButton.enableAnimation('DoAFlip');
                game.dispatch(actions.hit({ position: 'left' }));
                this.rootActor.destroy();
                this.createRootActor();
                this.createPlayerCards();
                this.createDealerCards();
                this.displayWinnerRight();
                this.displayWinnerLeft();
            }
        });

    }


    private splitAnimation() {

        const splitButtonBehavior = this.splitButton.setBehavior(ButtonBehavior);
        // Trigger the grow/shrink animations on hover.
        splitButtonBehavior.onHover('enter', () => {
            this.splitButton.animateTo(
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });
        splitButtonBehavior.onHover('exit', () => {
            this.splitButton.animateTo(
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });
        splitButtonBehavior.onClick(() => {
            game.dispatch(actions.split());
            this.rootActor.destroy();
            this.createRootActor();
            this.createPlayerCards();
        });

    }

    private doubleDownAnimation() {

        const doubleDownButtonBehavior = this.doubleDownButton.setBehavior(ButtonBehavior);
        // Trigger the grow/shrink animations on hover.
        doubleDownButtonBehavior.onHover('enter', () => {
            this.doubleDownButton.animateTo(
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });
        doubleDownButtonBehavior.onHover('exit', () => {
            this.doubleDownButton.animateTo(
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });

        // When hit button is clicked trigger game dispatch to hit
        doubleDownButtonBehavior.onClick(() => {
            if (game.getState().stage === 'player-turn-right') {
                this.hitButton.enableAnimation('DoAFlip');
                game.dispatch(actions.double("right"));
            } else if (game.getState().stage === 'player-turn-left') {
                this.hitButton.enableAnimation('DoAFlip');
                game.dispatch(actions.double({ position: 'left' }));
            }
        });

    }

    private newRoundAnimation() {


        const newRoundBehavior = this.yesButton.setBehavior(ButtonBehavior);

        newRoundBehavior.onHover('enter', () => {
            this.yesButton.animateTo(
                // tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 1, y: 1, z: 1 } } } }, 1, AnimationEaseCurves.EaseOutSine);
        });
        newRoundBehavior.onHover('exit', () => {
            this.yesButton.animateTo(
                // tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 1, y: 1, z: 1 } } } }, 1, AnimationEaseCurves.EaseOutSine);
        });

        // When deal button is clicked trigger DEAL action.
        newRoundBehavior.onClick(() => {

            game.setState({ stage: 'ready' });
            game.dispatch(actions.restore());
            this.rootActor.destroy();
            this.createRootActor();

            if (game.getState().deck.length < 5) {
                game.setState({ deck: this.shuffle(this.JSON) });
            }
            game.dispatch(actions.deal());
            this.createPlayerCards();
            this.createDealerCards();
            this.displayWinnerRight();

        });

    }
    private dealAnimation() {

        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.

        const dealbuttonBehavior = this.dealButton.setBehavior(ButtonBehavior);

        dealbuttonBehavior.onHover('enter', () => {
            this.dealButton.animateTo(
                // tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 1, y: 1, z: 1 } } } }, 1, AnimationEaseCurves.EaseOutSine);
        });
        dealbuttonBehavior.onHover('exit', () => {
            this.dealButton.animateTo(
                // tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 1, y: 1, z: 1 } } } }, 1, AnimationEaseCurves.EaseOutSine);
        });

        // When deal button is clicked trigger DEAL action.
        dealbuttonBehavior.onClick(() => {

            game.setState({ stage: 'ready' });
            game.dispatch(actions.restore());
            this.rootActor.destroy();
            this.createRootActor();

            if (game.getState().deck.length === 0) {
                game.setState({ deck: this.shuffle(this.JSON) });
            }
            game.dispatch(actions.deal());
            this.createPlayerCards();
            this.createDealerCards();
            this.displayWinnerRight();
            this.dealButton.destroy();
        });
    }

    private stayAnimation() {


        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.

        const stayButtonBehavior = this.stayButton.setBehavior(ButtonBehavior);

        stayButtonBehavior.onHover('enter', () => {
            this.stayButton.animateTo(
                // tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });
        stayButtonBehavior.onHover('exit', () => {
            this.stayButton.animateTo(
                // tslint:disable-next-line: max-line-length
                { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } }, 0.5, AnimationEaseCurves.EaseOutSine);
        });

        // We placed the STAND action in an onclick as we want the game's STATE to mutate based on the click.
        // Since there is a possibility of multiple HANDS due to SPLITTING we will call the STAND action based on the STAGE.
        stayButtonBehavior.onClick(() => {
            if (game.getState().stage === 'player-turn-right') {
                this.stayButton.enableAnimation('DoAFlip');
                game.dispatch(actions.stand('right'));
                if (game.getState().stage === 'player-turn-left' && game.getState().handInfo.left.availableActions === undefined) {
                    console.log('hey')
                    game.setState({ stage: 'done' });
                }
                this.rootActor.destroy();
                this.createRootActor();
                this.createDealerCards();
                this.createPlayerCards();
                this.displayWinnerRight();
                // console.log(game.getState().history)
                console.log(game.getState().finalBet)
            } else if (game.getState().stage === 'player-turn-left') {
                this.stayButton.enableAnimation('DoAFlip');
                game.dispatch(actions.stand({ position: 'left' }));
                this.rootActor.destroy();
                this.createRootActor();
                this.createDealerCards();
                this.createPlayerCards();
                this.displayWinnerRight();
                this.displayWinnerLeft();
            }
        });

    }

}