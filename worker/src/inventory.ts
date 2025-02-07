import { create, fromJson, toJson, toJsonString } from "@bufbuild/protobuf";
import * as InMemoryServices from "@inventory-worker/in-memory-services";
import {
	ActionSchema,
	ActionType,
	InventoryItemSchema,
} from "@inventory-worker/inventory-http-contracts";
import { Hono } from "hono";

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

	return new Response(null, {
		status: 202,
		headers: { "Content-Type": "application/json" },
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

	return new Response(json, {
		headers: { "Content-Type": "application/json" },
	});
});

export default app;
