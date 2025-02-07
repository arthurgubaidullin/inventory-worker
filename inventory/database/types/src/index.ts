export interface InventoryItem {
	readonly catalogId: string;
	readonly quantity: number;
}

export interface InventoryDatabase {
	readonly addItem: (item: InventoryItem) => Promise<void>;
	readonly updateItem: (item: InventoryItem) => Promise<void>;
	readonly getItem: (itemId: string) => Promise<InventoryItem | null>;
}
