import { type CatalogService } from "@inventory-worker/catalog-service-types";
import { type CatalogDatabase } from "@inventory-worker/catalog-database-types";

export const create = (db: CatalogDatabase): CatalogService => {
	return {
		addCatalogItem: async (item) => {
			await db.addItem(item);

			return item;
		},
		getCatalogItems: async () => {
			const items = await db.getItems();

			return Array.from(items);
		},
	};
};
