import { type CatalogService } from "@inventory-worker/catalog-service-types";

export interface Catalog {
	readonly catalog: CatalogService;
}

export type Services = Catalog;
