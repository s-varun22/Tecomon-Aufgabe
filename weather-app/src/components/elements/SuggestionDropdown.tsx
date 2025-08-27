"use client";

import { useLocation } from "@/hooks/useLocation";
import { OpenMeteoResponse } from "@/types/locations.types";
import { useCallback, useEffect, useRef, useState } from "react";

type SuggestionProps = {
	query: string;
	onSelect: (geoLocation: OpenMeteoResponse) => void;
};

export const SuggestionDropdown = ({ query, onSelect }: SuggestionProps) => {
	const { data: suggestions } = useLocation(query);
	const [isVisible, setIsVisible] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isQueryChanged, setIsQueryChanged] = useState(false);
	const listRef = useRef<HTMLUListElement | null>(null);

	const trimmedQuery = query.trim();

	const hasSuggestions = suggestions.length > 0;

	const handleSelect = useCallback(
		(location: OpenMeteoResponse) => {
			onSelect(location);
			setIsVisible(false);
			setIsQueryChanged(true);
		},
		[onSelect]
	);

	useEffect(() => {
		if (trimmedQuery.length < 3) {
			setIsQueryChanged(false);
		}

		const showResults = trimmedQuery.length >= 3 && !isQueryChanged;
		setIsVisible(showResults);

		if (showResults && suggestions.length > 0) {
			setActiveIndex(0);
		}
	}, [trimmedQuery, isQueryChanged, suggestions]);

	useEffect(() => {
		if (!isVisible) return;

		const handleMouseDown = (e: MouseEvent) => {
			if (listRef.current && !listRef.current.contains(e.target as Node)) {
				setIsVisible(false);
			}
		};
		const handleFocusIn = (e: FocusEvent) => {
			if (listRef.current && !listRef.current.contains(e.target as Node)) {
				setIsVisible(false);
			}
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isVisible || suggestions.length === 0) return;
			switch (e.key) {
				case "Escape":
					setIsVisible(false);
					break;
				case "ArrowDown":
					e.preventDefault();
					setActiveIndex((idx) => (idx + 1) % suggestions.length);
					break;
				case "ArrowUp":
					e.preventDefault();
					setActiveIndex(
						(idx) => (idx - 1 + suggestions.length) % suggestions.length
					);
					break;
				case "Enter":
					e.preventDefault();
					const location = suggestions[activeIndex];
					if (location) {
						handleSelect(location);
					}
					break;
			}
		};

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("focusin", handleFocusIn);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("focusin", handleFocusIn);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isVisible, suggestions, activeIndex, handleSelect]);

	if (!isVisible) return null;

	return (
		<ul
			ref={listRef}
			role="listbox"
			tabIndex={-1}
			className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700">
			{hasSuggestions &&
				suggestions.map((p, index) => {
					const label = [p.name, p.admin1, p.country]
						.filter(Boolean)
						.join(", ");
					const isActive = index === activeIndex;
					return (
						<li
							key={`${p.name}-${p.latitude}-${p.longitude}`}
							id={`option-${index}`}
							onMouseEnter={() => setActiveIndex(index)}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => handleSelect(p)}
							className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
								isActive ? "bg-gray-100 dark:bg-gray-700" : ""
							}`}>
							{label}
						</li>
					);
				})}
			{!hasSuggestions && isVisible && (
				<li className="px-4 py-2 text-gray-500 dark:text-gray-300">
					No results found
				</li>
			)}
		</ul>
	);
};
