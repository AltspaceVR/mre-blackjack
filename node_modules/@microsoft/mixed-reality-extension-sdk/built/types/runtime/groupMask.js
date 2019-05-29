"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-bitwise
/**
 * A set of user group IDs. User groups are used to selectively enable several different
 * properties of actors based on the memberships of the viewing user. All users not assigned
 * a group are in the `default` group. See [[User.groups]], [[Appearance.enabled]].
 */
class GroupMask extends Set {
    /**
     * Create a new mask containing the given groups.
     * @param context An active MRE app context
     * @param initialContents A list of group names to be added to this GroupMask
     */
    constructor(context, initialContents = null) {
        super();
        this.context = context;
        // tslint:disable-next-line:variable-name
        this._allowDefault = true;
        if (initialContents) {
            for (const group of initialContents) {
                if (this.allowDefault || group !== 'default') {
                    this.getOrAddMapping(group);
                    super.add(group);
                }
            }
        }
    }
    /** @hidden */
    get allowDefault() { return this._allowDefault; }
    set allowDefault(val) {
        this._allowDefault = val;
        this.delete('default');
    }
    /**
     * Generates a new mask containing every group currently defined.
     * @param context An active MRE app context
     */
    static All(context) {
        return this.FromPacked(context, this.ALL_PACKED);
    }
    /** @hidden */
    static FromPacked(context, value) {
        const group = new GroupMask(context);
        group.setPacked(value);
        return group;
    }
    /** @hidden */
    packed() {
        let pack = 0;
        for (const group of this) {
            pack |= this.getOrAddMapping(group);
        }
        if (pack === 0 && !this.allowDefault) {
            pack = this.getOrAddMapping('default');
        }
        return pack;
    }
    /** @hidden */
    toJSON() {
        return this.packed();
    }
    getOrAddMapping(name) {
        const mapping = this.context.internal.userGroupMapping;
        if (!mapping[name]) {
            const lastIndex = Object.keys(mapping).length;
            // all bitwise inputs are coerced to 32-bit signed ints
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
            if (lastIndex >= 32) {
                throw new Error(`User group count limit reached! Failed to add new user group "${name}"`);
            }
            mapping[name] = 1 << lastIndex;
        }
        return mapping[name];
    }
    /** @hidden */
    onChanged(callback) {
        this.changedCallback = callback;
    }
    /** @hidden */
    getClean() {
        return this.changedCallback === undefined ? this : new GroupMask(this.context, this);
    }
    /**
     * Add a group to this mask
     * @param item The group to add
     */
    add(item) {
        if (this.allowDefault || item !== 'default') {
            super.add(item);
            if (this.changedCallback) {
                this.changedCallback(this);
            }
        }
        return this;
    }
    /**
     * Add multiple groups to this mask
     * @param items The groups to add
     */
    addAll(items) {
        for (const i of items) {
            if (this.allowDefault || i !== 'default') {
                super.add(i);
            }
        }
        if (this.changedCallback) {
            this.changedCallback(this);
        }
        return this;
    }
    /**
     * Remove a group from this mask
     * @param item The group to remove
     * @returns Whether the group was removed from this mask
     */
    delete(item) {
        const ret = super.delete(item);
        if (ret && this.changedCallback) {
            this.changedCallback(this);
        }
        return ret;
    }
    /**
     * Remove all groups from this mask
     */
    clear() {
        super.clear();
        if (this.changedCallback) {
            this.changedCallback(this);
        }
    }
    /**
     * Make this mask contain only the given groups
     * @param items The items to add
     */
    set(items) {
        super.clear();
        this.addAll(items);
    }
    /** @hidden */
    setPacked(value) {
        super.clear();
        const mapping = this.context.internal.userGroupMapping;
        if (!this.allowDefault) {
            value = value & ~this.getOrAddMapping('default');
        }
        for (const name of Object.keys(mapping)) {
            if ((value & this.getOrAddMapping(name)) !== 0) {
                super.add(name);
            }
        }
        if (this.changedCallback) {
            this.changedCallback(this);
        }
    }
    /**
     * Check if a group is in this mask
     * @param item The group to check
     * @returns Whether the group is in this mask
     */
    has(item) {
        return super.has(item);
    }
}
GroupMask.ALL_PACKED = ~0;
GroupMask.NONE_PACKED = 0;
exports.GroupMask = GroupMask;
//# sourceMappingURL=groupMask.js.map