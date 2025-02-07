import { create, fromJson, toJsonString } from "@bufbuild/protobuf";
import {
	CatalogItemList,
	CatalogItemListSchema,
	CreateCatalogItem,
	CreateCatalogItemSchema,
} from "@inventory-worker/catalog-http-contracts";
import * as InMemoryServices from "@inventory-worker/in-memory-services";
import { Hono } from "hono";

const { catalog } = InMemoryServices.get();

const app = new Hono();

app.get("", async (c) => {
	const items = await catalog.getCatalogItems();

	const response: CatalogItemList = create(CatalogItemListSchema, {
		items: Array.from(items),
	});

	return new Response(toJsonString(CatalogItemListSchema, response), {
		headers: { "Content-Type": "application/json" },
	});
});

app.post("", async (c) => {
	let createCatalogItem: CreateCatalogItem;
	try {
		createCatalogItem = fromJson(CreateCatalogItemSchema, await c.req.json());
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
});

export default app;
