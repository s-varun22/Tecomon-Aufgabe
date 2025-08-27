import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
	href?: string;
	children: ReactNode;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
}

const baseClasses =
	"inline-flex items-center whitespace-nowrap py-2.5 px-5 me-2 mb-2 rounded-xl text-sm font-medium border transition focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
const lightClasses =
	"text-white bg-black hover:text-gray-950 disabled:hover:bg-gray-900 disabled:hover:text-gray-100 border-gray-500 hover:bg-gray-100";
const darkClasses =
	"dark:text-black dark:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:focus:ring-white";

export const Button = ({
	href,
	children,
	type = "button",
	className,
	disabled,
	onClick,
}: ButtonProps) => {
	const classes =
		`${baseClasses} ${lightClasses} ${darkClasses} ${className}`.trim();

	if (href) {
		// Link-style button
		return (
			<Link href={href} className={classes} onClick={onClick}>
				{children}
			</Link>
		);
	}

	// Native button (e.g., submit)
	return (
		<button
			type={type}
			disabled={disabled}
			className={classes}
			onClick={onClick}>
			{children}
		</button>
	);
};
