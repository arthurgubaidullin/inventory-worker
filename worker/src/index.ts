import * as HTTPServices from "@inventory-worker/http-services";
import * as InMemoryServices from "@inventory-worker/in-memory-services";

const app = HTTPServices.get(InMemoryServices.get());

export default app;
