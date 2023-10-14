import { GatewayOperationCode } from "./Gateway";
import { GatewayEvents } from "./events/GatewayEvent";

export interface Payload {
	operation_code: GatewayOperationCode;
	data?: any;
}

export interface WhoYouPayloadData {
	token: string;
	client_application: string;
}

export interface ConnectedPayloadData {
	heartbeat_interval: number;
}

export interface HeartbeatPayloadData {}

export interface DispatchPayloadData {
	type: GatewayEvents;
	event_data: any;
}
