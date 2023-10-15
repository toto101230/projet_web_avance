import {ipAPI} from "../config";

export async function fetchPost(ip, data) {
	const response = await fetch(ipAPI + ip, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	return response;
}