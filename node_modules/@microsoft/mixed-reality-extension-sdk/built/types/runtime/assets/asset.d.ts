/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { AssetManager, MaterialLike, MeshLike, PrefabLike, SoundLike, TextureLike } from '.';
/**
 * Instructions for how to load an asset.
 */
export interface AssetSource {
    /**
     * The format of the asset container.
     */
    containerType: 'gltf' | 'library';
    /**
     * The URI at which the asset container can be found.
     */
    uri?: string;
    /**
     * A designator for which asset in the container this is. Format will be different for each container type.
     * For example, a glTF's third material would have "materials/2" as its internalId.
     */
    internalId?: string;
}
export interface AssetLike {
    /**
     * The unique id of this asset. Use this to reference this asset in actors, etc.
     */
    id: string;
    /**
     * A human-readable string identifying the asset. Not required to be unique, but
     * can be referenced by name if it is.
     */
    name?: string;
    /**
     * Where this asset came from. Used for loading on late-joining clients.
     */
    source?: AssetSource;
    /** Only populated when this asset is a prefab. An asset will have only one of these types specified. */
    prefab?: Partial<PrefabLike>;
    /** Only populated when this asset is a mesh. An asset will have only one of these types specified. */
    mesh?: Partial<MeshLike>;
    /** Only populated when this asset is a material. An asset will have only one of these types specified. */
    material?: Partial<MaterialLike>;
    /** Only populated when this asset is a texture. An asset will have only one of these types specified. */
    texture?: Partial<TextureLike>;
    /** Only populated when this asset is a sound. An asset will have only one of these types specified. */
    sound?: Partial<SoundLike>;
}
/** The base class for all asset types. */
export declare abstract class Asset implements AssetLike {
    manager: AssetManager;
    private _id;
    private _name;
    private _source;
    /** @inheritdoc */
    readonly id: string;
    /** @inheritdoc */
    readonly name: string;
    /** @inheritdoc */
    readonly source: AssetSource;
    protected constructor(manager: AssetManager, def: Partial<AssetLike>);
    /** @hidden */
    protected toJSON(): AssetLike;
    /** @hidden */
    copy(from: Partial<AssetLike>): this;
    /** @hidden */
    static Parse(manager: AssetManager, def: AssetLike): Asset;
}
//# sourceMappingURL=asset.d.ts.map