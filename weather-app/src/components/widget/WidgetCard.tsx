import { Widget } from "@/types";
import { useState } from "react";

export type WidgetCardProps = {
	widget: Widget;
	onRemove?: () => void;
};

export const WidgetCard = ({ widget, onRemove }: WidgetCardProps) => {
	const [hover, setHover] = useState(false);

	const now = new Date();
	const currentDate = `${now.getFullYear()}-${String(
		now.getMonth() + 1
	).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
	const temp = widget.weather.currentTemperature;
	const unit = widget.weather.unit || "°C";
	const isDay = widget.weather.isDay;
	const forecastMax = widget.weather.forecast.maximum;
	const forecastMin = widget.weather.forecast.minimum;
	const high = forecastMax?.[currentDate];
	const low = forecastMin?.[currentDate];
	const forecastDates = Object.keys({
		...(forecastMax || {}),
		...(forecastMin || {}),
	}).sort();

	return (
		<div
			className={`relative rounded-3xl p-6 md:p-8 mt-4 shadow-xl bg-white text-zinc-900 dark:bg-gradient-to-b dark:from-[#0b1020] dark:to-[#1b2238] dark:text-white transition-transform ${
				hover ? "-translate-y-1" : ""
			}`}>
			{onRemove && (
				<button
					type="button"
					onClick={onRemove}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					className="group absolute top-3 right-3 inline-flex items-center justify-center p-2 text-red-700 hover:text-red-500 cursor-pointer">
					<i className="bi bi-dash-circle"></i>
					<span className="absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white bg-red-600 px-1 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity z-10">
						Remove
					</span>
				</button>
			)}
			<div className="flex items-center justify-between">
				<div className="flex flex-col">
					<h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-zinc-900 dark:text-white">
						{widget.location.city}
						<i className="bi bi-geo-alt-fill text-sm opacity-80"></i>
					</h2>
					<p className="text-5xl leading-none font-semibold mt-2 text-zinc-900 dark:text-white">{`${temp}${unit}`}</p>
				</div>
				<div className="flex flex-col items-end">
					<div className="flex flex-col items-center">
						{isDay ? (
							<i className="bi bi-sun text-2xl text-amber-400"></i>
						) : (
							<i className="bi bi-moon-stars text-2xl text-indigo-500 dark:text-indigo-300"></i>
						)}
						<p className="mt-2 text-base text-zinc-700 dark:text-zinc-200">
							H: {typeof high === "number" ? `${high}${unit}` : "—"}
							<span className="mx-1" />
							L: {typeof low === "number" ? `${low}${unit}` : "—"}
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 border-t border-gray-200 dark:border-white/10 pt-4">
				<h3 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-200">
					<i className="bi bi-calendar3 text-xs"></i>
					<span> 7-Day Forecast</span>
				</h3>
				<div className="grid grid-cols-7 gap-4 text-xs">
					{forecastDates.slice(0, 7).map((date) => {
						const isToday = date === currentDate;
						const dayLabel = isToday
							? "Today"
							: new Date(date).toDateString().split(" ")[0];
						const min = forecastMin?.[date];
						const max = forecastMax?.[date];

						return (
							<div
								key={date}
								className={`flex flex-col items-center ${
									isToday
										? "font-semibold text-blue-600 dark:text-blue-300"
										: ""
								}`}>
								<span className="mb-1 text-zinc-700 dark:text-zinc-300">
									{dayLabel}
								</span>
								<span className="text-zinc-700 dark:text-zinc-300">
									{typeof min === "number" ? `L: ${min}` : "—"}
								</span>
								<span className="text-zinc-700 dark:text-zinc-300">
									{typeof max === "number" ? `H: ${max}` : "—"}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
