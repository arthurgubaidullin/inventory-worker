import * as Catalog from "@inventory-worker/catalog-http-service";
import * as Inventory from "@inventory-worker/inventory-http-service";
import type { Services } from "@inventory-worker/services-types";
import { Hono } from "hono";

export const get = (services: Services): Hono => {
	const app = new Hono();

	app.route("/inventory", Inventory.get(services));

	app.route("/catalog", Catalog.get(services));

	return app;
};
