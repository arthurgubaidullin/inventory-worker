import type { InventoryService } from "@inventory-worker/inventory-service-types";
import type { InventoryDatabase } from "@inventory-worker/inventory-database-types";
import { type LoggerService } from "@inventory-worker/logger-types";

export const create = (
	db: InventoryDatabase,
	logger: LoggerService,
): InventoryService => {
	return {
		getCurrentStock: async (catalogId) => {
			return { catalogId, quantity: 0 };
		},
		receivedGoods: async (item) => {},
		soldGoods: async (item) => {},
	};
};
