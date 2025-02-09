import { Hono } from "hono";
import * as Catalog from "@inventory-worker/catalog-http-service";
import InventoryWorker from "./inventory";
import * as InMemoryServices from "@inventory-worker/in-memory-services";

const services = InMemoryServices.get();

const app = new Hono();

app.route("/inventory", InventoryWorker);

app.route("/catalog", Catalog.get(services));

export default app;
