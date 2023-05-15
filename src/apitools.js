const BaseURL = "http://localhost:3000/api";

export async function postRequest(path = "/", body = {}) {
	return fetch(BaseURL + path, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			authorization: localStorage.token,
		},
		body: JSON.stringify(body),
	}).then((resp) => resp.json());
}

export async function getRequest(path = "/", params = {}) {
	// console.log(`GET ${BaseURL + path}`);
	return fetch(BaseURL + path, {
		method: "GET",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			authorization: localStorage.token,
		},
	}).then((resp) => resp.json());
}
