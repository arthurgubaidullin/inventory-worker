import type { Item } from "@inventory-worker/inventory-service-types";

export const addGoods =
	(quantity: number) =>
	(item: Item): Item => {
		return {
			catalogId: item.catalogId,
			quantity: item.quantity + quantity,
		};
	};
