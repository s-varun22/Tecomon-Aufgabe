import mongoose from "mongoose";
import { Widget } from "../interfaces";

const widgetSchema = new mongoose.Schema(
	{
		// Location details
		location: {
			city: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
			latitude: { type: Number, required: true },
			longitude: { type: Number, required: true },
		},
		// Weather data
		weather: {
			currentTemperature: { type: Number, required: true }, // Current temperature value
			unit: { type: String, required: true }, // Temperature unit (e.g., Celsius)
			isDay: { type: Boolean, required: true }, // Boolean indicating if it is daytime
			forecast: {
				maximum: { type: Map, of: Number }, // Map of maximum forecast temperatures
				minimum: { type: Map, of: Number }, // Map of minimum forecast temperatures
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (_doc: any, ret: any) => {
				ret.id = ret._id.toString();
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

// Expose 'id' as a virtual field that returns the string representation of _id
widgetSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

const widget = mongoose.model<Widget & mongoose.Document>(
	"Widget",
	widgetSchema
);

export default widget;
