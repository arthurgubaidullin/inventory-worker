import { Hono } from "hono";
import CatalogWorker from "./catalog";
import InventoryWorker from "./inventory";

const app = new Hono();

app.route("/inventory", InventoryWorker);

app.route("/catalog", CatalogWorker);

export default app;
