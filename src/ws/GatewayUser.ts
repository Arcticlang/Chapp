import { WebSocket, RawData } from "ws";
import { GatewayOperationCode } from "./Gateway";
import { DispatchPayloadData, Payload } from "./Payload";
import { GatewayEvent, GatewayEventType } from "./events/GatewayEvent";
import { Error, ErrorCode, User, errorAsJSON } from "../types";

export class GatewayUser {
	private _connectionTime: number;
	private _heartbeatInterval: number;

	private _user: User | null;

	private _hadError: boolean = false;
	private _previousError!: Error | null;

	constructor(readonly uuid: string, private _socket: WebSocket) {
		this._connectionTime = 0;
		this._heartbeatInterval = 0;
		this._user = null;
	}

	onConnected() {
		this._connectionTime = Date.now();

		this._socket.on("message", this.onMessage.bind(this));

		this._socket.ping();
		this._socket.on("pong", () => {
			let currentTime = Date.now();
			this._heartbeatInterval =
				(currentTime - this._connectionTime) * 1000;
			GatewayEvent.emitEvent(GatewayOperationCode.CONNECTED, this);
		});
	}

	/**
	 * We recieve data from the client.
	 */
	async onMessage(messageData: RawData) {
		const { operation_code, data } = JSON.parse(
			messageData.toString()
		) as Payload;
		console.log(messageData.toString());
		const gatewayEvent = GatewayEvent.getEvent(operation_code);
		if (!gatewayEvent) {
			this.sendError({
				code: ErrorCode.GATEWAY_INVALID_EVENT,
				message: `Gateway event '${operation_code}' does not exist.`,
			});
			return;
		}

		if (gatewayEvent.type == GatewayEventType.RECIEVE) {
			await gatewayEvent.invoke(this, data);
		}
	}

	send(payload: Payload) {
		this._socket.send(JSON.stringify(payload));
	}

	sendError(error: Error) {
		this._socket.send(errorAsJSON(error));
		this._hadError = true;
		this._previousError = error;
	}

	setUser(user: User) {
		this._user = user;
		GatewayEvent.emitEvent(GatewayOperationCode.DISPATCH, this, {
			type: "READY",
		} as DispatchPayloadData);
	}

	getUser() {
		return this._user;
	}

	getSocket() {
		return this._socket;
	}

	getHeartbeatInterval() {
		return this._heartbeatInterval;
	}

	hadError() {
		return this._hadError;
	}

	getError() {
		return this._previousError;
	}

	isReady() {
		return this._user != null;
	}
}
