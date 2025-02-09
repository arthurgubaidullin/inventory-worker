export const JSONResponse = (
	body?: BodyInit | null,
	init?: ResponseInit,
): Response => {
	return new Response(body, {
		...init,
		headers: {
			...init?.headers,
			"Content-Type": "application/json",
		},
	});
};
