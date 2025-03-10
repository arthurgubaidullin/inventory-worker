import {
	type CatalogDatabase,
	type CatalogItem,
} from "@inventory-worker/catalog-database-types";

export const create = (): CatalogDatabase => {
	const db = new Map<string, CatalogItem>();

	return {
		addItem: async (item) => {
			if (db.has(item.id)) {
				return;
			}

			db.set(item.id, item);
		},
		getItem: async (id) => {
			return db.get(id) ?? null;
		},
		getItems: async () => {
			return Array.from(db.values());
		},
	};
};
