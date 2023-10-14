import { Server } from "http";
import { Route } from "../Route";

export class MessageAPI extends Route {
	constructor(private _server: Server) {
		super("message");
		this.initalise();
	}
}
