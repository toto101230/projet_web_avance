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

export function createStorageUser(user) {
	const item = {
		nom: user.nom,
		token: user.token,
		expires: Date.now() + 86400000 // 24h
	}
	localStorage.setItem("user", JSON.stringify(item));
}