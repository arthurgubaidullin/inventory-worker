import {
	create,
	fromJson,
	toJsonString,
	type JsonValue,
} from "@bufbuild/protobuf";
import {
	CatalogItemListSchema,
	CreateCatalogItemSchema,
	type CatalogItemList,
} from "@inventory-worker/catalog-http-contracts";
import { nanoid } from "nanoid";

const PATH = "/api/catalog" as const;

export const get = () => {
	return {
		addItem: async (data: Readonly<{ name: string }>): Promise<void> => {
			const id = nanoid();

			await fetch(PATH, {
				method: "POST",
				body: toJsonString(
					CreateCatalogItemSchema,
					create(CreateCatalogItemSchema, { ...data, id }),
				),
			});
		},
		getItems: async (): Promise<CatalogItemList> => {
			const response = await fetch(PATH);
			const json: JsonValue = await response.json();

			return fromJson(CatalogItemListSchema, json);
		},
	};
};
