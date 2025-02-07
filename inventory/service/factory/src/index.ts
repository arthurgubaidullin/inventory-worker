import type { InventoryDatabase } from "@inventory-worker/inventory-database-types";
import type { InventoryService } from "@inventory-worker/inventory-service-types";
import { type LoggerService } from "@inventory-worker/logger-types";
import { addGoods } from "./add-goods.js";
import { removeGoods } from "./remove-goods.js";

export const create = (
	db: InventoryDatabase,
	logger: LoggerService,
): InventoryService => {
	return {
		getCurrentStock: async (catalogId) => {
			return db.getItem(catalogId);
		},
		receivedGoods: async (change) => {
			const existing = await db.getItem(change.catalogId);

			if (!existing) {
				return;
			}

			const edited = addGoods(change.quantity)(existing);

			await db.updateItem(edited);
		},
		soldGoods: async (change) => {
			const existing = await db.getItem(change.catalogId);

			if (!existing) {
				return;
			}

			const edited = removeGoods(change.quantity)(existing);

			await db.updateItem(edited);
		},
	};
};
