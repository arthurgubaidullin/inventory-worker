import { type InventoryDatabase } from "@inventory-worker/inventory-database-types";
import { create } from "./create.js";

const db = create();

export const get = (): InventoryDatabase => {
	return db;
};
