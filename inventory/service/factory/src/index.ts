import type { InventoryDatabase } from "@inventory-worker/inventory-database-types";
import type {
	InventoryService,
	Item,
} from "@inventory-worker/inventory-service-types";
import type { GetCatalogItem } from "@inventory-worker/catalog-service-types";
import { type LoggerService } from "@inventory-worker/logger-types";
import { addGoods } from "./add-goods.js";
import { removeGoods } from "./remove-goods.js";
import { fromNullable } from "./item.js";

export const create = (
	db: InventoryDatabase,
	catalog: GetCatalogItem,
	logger: LoggerService,
): InventoryService => {
	const getCurrentStock = async (catalogId: string) => {
		const catalogItem = await catalog.getItem(catalogId);

		if (!catalogItem) {
			return null;
		}

		const item = await db.getItem(catalogId);

		return fromNullable(catalogId)(item);
	};

	return {
		getCurrentStock,
		receivedGoods: async (change) => {
			const existing = await db.getItem(change.catalogId);

			const edited = addGoods(change.quantity)(
				fromNullable(change.catalogId)(existing),
			);

			if (!existing) {
				await db.addItem(edited);
				return;
			}

			await db.updateItem(edited);
		},
		soldGoods: async (change) => {
			const existing = await db.getItem(change.catalogId);

			const edited = removeGoods(change.quantity)(
				fromNullable(change.catalogId)(existing),
			);

			if (!existing) {
				await db.addItem(edited);

				return;
			}

			await db.updateItem(edited);
		},
	};
};
