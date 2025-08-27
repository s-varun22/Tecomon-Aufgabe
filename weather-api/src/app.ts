import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { AppError } from "./lib";
import { errorHandler } from "./middleware/error.middleware";
import { healthRoute, widgetRoutes } from "./routes";
import { setupSwaggerDocs } from "./swagger";

const app: Application = express();

app.use(cors());
app.use(express.json());

// swagger
setupSwaggerDocs(app);

// routes
app.use("/widgets", widgetRoutes);
app.use("/health", healthRoute);

// error for all other routes
app.use((_req: Request, _res: Response, next: NextFunction) => {
	next(new AppError("Not Allowed", 405));
});

// generic error handler
app.use(errorHandler);

export default app;
