export interface Item {
	readonly catalogId: string;
	readonly quantity: number;
}

export interface ReceivedGoods {
	readonly receivedGoods: (item: Item) => Promise<void>;
}

export interface SoldGoods {
	readonly soldGoods: (item: Item) => Promise<void>;
}

export interface GetCurrentStock {
	readonly getCurrentStock: (catalogId: string) => Promise<Item>;
}

export type InventoryService = ReceivedGoods & SoldGoods & GetCurrentStock;
