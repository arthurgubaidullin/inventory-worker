import { useEffect } from "preact/hooks";
import { client } from "./client";

export const CatalogItemList = () => {
	useEffect(() => {
		client.fetch();
	}, []);
	return (
		<div class="grid gap-8">
			<div>
				<h2 class="text-3xl">Items</h2>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{client.items().value.map((item, index) => (
							<tr key={item.id}>
								<th>{index + 1}</th>
								<td>{item.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
