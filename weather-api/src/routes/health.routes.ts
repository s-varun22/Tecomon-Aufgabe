import { Request, Response, Router } from "express";

export const healthRoute = Router();

healthRoute.get("/", (_req: Request, res: Response) =>
	res.json({ service: "Running" })
);
