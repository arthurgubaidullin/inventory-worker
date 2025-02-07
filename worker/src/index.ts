import { create, fromJson, toJsonString } from "@bufbuild/protobuf";
import {
	CatalogItemList,
	CatalogItemListSchema,
	CreateCatalogItem,
	CreateCatalogItemSchema,
} from "@inventory-worker/catalog-http-contracts";
import * as InMemoryServices from "@inventory-worker/in-memory-services";
import InventoryWorker from "./inventory";

const { catalog } = InMemoryServices.get();

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (new URL(request.url).pathname.startsWith("/inventory")) {
			return await InventoryWorker.fetch(request, env, ctx);
		}

		if (request.method === "POST") {
			let createCatalogItem: CreateCatalogItem;
			try {
				createCatalogItem = fromJson(
					CreateCatalogItemSchema,
					await request.json(),
				);
			} catch (error) {
				return new Response(null, {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}

			await catalog.addCatalogItem(createCatalogItem);

			const item = { id: createCatalogItem.id };

			return new Response(JSON.stringify(item), {
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const items = await catalog.getCatalogItems();

			const response: CatalogItemList = create(CatalogItemListSchema, {
				items: Array.from(items),
			});

			return new Response(toJsonString(CatalogItemListSchema, response), {
				headers: { "Content-Type": "application/json" },
			});
		}
	},
} satisfies ExportedHandler<Env>;
