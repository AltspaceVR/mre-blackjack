"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const readPath_1 = __importDefault(require("../../utils/readPath"));
const user_1 = require("../internal/user");
class User {
    /**
     * PUBLIC METHODS
     */
    // tslint:disable-next-line:variable-name
    constructor(_context, _id) {
        this._context = _context;
        this._id = _id;
        this._internal = new user_1.InternalUser(this);
    }
    /** @hidden */
    get internal() { return this._internal; }
    // tslint:enable:variable-name
    get context() { return this._context; }
    get id() { return this._id; }
    get name() { return this._name; }
    /**
     * This user's group memberships. Some actors will behave differently depending on
     * if the user is in at least one of a set of groups. See [[GroupMask]].
     */
    get groups() {
        if (!this._groups) {
            this._groups = new __1.GroupMask(this._context);
            this._groups.allowDefault = false;
            this._groups.onChanged(() => this.userChanged('groups'));
        }
        return this._groups;
    }
    set groups(val) {
        if (!val) {
            if (this._groups) {
                this._groups.clear();
            }
            return;
        }
        this._groups = val.getClean();
        this._groups.allowDefault = false;
        this._groups.onChanged(() => this.userChanged('groups'));
        this.userChanged('groups');
    }
    /**
     * A grab bag of miscellaneous, possibly host-dependent, properties.
     */
    get properties() { return Object.freeze(Object.assign({}, this._properties)); }
    copy(from) {
        // Pause change detection while we copy the values into the actor.
        const wasObserving = this.internal.observing;
        this.internal.observing = false;
        if (!from)
            return this;
        if (from.id !== undefined)
            this._id = from.id;
        if (from.name !== undefined)
            this._name = from.name;
        if (from.properties !== undefined)
            this._properties = from.properties;
        if (from.groups !== undefined) {
            if (typeof from.groups === 'number') {
                this.groups.setPacked(from.groups);
            }
            else {
                this.groups = from.groups;
            }
        }
        this.internal.observing = wasObserving;
        return this;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            groups: this.groups.packed(),
            properties: this.properties,
        };
    }
    userChanged(...path) {
        if (this.internal.observing) {
            this.internal.patch = this.internal.patch || {};
            readPath_1.default(this, this.internal.patch, ...path);
            this.context.internal.incrementGeneration();
        }
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map