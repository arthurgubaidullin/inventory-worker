import { create, fromJson, toJsonString } from "@bufbuild/protobuf";
import {
	type CatalogItemList,
	CatalogItemListSchema,
	type CreateCatalogItem,
	CreateCatalogItemSchema,
} from "@inventory-worker/catalog-http-contracts";
import { type CatalogService as Catalog } from "@inventory-worker/catalog-service-types";
import { Hono } from "hono";
import { JSONResponse } from "@inventory-worker/http-response";

export const get = ({ catalog }: { catalog: Catalog }): Hono => {
	const app = new Hono();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.get("", async (c) => {
		const items = await catalog.getCatalogItems();

		const response: CatalogItemList = create(CatalogItemListSchema, {
			items: Array.from(items),
		});

		return JSONResponse(toJsonString(CatalogItemListSchema, response));
	});

	app.post("", async (c) => {
		let createCatalogItem: CreateCatalogItem;
		try {
			createCatalogItem = fromJson(CreateCatalogItemSchema, await c.req.json());
		} catch {
			return JSONResponse(null, {
				status: 400,
			});
		}

		await catalog.addCatalogItem(createCatalogItem);

		const item = { id: createCatalogItem.id };

		return JSONResponse(JSON.stringify(item), { status: 201 });
	});

	return app;
};
