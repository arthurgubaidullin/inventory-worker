import { type CatalogService } from "@inventory-worker/catalog-service-types";
import { type CatalogDatabase } from "@inventory-worker/catalog-database-types";
import { type LoggerService } from "@inventory-worker/logger-types";

export const create = (
	db: CatalogDatabase,
	logger: LoggerService,
): CatalogService => {
	return {
		addCatalogItem: async (item) => {
			await db.addItem(item);

			logger.info({ service: "catalog", tag: "item_added", item });

			return item;
		},
		getItem: async (id) => {
			return await db.getItem(id);
		},
		getCatalogItems: async () => {
			const items = await db.getItems();

			return Array.from(items);
		},
	};
};
