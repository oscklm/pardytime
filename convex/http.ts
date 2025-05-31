import { Hono } from "hono";
import {
	type HonoWithConvex,
	HttpRouterWithHono,
} from "convex-helpers/server/hono";
import type { ActionCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

const app: HonoWithConvex<ActionCtx> = new Hono();

app.get("/images/:storageId", async (c) => {
	const storageId = c.req.param("storageId") as Id<"_storage">;

	const blob = await c.env.storage.get(storageId);
	if (blob === null) {
		return c.json({ error: "Image not found" }, 404);
	}

	return new Response(blob);
});

export default new HttpRouterWithHono(app);
