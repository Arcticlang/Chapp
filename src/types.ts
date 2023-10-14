export enum ErrorCode {
	// Gateway Errors will be prefixed with 5.
	GATEWAY_INVALID_EVENT = 50000,
	GATEWAY_INVALID_TOKEN = 50001,
}

export interface Error {
	code: ErrorCode;
	message: string;
}

export function errorAsJSON(error: Error) {
	return JSON.stringify(error, null, 4);
}

export interface Directory {
	id: string;
	name: string;
	created_at: number;
}

export interface User {
	id: string;
	username: string;
	password: string;
	created_at: number;
}

export interface Chat {
	id: string;
	author_id: string;
	chat_id: string;
	content: string;
	created_at: number;
	modified_at: number;
}
