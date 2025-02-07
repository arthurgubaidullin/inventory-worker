import type { Item } from "@inventory-worker/inventory-service-types";

export const initial = (catalogId: string): Item => ({
	catalogId,
	quantity: 0,
});

export const fromNullable =
	(catalogId: string) =>
	(item: Item | null): Item =>
		item ? item : initial(catalogId);
