import { create } from "./create.js";
import type { Services } from "@inventory-worker/services-types";

let instance: Services | null = null;

export const get = (): Services => {
	if (!instance) {
		instance = create();
	}

	return instance;
};
