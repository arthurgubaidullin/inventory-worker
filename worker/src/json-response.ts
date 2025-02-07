export function JSONResponse(body?: BodyInit | null, init?: ResponseInit) {
	return new Response(body, {
		...init,
		headers: {
			...init?.headers,
			"Content-Type": "application/json",
		},
	});
}
