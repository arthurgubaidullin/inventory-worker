import * as Services from "@inventory-worker/http-services";
import * as InMemory from "@inventory-worker/in-memory-services";
import { Hono } from "hono";

const service = Services.get(InMemory.get());

const app = new Hono();

app.route("/api", service);

export default app;
