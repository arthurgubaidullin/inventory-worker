import { type LoggerService } from "@inventory-worker/logger-types";

export const get = (): LoggerService => ({
	error: (data) => {
		console.error(data);
	},
	info: (data) => {
		console.info(data);
	},
	log: (data) => {
		console.log(data);
	},
	warn: (data) => {
		console.warn(data);
	},
});
