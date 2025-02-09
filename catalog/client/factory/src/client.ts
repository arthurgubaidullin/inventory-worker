import {
	type CatalogClient,
	type CatalogItem,
} from "@inventory-worker/catalog-client-types";
import * as HttpClient from "@inventory-worker/catalog-http-client";
import { signal } from "@preact/signals";

const create = (): CatalogClient => {
	const fetcher = HttpClient.get();

	const store = signal<CatalogItem[]>([]);

	const fetchCatalog = async () => {
		const response = await fetcher.getItems();

		store.value = response.items;
	};

	return {
		items: () => {
			return store;
		},
		addItem: async (data: { name: string }) => {
			await fetcher.addItem({
				name: data.name,
			});

			await fetchCatalog();
		},
		fetch: fetchCatalog,
	};
};

let instance: CatalogClient | null = null;

export const get = (): CatalogClient => {
	if (!instance) {
		instance = create();
	}
	return instance;
};
