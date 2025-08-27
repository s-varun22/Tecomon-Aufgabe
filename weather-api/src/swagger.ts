import { Application } from "express";
import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";
import swaggerUi from "swagger-ui-express";

export function setupSwaggerDocs(app: Application) {
	const yamlPath = path.join(process.cwd(), "src", "docs", "openapi.yaml");
	const file = fs.readFileSync(yamlPath, "utf8");
	const spec = yaml.load(file) as object;

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
	app.get("/docs.json", (_req, res) => res.json(spec));
}
