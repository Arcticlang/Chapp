import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token = req.header("Authorization");
	if (!token)
		return res.status(401).json({
			message: "No Authorization token.",
		});

	try {
		jwt.verify(token, process.env.TOKEN_SECRET as string);
		next();
	} catch {
		res.status(400).json({
			message: "Invalid token",
		});
	}
}
