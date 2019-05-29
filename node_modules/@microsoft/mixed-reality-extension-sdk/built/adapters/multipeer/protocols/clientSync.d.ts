/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Client } from '..';
import { Message } from '../../..';
import * as Protocols from '../../../protocols';
import { ExportedPromise } from '../../../utils/exportedPromise';
/**
 * @hidden
 */
export declare type SynchronizationStage = 'always' | 'load-assets' | 'create-actors' | 'active-sound-instances' | 'create-animations' | 'sync-animations' | 'set-behaviors' | 'never';
/**
 * @hidden
 * Synchronizes application state with a client.
 */
export declare class ClientSync extends Protocols.Protocol {
    private client;
    private inProgressStages;
    private completedStages;
    private sequence;
    /** @override */
    readonly name: string;
    constructor(client: Client);
    /**
     * @override
     * Handle the outgoing message according to the synchronization rules specified for this payload.
     */
    sendMessage(message: Message, promise?: ExportedPromise): void;
    /** @override */
    protected missingPromiseForReplyMessage(message: Message): void;
    private handlingForMessage;
    private isStageComplete;
    private isStageInProgress;
    private beginStage;
    private completeStage;
    private executeStage;
    /**
     * @override
     */
    run(): Promise<void>;
    /**
     * @hidden
     * Driver for the `load-assets` synchronization stage.
     */
    'stage:load-assets': () => Promise<void>;
    /**
     * @hidden
     * Driver for the `create-actors` synchronization stage.
     */
    'stage:create-actors': () => void;
    /**
     * @hidden
     * Driver for the `set-behaviors` synchronization stage.
     */
    'stage:set-behaviors': () => void;
    /**
     * @hidden
     * Driver for the `active-sound-instances` synchronization stage.
     */
    'stage:active-sound-instances': () => void;
    /**
     * @hidden
     * Driver for the `create-animations` synchronization stage.
     */
    'stage:create-animations': () => void;
    /**
     * @hidden
     * Driver for the `sync-animations` synchronization stage.
     */
    'stage:sync-animations': () => Promise<void>;
    private createActorRecursive;
    private createActorBehavior;
    private createActor;
    private activeSoundInstances;
    private createActorAnimations;
    private createActorInterpolations;
    private sendAndExpectResponse;
    sendQueuedMessages(): Promise<void>;
}
//# sourceMappingURL=clientSync.d.ts.map