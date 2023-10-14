import jwt from "jsonwebtoken";
import { GatewayOperationCode } from "../Gateway";
import { WhoYouPayloadData } from "../Payload";
import { GatewayEvent, GatewayEventType } from "./GatewayEvent";
import { GatewayUser } from "../GatewayUser";
import { UserModel } from "../../database/schemas";
import { ErrorCode, errorAsJSON } from "../../types";
import mongoose from "mongoose";

export class WhoYouEvent extends GatewayEvent {
	constructor() {
		super(GatewayOperationCode.WHO_YOU, GatewayEventType.RECIEVE);
	}

	/**
	 * Called when the Gateway event occurs.
	 * @param data The JSON data passed from the websocket on message event.
	 */
	async invoke(user: GatewayUser, data: WhoYouPayloadData) {
		var payload: {
			id: string;
			password: string;
		};
		try {
			payload = jwt.verify(
				data.token,
				process.env.TOKEN_SECRET as string
			) as {
				id: string;
				password: string;
			};
		} catch {
			user.sendError({
				code: ErrorCode.GATEWAY_INVALID_TOKEN,
				message: `Token provided is invalid.`,
			});
			return;
		}

		const dbUser = await UserModel.findOne({
			_id: payload.id,
		});
		if (!dbUser) {
			user.sendError({
				code: ErrorCode.GATEWAY_INVALID_TOKEN,
				message: `The user connected with that token is invalid.`,
			});
			return;
		}

		user.setUser({
			id: dbUser.id,
			username: dbUser.username,
			password: dbUser.password,
			created_at: dbUser.created_at,
		});
	}
}
