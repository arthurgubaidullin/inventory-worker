import { create, fromJson, toJsonString } from "@bufbuild/protobuf";
import * as InMemoryServices from "@inventory-worker/in-memory-services";
import {
	ActionSchema,
	ActionType,
	InventoryItemSchema,
} from "@inventory-worker/inventory-http-contracts";
import { Hono } from "hono";
import { JSONResponse } from "./json-response";

const { inventory } = InMemoryServices.get();

const app = new Hono();

app.post("/actions", async (c) => {
	const action = fromJson(ActionSchema, await c.req.json());

	if (action.type === ActionType.RECEIVED_GOODS) {
		await inventory.receivedGoods(action);
	}

	if (action.type === ActionType.SOLD_GOODS) {
		await inventory.soldGoods(action);
	}

	return JSONResponse(null, {
		status: 202,
	});
});

app.get("/:id", async (c) => {
	const catalogId = c.req.param("id");

	const inventoryItem = await inventory.getCurrentStock(catalogId);

	if (!inventoryItem) {
		return new Response(null, { status: 410 });
	}

	const json = toJsonString(
		InventoryItemSchema,
		create(InventoryItemSchema, inventoryItem),
	);

	return JSONResponse(json);
});

export default app;
