import Link from "next/link";

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="fixed bottom-0 left-0 right-0 z-3 border-t bg-zinc-100 border-zinc-200 dark:bg-gray-900 dark:border-gray-800">
			<div className="mx-auto max-w-screen-xl px-4 py-2 flex flex-col md:flex-row items-center justify-between text-gray-500 dark:text-gray-300">
				<span className="text-sm text-center md:text-left">
					© {year}{" "}
					<Link href="/" className="hover:underline">
						Varun Srivastava
					</Link>
					. All rights reserved.
				</span>

				<div className="flex items-center mt-4 md:mt-0 gap-3">
					<Link
						href="https://github.com/s-varun22"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-900 dark:hover:text-white">
						<i className="bi bi-github text-lg"></i>
					</Link>
					<Link
						href="https://www.linkedin.com/in/varuns22/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-900 dark:hover:text-white">
						<i className="bi bi-linkedin text-lg"></i>
					</Link>
				</div>
			</div>
		</footer>
	);
};
