import { type Logger } from "@inventory-worker/logger-types";

export const get = (): Logger => ({
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
