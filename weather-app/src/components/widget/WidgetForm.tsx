"use client";

import { Button, SuggestionDropdown } from "@/components";
import { HttpError } from "@/error/HttpError";
import { createWidget } from "@/services";
import { Location, OpenMeteoResponse } from "@/types";
import {
	ChangeEvent,
	useCallback,
	useRef,
	useState,
	type FormEvent,
} from "react";
import { toast } from "react-toastify";

interface WidgetFormProps {
	onAdded?: () => void;
}

export const WidgetForm = ({ onAdded }: WidgetFormProps) => {
	const [query, setQuery] = useState("");
	const [location, setLocation] = useState<Location | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleSelect = useCallback((p: OpenMeteoResponse) => {
		const label = [p.name, p.admin1, p.country].filter(Boolean).join(", ");
		setQuery(label);
		setLocation({
			city: p.name,
			state: p.admin1 ?? "",
			country: p.country ?? "",
			latitude: p.latitude,
			longitude: p.longitude,
		});
	}, []);

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (!location) return;

			const addWidget = async () => {
				try {
					const response = await createWidget(location);
					toast.success(`Widget added for ${response.location.city}`);
					setQuery("");
					setLocation(null);
					onAdded?.();
				} catch (err: unknown) {
					const message =
						err instanceof HttpError
							? `Error: ${err.message}`
							: "Error Occured during Widget Creation";
					toast.error(message);
				}
			};
			addWidget();
		},
		[location, onAdded]
	);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setLocation(null);
	}, []);

	return (
		<div className="bg-zinc-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-6 py-5 mt-3 shadow-sm">
			<div className="mx-auto max-w-screen-xl p-2 my-5">
				<form
					className="flex items-center gap-3 w-full"
					onSubmit={handleSubmit}>
					<div className="relative w-full">
						<span className="bi bi-search flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></span>
						<input
							name="search"
							type="text"
							id="simple-search"
							ref={inputRef}
							className="bg-gray-50 dark:bg-gray-700 border dark:border-0 border-gray-300 text-black dark:text-white text-sm rounded-lg block w-full pl-10 pr-4 py-2.5 dark:placeholder-gray-400"
							placeholder="Search (type at least 3 characters)"
							autoComplete="off"
							value={query}
							onChange={onChange}
						/>
						<SuggestionDropdown query={query} onSelect={handleSelect} />
					</div>

					<Button type="submit" disabled={!location}>
						Add Widget
					</Button>
				</form>
			</div>
		</div>
	);
};
