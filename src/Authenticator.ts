import bcrypt from "bcrypt";

export class Authenticator {
	static async genHash(password: string): Promise<string> {
		const promise = new Promise<string>((resolve, reject) => {
			bcrypt.hash(password, 8, (err, hash: string) => {
				resolve(hash);
			});
		});

		return promise;
	}

	static async checkPassword(password: string, hash: string) {
		const promise = new Promise<boolean>((resolve, reject) => {
			bcrypt.compare(password, hash, (err, same) => {
				resolve(same);
			});
		});

		return promise;
	}
}
