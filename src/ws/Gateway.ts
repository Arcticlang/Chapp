import { WebSocket, WebSocketServer } from "ws";
import crypto from "crypto";

import { WhoYouEvent } from "./events/WhoYouEvent";
import { GatewayUser } from "./GatewayUser";
import { ConnectedEvent } from "./events/ConnectedEvent";
import { HeartbeatEvent } from "./events/HeartbeatEvent";
import { DispatchEvent } from "./events/DispatchEvent";
import { HeartbeatAckEvent } from "./events/HeartbeatAckEvent";
import { ErrorStateEvent } from "./events/ErrorStateEvent";

export enum GatewayOperationCode {
	CONNECTED = 0, // Client Recieve
	WHO_YOU = 1, // Client Send
	HEARTBEAT = 2, // Client Send
	HEARTBEAT_ACK = 3, // Client Recieve
	DISPATCH = 4, // Client Recieve
	ERROR_STATE = 5, // Client Recieve
}

export class Gateway {
	private _server: WebSocketServer;

	// The key will be a UUID describing the unique connection between the user and server.
	private _gatewayUsers: Map<string, GatewayUser>;
	private _gatewayUserIds: Map<WebSocket, string>;

	constructor() {
		this._server = new WebSocketServer({
			port: parseInt(process.env.WS_PORT!),
		});

		this._gatewayUsers = new Map();
		this._gatewayUserIds = new Map();
	}

	/**
	 * Handles the connection of a socket.
	 * This includes when the socket sends a message, leaves etc.
	 * @param socket The websocket that has joined the server.
	 */
	connection(socket: WebSocket) {
		const uuid = crypto.randomUUID();
		const gatewayUser = new GatewayUser(uuid, socket);

		this._gatewayUserIds.set(socket, uuid);
		this._gatewayUsers.set(uuid, gatewayUser);

		gatewayUser.onConnected();
	}

	/**
	 * Handles the closing of the websocket server.
	 * Makes sure that everything is saved etc.
	 */
	serverClose() {}

	/**
	 * Setups the gateway events.
	 * These will be called when a socket decides they want data,
	 * or if an event occurs and the socket is connected to a room.
	 */
	initaliseEvents() {
		new WhoYouEvent();
		new ConnectedEvent();
		new HeartbeatEvent();
		new HeartbeatAckEvent();
		new DispatchEvent();
		new ErrorStateEvent();
	}

	/**
	 * Starts & setups the gateway server.
	 */
	start() {
		this.initaliseEvents();

		this._server.on("connection", this.connection.bind(this));
		this._server.on("close", this.serverClose.bind(this));
	}
}
