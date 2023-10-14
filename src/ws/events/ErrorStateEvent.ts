import { GatewayOperationCode } from "../Gateway";
import { GatewayUser } from "../GatewayUser";
import { GatewayEvent, GatewayEventType } from "./GatewayEvent";

export class ErrorStateEvent extends GatewayEvent {
	constructor() {
		super(GatewayOperationCode.ERROR_STATE, GatewayEventType.SEND);
	}

	emit(user: GatewayUser): void {
		user.send({
			operation_code: this.operationCode,
			data: user.getError(),
		});
	}
}
