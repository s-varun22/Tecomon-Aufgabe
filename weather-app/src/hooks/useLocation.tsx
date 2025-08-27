"use client";
import { OpenMeteoResponse } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GEO_API_URL =
	process.env.NEXT_PUBLIC_GEOCODING_API_URL ||
	"https://geocoding-api.open-meteo.com/v1/search";

type OpenMeteoResults = {
	results?: OpenMeteoResponse[];
};

export function useLocation(query: string) {
	// Minimum number of characters required to trigger the location search
	const minChars = 3;
	// Debounce delay in milliseconds to limit API calls while typing
	const debounceMs = 300;

	const [data, setData] = useState<OpenMeteoResponse[]>([]);

	const trimmed = query.trim();

	useEffect(() => {
		if (!trimmed || trimmed.length < minChars) {
			setData([]);
			return;
		}

		let cancelled = false;

		const timer = window.setTimeout(async () => {
			if (cancelled) return;

			try {
				const url = `${GEO_API_URL}?name=${encodeURIComponent(
					trimmed
				)}&count=10&language=en&format=json`;
				const res = await fetch(url);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json: OpenMeteoResults = await res.json();
				setData(json.results ?? []);
			} catch {
				if (cancelled) return;
				toast.error("Couldn't load suggestions");
				setData([]);
			} finally {
				if (cancelled) return;
			}
		}, debounceMs);

		// Cleanup function cancels the pending API call and debounce timer
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [trimmed, minChars, debounceMs]);

	return { data };
}
