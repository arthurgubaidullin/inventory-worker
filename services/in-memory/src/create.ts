import * as CatalogServiceFactory from "@inventory-worker/catalog-service-factory";
import * as InMemoryCatalogDatabase from "@inventory-worker/in-memory-catalog-database";
import * as LoggerFactory from "@inventory-worker/logger-factory";
import type { Services } from "@inventory-worker/services-types";

export const create = (): Services => {
	const logger = LoggerFactory.get();

	const catalogDatabase = InMemoryCatalogDatabase.getInMemoryCatalogService();

	const catalog = CatalogServiceFactory.create(catalogDatabase, logger);

	return {
		catalog,
		logger,
	};
};
