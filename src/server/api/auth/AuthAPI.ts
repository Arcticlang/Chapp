import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Route } from "../../Route";
import { Server } from "../../Server";
import { Authenticator } from "../../../Authenticator";
import { UserModel } from "../../../database/schemas";

export class AuthAPI extends Route {
	constructor(private _server: Server) {
		super("auth");
		this.initalise();
	}

	initalise(): void {
		this.getRouter().post("/register", this.register.bind(this));
		this.getRouter().post("/login", this.login.bind(this));
	}

	async login(req: Request, res: Response) {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username });
		if (!user)
			return res
				.status(404)
				.json({ message: `No user with the username '${username}'` });

		const validPassword = await Authenticator.checkPassword(
			password,
			user.password
		);
		if (!validPassword)
			return res.status(400).json({ message: "Incorrect password!" });

		const token = jwt.sign(
			{ id: user._id, password: user.password },
			process.env.TOKEN_SECRET as string
		);
		res.header("Authorization", token).json({
			token,
		});
	}

	async register(req: Request, res: Response) {
		const { username, password } = req.body;
		const encryptedPassword = await Authenticator.genHash(password);

		if ((await UserModel.exists({ username })) != null) {
			res.status(409).json({
				message: `User with username '${username}' already exists!`,
			});
			return;
		}

		const user = new UserModel({
			username,
			password: encryptedPassword,
			created_at: Date.now(),
		});

		await user.save();

		res.status(200).json({
			message: "User created successfully!",
		});
	}
}
