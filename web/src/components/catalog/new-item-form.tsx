import { client } from "./client";

export const NewCatalogItemForm = () => {
	return (
		<div class="grid gap-8">
			<div>
				<h2 class="text-3xl">New Item Form</h2>
			</div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					const fd = new FormData(e.currentTarget);

					const name = fd.get("name");

					if (typeof name !== "string") {
						return;
					}

					e.currentTarget.reset();

					await client.addItem({ name });
				}}
			>
				<div class="grid gap-4">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text">What is item name?</span>
						</div>
						<input
							type="text"
							name="name"
							placeholder="Type here"
							className="input input-bordered w-full"
							required
						/>
					</label>

					<div>
						<button class="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
};
