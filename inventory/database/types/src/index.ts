export interface InventoryItem {
	readonly id: string;
	readonly name: string;
}

export interface InventoryDatabase {
	readonly addItem: (item: InventoryItem) => Promise<void>;
	readonly updateItem: (item: InventoryItem) => Promise<void>;
	readonly getItem: (itemId: string) => Promise<InventoryItem | null>;
}
