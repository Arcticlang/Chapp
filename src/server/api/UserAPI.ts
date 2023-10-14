import { Request, Response } from "express";
import { Server } from "../Server";
import { Route } from "../Route";
import { UserModel } from "../../database/schemas";
import { AuthAPI } from "./auth/AuthAPI";

export class UserAPI extends Route {
	constructor(private _server: Server) {
		super("users");

		this.addSubroute(new AuthAPI(_server));
		this.initalise();
	}

	initalise() {
		this.getRouter().get("/:id", this.getUser.bind(this));
	}

	async getUser(req: Request, res: Response) {
		const id = req.params.id;
		console.log(await UserModel.exists({ _id: id }));
	}
}
