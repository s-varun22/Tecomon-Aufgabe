import { Router } from "express";
import {
	addWidget,
	getWidgets,
	removeWidget,
} from "../controllers/widget.controller";

export const widgetRoutes = Router();

widgetRoutes.get("/", getWidgets);

widgetRoutes.post("/", addWidget);

widgetRoutes.delete("/:id", removeWidget);
