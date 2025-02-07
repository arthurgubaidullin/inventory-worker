export interface Item {
	readonly catalogId: string;
	readonly quantity: number;
}

export interface ChangeItem {
	readonly catalogId: string;
	readonly quantity: number;
}

export interface ReceivedGoods {
	readonly receivedGoods: (change: ChangeItem) => Promise<void>;
}

export interface SoldGoods {
	readonly soldGoods: (change: ChangeItem) => Promise<void>;
}

export interface GetCurrentStock {
	readonly getCurrentStock: (catalogId: string) => Promise<Item | null>;
}

export type InventoryService = ReceivedGoods & SoldGoods & GetCurrentStock;
