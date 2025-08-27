import "dotenv/config";
import { memoryCache } from "../src/lib/memory-cache";
import app from "./app";
import { connectDB } from "./lib";

const PORT = Number(process.env.PORT || 5000);

// memoryCache.clear();
// console.log("Cache cleared");

(async () => {
	await connectDB();
	app.listen(PORT, () => {
		console.log(`Backend listening on http://localhost:${PORT}`);
	});
})();
