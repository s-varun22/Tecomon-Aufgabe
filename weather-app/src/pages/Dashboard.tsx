import { Widgets } from "@/components/widget/Widgets";

export default function Dashboard() {
	return (
		<section className="px-4 py-16 md:px-20 max-w-6xl mx-auto text-gray-800 dark:text-gray-100">
			<div className="w-full">
				<h1 className="text-4xl font-extrabold mb-2 text-zinc-700 dark:text-zinc-100">
					Widget Dashboard
				</h1>
				<h2 className="text-sm text-indigo-600 dark:text-indigo-500 mb-2">
					Find realtime weather data for any location worldwide
				</h2>
				<p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
					Powered by{" "}
					<a
						href="https://open-meteo.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-indigo-600">
						Open-Meteo API
					</a>
				</p>
			</div>

			<Widgets />
		</section>
	);
}
