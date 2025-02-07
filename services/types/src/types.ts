import { type CatalogService } from "@inventory-worker/catalog-service-types";
import { type LoggerService } from "@inventory-worker/logger-types";

export interface Catalog {
	readonly catalog: CatalogService;
}

export interface Logger {
	readonly logger: LoggerService;
}

export type Services = Catalog & Logger;
