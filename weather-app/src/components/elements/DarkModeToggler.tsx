"use client";

import { useEffect, useState } from "react";

export const DarkModeToggler = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (theme) {
			setIsDark(theme === "dark");
			document.documentElement.classList.toggle("dark", theme === "dark");
		} else {
			setIsDark(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const handleToggle = () => {
		const newTheme = isDark ? "light" : "dark";
		setIsDark(!isDark);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<div className="flex md:order-2">
			<button
				onClick={handleToggle}
				type="button"
				className="p-1 text-lg font-small rounded-lg cursor-pointer">
				{isDark ? (
					<i className="bi bi-sun"></i>
				) : (
					<i className="bi bi-moon"></i>
				)}
			</button>
		</div>
	);
};
