import { NextFunction, Request, Response } from "express";
import { Location } from "../types/location.type";
import { createWidget, deleteWidget, getAllWidgets } from "../services";

// Get all widgets
export async function getWidgets(_req: Request, res: Response) {
	const widgets = await getAllWidgets();
	res.json(widgets);
}

// Add a new widget for the given location
export async function addWidget(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const location = req.body as Location;
		const widget = await createWidget(location);
		res.status(201).json(widget);
	} catch (err) {
		next(err);
	}
}

// Removes a widget by ID
export async function removeWidget(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const result = await deleteWidget(id);
		res.json(result);
	} catch (err) {
		next(err);
	}
}
