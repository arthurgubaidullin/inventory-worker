export interface CatalogItem {
	readonly id: string;
	readonly name: string;
}

export interface AddCatalogItem {
	readonly addCatalogItem: (item: CatalogItem) => Promise<CatalogItem>;
}

export interface GetCatalogItems {
	readonly getCatalogItems: () => Promise<CatalogItem[]>;
}

export type CatalogService = AddCatalogItem & GetCatalogItems;
