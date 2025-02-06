import { fromJson, toJsonString } from "@bufbuild/protobuf";
import {
	CatalogItem,
	CatalogItemList,
	CatalogItemListSchema,
	CreateCatalogItem,
	CreateCatalogItemSchema,
} from "@inventory-worker/catalog-http-contracts";
import { getInMemoryCatalogService } from "@inventory-worker/in-memory-catalog-database-service";

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

			return new Response(JSON.stringify({ id: createCatalogItem.id }), {
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const items = await db.getItems();

			const response: CatalogItemList = {
				$typeName: "CatalogItemList",
				items: items.map(
					(item): CatalogItem => ({ $typeName: "CatalogItem", ...item }),
				),
			};

			return new Response(toJsonString(CatalogItemListSchema, response), {
				headers: { "Content-Type": "application/json" },
			});
		}
	},
} satisfies ExportedHandler<Env>;
