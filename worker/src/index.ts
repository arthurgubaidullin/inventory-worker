import { Hono } from "hono";
import * as Catalog from "@inventory-worker/catalog-http-service";
import * as Inventory from "@inventory-worker/inventory-http-service";
import * as InMemoryServices from "@inventory-worker/in-memory-services";

const services = InMemoryServices.get();

const app = new Hono();

app.route("/inventory", Inventory.get(services));

app.route("/catalog", Catalog.get(services));

export default app;
