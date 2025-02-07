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

export interface GetCatalogItem {
	readonly getItem: (id: string) => Promise<CatalogItem | null>;
}

export type CatalogService = AddCatalogItem & GetCatalogItem & GetCatalogItems;
