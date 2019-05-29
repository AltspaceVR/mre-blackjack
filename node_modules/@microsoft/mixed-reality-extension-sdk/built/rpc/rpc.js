"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RPCHandlerSet {
}
/**
 * @hidden
 * Base RPC interface. Able to send and receive RPC calls.
 */
class RPC {
    // tslint:disable-next-line:variable-name
    constructor(_context) {
        this._context = _context;
        this.handlers = {};
        this.emit = this.send;
    }
    get context() { return this._context; }
    on(procName, handler) {
        this.handlers[procName] = handler;
    }
    send(procName, ...args) {
        this.context.internal.sendPayload({
            type: 'app2engine-rpc',
            userId: this['userId'],
            procName,
            args
        });
    }
    receive(procName, ...args) {
        const handler = this.handlers[procName];
        if (handler) {
            handler(...args);
        }
    }
}
exports.RPC = RPC;
/**
 * @hidden
 * RPC interface bound to a user. Able to join and leave channels.
 */
class UserRPC extends RPC {
    constructor(user) {
        super(user.context);
        this.user = user;
        // this.user.internal.__rpc = this;
    }
    get userId() { return this.user.id; }
    join(channelName) {
        const contextrpc = this.user.context.internal.__rpc;
        if (contextrpc) {
            contextrpc.channel(channelName).join(this.user.id);
        }
    }
    leave(channelName) {
        const contextrpc = this.user.context.internal.__rpc;
        if (contextrpc) {
            contextrpc.channel(channelName).leave(this.user.id);
        }
    }
}
exports.UserRPC = UserRPC;
/**
 * @hidden
 * RPC Channel interface. Able to send and receive RPC calls targeted to a channel.
 */
class RPCChannel {
    // tslint:disable-next-line:variable-name
    constructor(context, _name) {
        this.context = context;
        this._name = _name;
        this.userIds = [];
        this.emit = this.send;
    }
    get name() { return this._name; }
    isEmpty() {
        return this.userIds.length === 0;
    }
    contains(userId) {
        return !!this.userIds.find(value => value === userId);
    }
    join(userId) {
        if (!this.contains(userId)) {
            this.userIds.push(userId);
        }
    }
    leave(userId) {
        this.userIds = this.userIds.filter(value => value !== userId);
    }
    send(procName, ...args) {
        this.userIds.forEach(userId => {
            const user = this.context.user(userId);
            if (user) {
                const userrpc = user.internal.__rpc;
                if (userrpc) {
                    userrpc.send(procName, args);
                }
            }
        });
    }
    receive(procName, ...args) {
        this.userIds.forEach(userId => {
            const user = this.context.user(userId);
            if (user) {
                const userrpc = user.internal.__rpc;
                if (userrpc) {
                    userrpc.receive(procName, args);
                }
            }
        });
    }
}
exports.RPCChannel = RPCChannel;
/**
 * @hidden
 * RPC interface bound to an context instance.
 */
class ContextRPC extends RPC {
    /**
     * Creates a new RPC interface instance.
     * @param context The context that the interface should be attached to.
     */
    constructor(context) {
        super(context);
        this.channels = {};
        this.to = this.channel;
        if (this.context.internal.__rpc === undefined) {
            this.context.internal.__rpc = this;
        }
        this._receive = this._receive.bind(this);
        this.context.onReceiveRPC(this._receive);
    }
    cleanup() {
        if (this.context.internal.__rpc === this) {
            this.context.internal.__rpc = undefined;
        }
        this.context.offReceiveRPC(this._receive);
    }
    channel(channelName, create = true) {
        if (!this.channels[channelName]) {
            if (create) {
                this.channels[channelName] = new RPCChannel(this.context, channelName);
            }
        }
        return this.channels[channelName];
    }
    leaveAll(userId) {
        Object.keys(this.channels).forEach(key => {
            this.channels[key].leave(userId);
            if (this.channels[key].isEmpty()) {
                delete this.channels[key];
            }
        });
    }
    _receive(procName, channelName, args) {
        if (channelName) {
            const channel = this.channel(channelName, false);
            if (channel) {
                channel.receive(procName, args);
            }
        }
        else {
            super.receive(procName, args);
        }
    }
}
exports.ContextRPC = ContextRPC;
//# sourceMappingURL=rpc.js.map