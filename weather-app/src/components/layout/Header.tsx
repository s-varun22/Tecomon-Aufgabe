import { DarkModeToggler } from "@/components";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-zinc-100 border-zinc-200 dark:bg-gray-900 dark:border-gray-800">
			<div className="mx-auto max-w-screen-xl px-3 sm:px-4">
				<div className="relative grid grid-cols-3 h-14 sm:h-16 items-center">
					<div className="col-start-2 flex justify-center">
						<Link
							href="/"
							className="inline-flex items-center gap-2 dark:text-white">
							<i className="bi bi-cloud-sun text-4xl sm:text-3xl"></i>
							<span className="text-4xl sm:text-3xl font-semibold">
								Weather
							</span>
						</Link>
					</div>
					<div className="col-start-3 flex justify-center dark:text-white">
						<DarkModeToggler />
					</div>
				</div>
			</div>
		</header>
	);
};
