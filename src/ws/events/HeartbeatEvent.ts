import { GatewayOperationCode } from "../Gateway";
import { GatewayUser } from "../GatewayUser";
import { HeartbeatPayloadData } from "../Payload";
import { GatewayEvent, GatewayEventType } from "./GatewayEvent";

export class HeartbeatEvent extends GatewayEvent {
	constructor() {
		super(GatewayOperationCode.HEARTBEAT, GatewayEventType.RECIEVE);
	}

	/**
	 * Called when the Gateway event occurs.
	 * @param data The JSON data passed from the websocket on message event.
	 */
	invoke(user: GatewayUser, data: HeartbeatPayloadData) {
		GatewayEvent.emitEvent(GatewayOperationCode.HEARTBEAT_ACK, user);
	}
}
