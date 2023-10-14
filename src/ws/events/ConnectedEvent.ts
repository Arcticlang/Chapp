import { GatewayOperationCode } from "../Gateway";
import { ConnectedPayloadData } from "../Payload";
import { GatewayEvent, GatewayEventType } from "./GatewayEvent";
import { GatewayUser } from "../GatewayUser";

export class ConnectedEvent extends GatewayEvent {
	constructor() {
		super(GatewayOperationCode.CONNECTED, GatewayEventType.SEND);
	}

	emit(user: GatewayUser): void {
		const data = {
			heartbeat_interval: user.getHeartbeatInterval(),
		} as ConnectedPayloadData;

		user.send({
			operation_code: this.operationCode,
			data,
		});
	}
}
