import {
	type InventoryDatabase,
	type InventoryItem,
} from "@inventory-worker/inventory-database-types";

export const create = (): InventoryDatabase => {
	const db = new Map<string, InventoryItem>();

	return {
		addItem: async (item) => {
			if (db.has(item.id)) {
				return;
			}

			db.set(item.id, item);
		},
		getItem: async (itemId) => {
			return db.get(itemId) ?? null;
		},
		updateItem: async (item) => {
			if (!db.has(item.id)) {
				return;
			}

			db.set(item.id, item);
		},
	};
};
