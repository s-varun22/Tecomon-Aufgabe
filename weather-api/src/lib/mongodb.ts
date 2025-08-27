import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri)
	throw new Error("MONGODB_URI is not defined in environment variables");

export const connectDB = async () => {
	try {
		await mongoose.connect(uri);
		console.log("MongoDB Connected");
	} catch (error: any) {
		console.error("MongoDB connection error", error?.message ?? error);
		process.exit(1);
	}
};
