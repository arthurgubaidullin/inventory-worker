export interface Info {
	readonly info: (data: Readonly<Record<string, unknown>>) => void;
}

export interface Log {
	readonly log: (data: Readonly<Record<string, unknown>>) => void;
}

export interface Error {
	readonly error: (data: Readonly<Record<string, unknown>> | Error) => void;
}

export interface Warning {
	readonly warn: (data: Readonly<Record<string, unknown>>) => void;
}

export type Logger = Log & Info & Error & Warning;
