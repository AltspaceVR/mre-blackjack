/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 * Installs "watchers" for leaf properties in the target object, and calls the supplied callback
 * when they change and passing the entire path to the leaf, e.g.: ["transform", "position", "z"]
 */
export declare function observe(options: {
    target: any;
    targetName: string;
    notifyChanged: (...path: string[]) => void;
    triggerNotificationsNow?: boolean;
}): void;
/**
 * @hidden
 * Uninstalls "watchers" for leaf properties in the target object, and removes the attached callbacks from
 * the target object.
 * @param target The target object to unobserve.
 */
export declare function unobserve(target: any): void;
//# sourceMappingURL=observe.d.ts.map