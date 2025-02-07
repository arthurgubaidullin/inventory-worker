import * as CatalogServiceFactory from "@inventory-worker/catalog-service-factory";
import * as InMemoryCatalogDatabase from "@inventory-worker/in-memory-catalog-database";
import * as InMemoryInventoryDatabase from "@inventory-worker/in-memory-inventory-database";
import * as InventoryServiceFactory from "@inventory-worker/inventory-service-factory";
import * as LoggerFactory from "@inventory-worker/logger-factory";
import type { Services } from "@inventory-worker/services-types";

export const create = (): Services => {
	const logger = LoggerFactory.get();

	const catalogDatabase = InMemoryCatalogDatabase.getInMemoryCatalogService();

	const inventoryDatabase = InMemoryInventoryDatabase.get();

	const catalog = CatalogServiceFactory.create(catalogDatabase, logger);

	const inventory = InventoryServiceFactory.create(inventoryDatabase, logger);

	return {
		catalog,
		inventory,
		logger,
	};
};
