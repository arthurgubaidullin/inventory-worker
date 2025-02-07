import { create, fromJsonString, toJsonString } from "@bufbuild/protobuf";
import * as InMemoryServices from "@inventory-worker/in-memory-services";
import {
	ActionSchema,
	ActionType,
	InventoryItemSchema,
} from "@inventory-worker/inventory-http-contracts";

const { inventory } = InMemoryServices.get();

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const path = new URL(request.url).pathname;

		const prefix = "/inventory";

		const actions_prefix = `${prefix}/actions`;

		if (path.startsWith(actions_prefix) && request.method === "POST") {
			const action = fromJsonString(ActionSchema, await request.json());

			if ((action.type = ActionType.RECEIVED_GOODS)) {
				await inventory.receivedGoods(action);
			}
			if ((action.type = ActionType.SOLD_GOODS)) {
				await inventory.soldGoods(action);
			}

			return new Response(null, { status: 202 });
		}

		if (path.startsWith(`${prefix}/`) && request.method === "GET") {
			const catalogId = path.slice(`${prefix}/`.length);

			const item = await inventory.getCurrentStock(catalogId);

			if (!item) {
				return new Response(null, { status: 410 });
			}

			return new Response(
				toJsonString(InventoryItemSchema, create(InventoryItemSchema, item)),
			);
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
