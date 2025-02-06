import { type CatalogService } from "@inventory-worker/catalog-database-service";
import { create } from "./create.js";

const db = create();

export const getInMemoryCatalogService = (): CatalogService => {
	return db;
};
