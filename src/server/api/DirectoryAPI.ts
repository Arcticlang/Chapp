import { Request, Response } from "express";
import { Route } from "../Route";
import { verifyToken } from "../../middleware";
import { Server } from "../Server";
import { DirectoryModel } from "../../database/schemas";

export class DirectoryAPI extends Route {
	constructor(private _server: Server) {
		super("directory");
		this.initalise();
	}

	initalise(): void {
		this.getRouter().post("/", verifyToken, this.createChat.bind(this));
	}

	async createChat(req: Request, res: Response) {
		const { name } = req.body;

		if (!name) {
			res.status(400).json({
				message: "Attribute 'name' in body doesn't exist.",
			});
			return;
		}
		// if(!name) { res.status(400).json({ message: "Attribute 'name' in body doesn't exist." }); return; }

		await DirectoryModel.create({});
	}
}
