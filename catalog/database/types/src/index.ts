export interface CatalogItem {
	readonly id: string;
	readonly name: string;
}

export interface CatalogDatabase {
	readonly addItem: (item: CatalogItem) => Promise<void>;
	readonly getItems: () => Promise<ReadonlyArray<CatalogItem>>;
}
