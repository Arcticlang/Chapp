import { GatewayOperationCode } from "../Gateway";
import { GatewayUser } from "../GatewayUser";
import { DispatchPayloadData } from "../Payload";
import { GatewayEvent, GatewayEventType } from "./GatewayEvent";

export class DispatchEvent extends GatewayEvent {
	constructor() {
		super(GatewayOperationCode.DISPATCH, GatewayEventType.SEND);
	}

	emit(user: GatewayUser, data: DispatchPayloadData): void {
		user.send({
			operation_code: this.operationCode,
			data,
		});
	}
}
