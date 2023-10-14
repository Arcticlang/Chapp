import { Request, Response } from "express";
import { Route } from "../Route";
import { Server } from "../Server";
import mongoose from "mongoose";
import { ChatModel, chatSchema } from "../../database/schemas";
import { Chat } from "../../types";

export class ChatAPI extends Route {
	constructor(private _server: Server) {
		super("chat");
		this.initalise();
	}

	initalise(): void {
		this.getRouter().get("/:id", this.getChat.bind(this));
		this.getRouter().post("/:chatid", this.createChat.bind(this));
		// this.getRouter().post("/", verifyToken, this.createGroup.bind(this));
	}

	async createChat(req: Request, res: Response) {
		const chat_id = req.params.chatid;
		var body = req.body;

		var chat: Chat = body as Chat; // TODO: reformat body to Chat object

		var chat_model = new ChatModel({
			author_id: chat.author_id,
			chat_id: chat_id,
			content: chat.content,
			created_at: chat.created_at,
			modified_at: chat.modified_at,
		});

		const chat_obj = await chat_model.save();

		res.status(200).json(chat_obj.toJSON());
	}

	async getChat(req: Request, res: Response) {
		const id = req.params.id;
		const chat = await ChatModel.findById(id);

		if (chat) return res.status(200).json(chat.toJSON());
		else
			return res
				.status(404)
				.json({ message: "The specified chat does not exist." });
	}

	// async createGroup(req: Request, res: Response) {
	// 	const { name } = req.body;

	// 	// if ((await RoomModel.exists({ name })) != null) {
	// 	// 	res.status(409).json({
	// 	// 		message: `Room with id '${name}' does not exist.`,
	// 	// 	});
	// 	// 	return;
	// 	// }

	// 	const room = new GroupModel({
	// 		name,
	// 	});
	// 	await room.save();

	// 	res.status(200).json({
	// 		id: room._id,
	// 		name: room.name,
	// 	});
	// }
}
