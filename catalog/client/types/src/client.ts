import { type ReadonlySignal } from "@preact/signals";
import type { CatalogItem } from "./item.js";

export interface CatalogClient {
	readonly items: () => ReadonlySignal<ReadonlyArray<CatalogItem>>;
	readonly fetch: () => Promise<void>;
	readonly addItem: (data: Readonly<{ name: string }>) => Promise<void>;
}
