import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import { Gateway } from "../ws/Gateway";
import { UserAPI } from "./api/UserAPI";
import { DirectoryAPI } from "./api/DirectoryAPI";
import { Database } from "../database/Database";
import { config } from "dotenv";

export class Server {
	private _httpServer: http.Server;
	private _app: Express;

	private _userApi: UserAPI;
	private _directoryApi: DirectoryAPI;

	private _gateway: Gateway;

	constructor() {
		config();

		this._app = express();
		this._httpServer = http.createServer(this._app);

		this._userApi = new UserAPI(this);
		// this._roomApi = new RoomAPI(this);
		this._directoryApi = new DirectoryAPI(this);

		this._gateway = new Gateway();
	}

	/**
	 * Initalises useful things for the express application.
	 */
	async initalise() {
		this._app.use(morgan("dev"));
		this._app.use(express.urlencoded({ extended: false }));
		this._app.use(express.json());

		Database.connect();

		this._app.use("/users", this._userApi.getRouter());
		// this._app.use("/rooms", this._roomApi.getRouter());
		this._app.use("/directory", this._directoryApi.getRouter());

		this._userApi.initalise();
	}

	/**
	 * Initalises then starts the express server on `config.PORT`
	 */
	async start() {
		await this.initalise();

		this._gateway.start();

		this._httpServer.listen(process.env.PORT, () =>
			console.log("Server started!")
		);
	}

	/**
	 * Returns the express application
	 * @returns Express application
	 */
	getApp() {
		return this._app;
	}
}
