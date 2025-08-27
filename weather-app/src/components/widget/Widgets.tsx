"use client";

import { useState } from "react";
import { WidgetForm } from "./WidgetForm";
import { WidgetList } from "./WidgetList";

export const Widgets = () => {
	const [refreshToggle, setRefreshToggle] = useState(false);

	return (
		<>
			<div className="mt-8">
				<WidgetForm onAdded={() => setRefreshToggle((t) => !t)} />
			</div>

			<div className="mt-8">
				<WidgetList refreshToggle={refreshToggle} />
			</div>
		</>
	);
};
