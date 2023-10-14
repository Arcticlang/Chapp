import { GatewayOperationCode } from "../Gateway";
import { GatewayUser } from "../GatewayUser";
import { GatewayEvent, GatewayEventType } from "./GatewayEvent";

export class HeartbeatAckEvent extends GatewayEvent {
	constructor() {
		super(GatewayOperationCode.HEARTBEAT_ACK, GatewayEventType.SEND);
	}

	emit(user: GatewayUser): void {
		if (user.hadError()) {
			GatewayEvent.emitEvent(GatewayOperationCode.ERROR_STATE, user);
			return;
		}
		user.send({
			operation_code: this.operationCode,
		});
	}
}
