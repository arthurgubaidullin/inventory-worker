export interface CatalogItem {
	readonly id: string;
	readonly name: string;
}

export interface CatalogDatabase {
	readonly addItem: (item: CatalogItem) => Promise<void>;
	readonly getItems: () => Promise<ReadonlyArray<CatalogItem>>;
	readonly getItem: (id: string) => Promise<CatalogItem | null>;
}
