import { HttpError } from "@/error/HttpError";
import { Location } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const WIDGETS_URL = API_BASE.replace(/\/+$/g, "");

const handleResponse = async (res: Response) => {
	if (!res.ok) {
		let message = res.statusText;
		try {
			const body = await res.json();
			if (body) message = body.message || body.error || message;
		} catch {
			// ignore JSON parse errors
		}
		throw new HttpError(message, res.status);
	}
	return await res.json();
};

/** Create widget */
export const createWidget = async (location: Location) => {
	const res = await fetch(WIDGETS_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(location),
	});
	return handleResponse(res);
};

/** List widgets */
export const listWidgets = async () => {
	const res = await fetch(WIDGETS_URL, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	return handleResponse(res);
};

/** Delete widget by id */
export const deleteWidget = async (id: string) => {
	const res = await fetch(`${WIDGETS_URL}/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	return handleResponse(res);
};
