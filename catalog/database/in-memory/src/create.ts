import {
	type CatalogService,
	type CatalogItem,
} from "@inventory-worker/catalog-database-service";

export const create = (): CatalogService => {
	const db = new Map<string, CatalogItem>();

	return {
		addItem: async (item) => {
			if (db.has(item.id)) {
				return;
			}

			db.set(item.id, item);
		},
		getItems: async () => {
			return Array.from(db.values());
		},
	};
};
