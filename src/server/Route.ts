import { Express, Router } from "express";

export class Route {
	private _routesCovered: boolean = false;
	private _route: Router;
	private _subroutes: Route[];

	constructor(readonly id: string) {
		this._route = Router();
		this._subroutes = [];
	}

	initalise() {}

	addSubroute(route: Route) {
		this._subroutes.push(route);
	}

	getRouter() {
		const route = this._route;

		if (!this._routesCovered) {
			console.log(`Loaded: ${this.id}`);
			for (let subroute of this._subroutes) {
				console.log(`	| ${this.id}/${subroute.id}`);
				route.use(`/${subroute.id}`, subroute.getRouter());
			}
			this._routesCovered = true;
		}
		return route;
	}
}
