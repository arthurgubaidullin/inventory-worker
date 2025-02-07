import { fromJson, toJsonString, create } from "@bufbuild/protobuf";
import {
	CatalogItem,
	CatalogItemList,
	CatalogItemListSchema,
	CatalogItemSchema,
	CreateCatalogItem,
	CreateCatalogItemSchema,
} from "@inventory-worker/catalog-http-contracts";
import { getInMemoryCatalogService } from "@inventory-worker/in-memory-catalog-database";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const db = getInMemoryCatalogService();

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

			await db.addItem(createCatalogItem);

			const item = { id: createCatalogItem.id };

			return new Response(JSON.stringify(item), {
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const items = await db.getItems();

			const response: CatalogItemList = create(CatalogItemListSchema, {
				items: Array.from(items),
			});

			return new Response(toJsonString(CatalogItemListSchema, response), {
				headers: { "Content-Type": "application/json" },
			});
		}
	},
} satisfies ExportedHandler<Env>;
