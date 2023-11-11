const BaseURL = "http://localhost:3000/api";

export async function postRequest(path = "/", body = {}) {
	return apiRequest("POST", path, body);
}

export async function getRequest(path = "/", params = {}) {
	return apiRequest("GET", path);
}

export async function apiRequest(method = "GET", path = "/", body) {
	return fetch(BaseURL + path, {
		method: method,
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			authorization: localStorage.token,
		},
		body: JSON.stringify(body),
	}).then((resp) => resp.json());
}

export async function signin(login, password) {
	return fetch(BaseURL + "/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({ login, password }),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", login);
		});
}

export function signout() {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
}

export function signup(login, password) {
	return fetch(BaseURL + "/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({ login, password }),
	}).then((response) => response.json());
}
