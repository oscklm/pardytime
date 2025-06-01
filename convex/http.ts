import { httpRouter } from "convex/server";
import { betterAuthComponent, createAuth } from "./auth";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, createAuth);

export default http;
// app.get("/images/:storageId", async (c) => {
// 	const storageId = c.req.param("storageId") as Id<"_storage">;

// 	const blob = await c.env.storage.get(storageId);
// 	if (blob === null) {
// 		return c.json({ error: "Image not found" }, 404);
// 	}

// 	return new Response(blob);
// });
