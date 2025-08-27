"use client";

import { deleteWidget, listWidgets } from "@/services";
import { Widget } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WidgetCard } from "./WidgetCard";

interface WidgetListProps {
	refreshToggle?: boolean;
}

export const WidgetList = ({ refreshToggle = false }: WidgetListProps) => {
	const [widgets, setWidgets] = useState<Widget[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const data = await listWidgets();
				setWidgets(data);
			} catch {
				toast.error("Failed to load widgets");
			}
		})();
	}, [refreshToggle]);

	const handleRemove = async (index: number) => {
		const w = widgets[index];
		setWidgets((prev) => prev.filter((_, i) => i !== index));
		try {
			const response = await deleteWidget(w.id);
			toast.success(response.message);
		} catch {
			// Revert on error
			setWidgets((prev) => {
				const copy = [...prev];
				copy.splice(index, 0, w);
				return copy;
			});
		}
	};

	return (
		<div className="bg-zinc-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-6 py-5 mt-3 shadow-sm">
			<div className="mx-auto max-w-screen-xl p-2 my-5">
				<h2 className="text-xl font-semibold">Widgets</h2>

				{widgets.length === 0 ? (
					<div className="mt-6 rounded-lg border border-dashed border-gray-300 dark:border-neutral-700 p-6 text-center text-sm text-gray-600 dark:text-gray-300">
						No widgets found. Add one above to get started.
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-16">
						{widgets.map((widget, index) => (
							<WidgetCard
								key={index}
								widget={widget}
								onRemove={() => handleRemove(index)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
