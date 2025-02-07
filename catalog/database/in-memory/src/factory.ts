import { type CatalogDatabase } from "@inventory-worker/catalog-database-types";
import { create } from "./create.js";

const db = create();

export const getInMemoryCatalogService = (): CatalogDatabase => {
	return db;
};
