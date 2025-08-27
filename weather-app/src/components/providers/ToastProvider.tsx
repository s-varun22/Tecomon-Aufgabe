"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop
			closeButton={true}
			closeOnClick
			draggable
			pauseOnHover
		/>
	);
};
