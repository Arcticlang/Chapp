import mongoose from "mongoose";

export class Database {
	static async connect() {
		try {
			await mongoose.connect("mongodb://127.0.0.1:27017/Chapp");
			console.log("Connected to database");

			// var x = await mongoose.connection.db.listCollections().toArray();

			// x.forEach((y) => {
			// 	console.log(y["name"]);
			// });
		} catch {
			console.log("Unable to connect to database");
		}
	}
}
