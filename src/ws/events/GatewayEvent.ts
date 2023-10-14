import { GatewayOperationCode } from "../Gateway";
import { GatewayUser } from "../GatewayUser";

export type GatewayEvents = "READY" | "MESSAGE_CREATE" | "MESSAGE_DELETE";

export enum GatewayEventType {
	RECIEVE,
	SEND,
}

export class GatewayEvent {
	private static _events: Map<GatewayOperationCode, GatewayEvent> = new Map<
		GatewayOperationCode,
		GatewayEvent
	>();

	static getEvent(operationCode: GatewayOperationCode) {
		return this._events.get(operationCode) as GatewayEvent;
	}

	static emitEvent(
		operationCode: GatewayOperationCode,
		user: GatewayUser,
		data?: any
	) {
		const event = this.getEvent(operationCode);
		if (event == null) return;
		event.emit(user, data);
	}

	constructor(
		readonly operationCode: GatewayOperationCode,
		readonly type: GatewayEventType
	) {
		GatewayEvent._events.set(operationCode, this);
	}

	invoke(user: GatewayUser, data: any) {}
	emit(user: GatewayUser, data?: any) {}
}
