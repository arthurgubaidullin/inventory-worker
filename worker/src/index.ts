import { getInMemoryCatalogService } from "@inventory-worker/in-memory-catalog-database-service";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const db = getInMemoryCatalogService();

		if (request.method === "POST") {
			const id = "test";
			await db.addItem({ id, name: "test" });

			return new Response(JSON.stringify({ id }));
		} else {
			const items = await db.getItems();

			return new Response(JSON.stringify(items));
		}
	},
} satisfies ExportedHandler<Env>;
