import { create, fromJson, toJsonString } from "@bufbuild/protobuf";
import { JSONResponse } from "@inventory-worker/http-response";
import {
	ActionSchema,
	ActionType,
	InventoryItemSchema,
} from "@inventory-worker/inventory-http-contracts";
import type { InventoryService } from "@inventory-worker/inventory-service-types";
import { Hono } from "hono";

export const get = ({ inventory }: { inventory: InventoryService }): Hono => {
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

	return app;
};
