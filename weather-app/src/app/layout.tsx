import { Footer, Header } from "@/components";
import { ToastProvider } from "@/components/providers/ToastProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Weather",
	description: "Weather Widget Dashboard App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<div className="flex flex-col dark:bg-gray-900">
					{/* Full-screen blurred background */}
					<div className="fixed inset-0 z-0 bg-zinc-300 dark:bg-[#1a1a2e] blur-[180px]"></div>
					<ToastProvider />
					<div className="z-10 flex flex-col">
						<Header />
						<div className="flex-grow pb-20">{children}</div>
						<Footer />
					</div>
				</div>
			</body>
		</html>
	);
}
