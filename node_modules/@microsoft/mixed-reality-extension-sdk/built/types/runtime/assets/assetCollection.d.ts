/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Asset } from '.';
export default class AssetCollection<T extends Asset> {
    private collection;
    private _count;
    readonly count: number;
    byIndex(index: number): T;
    byName(name: string): T;
    push(asset: T): void;
}
//# sourceMappingURL=assetCollection.d.ts.map