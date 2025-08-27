import mongoose from "mongoose";
import { AppError } from "../lib";
import Widget from "../models/widget.model";
import { Location } from "../types";
import { fetchCurrentWeather } from "./weather.service";

function validateLocationDetails(location: Location) {
	if (
		typeof location.city !== "string" ||
		typeof location.state !== "string" ||
		typeof location.country !== "string" ||
		typeof location.latitude !== "number" ||
		typeof location.longitude !== "number"
	) {
		throw new AppError("Invalid Location Details", 400);
	}
}

export async function getAllWidgets() {
	const widgets = await Widget.find().sort({ createdAt: -1 });

	await Promise.all(
		widgets.map(async (widget) => {
			try {
				const response = await fetchCurrentWeather(widget.location);
				if (response.cached) return;
				widget.location = response.location;
				widget.weather = response.weather;
				await widget.save();
			} catch (err) {
				// Logging errors for individual widgets
				console.log(`Failed for: ${widget.location.city}`);
			}
		})
	);

	return widgets;
}

export async function createWidget(location: Location) {
	validateLocationDetails(location);

	// Check if widget already exists for this location
	const exists = await Widget.findOne({
		"location.latitude": location.latitude,
		"location.longitude": location.longitude,
	});
	if (exists) {
		throw new AppError("Widget already exists for this location", 400);
	}

	// Fetch weather for valid location
	const response = await fetchCurrentWeather(location);
	return Widget.create(response);
}

export async function deleteWidget(id: string) {
	if (!mongoose.isValidObjectId(id)) {
		throw new AppError("Invalid widget id", 400);
	}
	const deleted = await Widget.findByIdAndDelete(id);
	if (!deleted) throw new AppError("Widget not found", 404);
	return {
		message: "Widget deleted successfully",
	};
}
