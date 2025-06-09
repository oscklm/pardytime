import {
	type HonoWithConvex,
	HttpRouterWithHono,
} from "convex-helpers/server/hono";
import { Hono } from "hono";
import { internal } from "@/convex/_generated/api";
import type { Id } from "./_generated/dataModel";
import type { ActionCtx } from "./_generated/server";

const app: HonoWithConvex<ActionCtx> = new Hono();

app.get("/images/:storageId", async (c) => {
	const storageId = c.req.param("storageId") as Id<"_storage">;

	const blob = await c.env.storage.get(storageId);
	if (blob === null) {
		return c.json({ error: "Image not found" }, 404);
	}

	return new Response(blob);
});

app.post("/webhooks/clerk/users", async (c) => {
	// Get the body and headers to serialize for Convex
	const body = await c.req.text();
	const headers: Record<string, string> = {};

	// Extract all headers
	c.req.raw.headers.forEach((value, key) => {
		headers[key] = value;
	});

	// Call Convex action with serialized request data
	const result = await c.env.runAction(
		internal.users.actions.handleClerkWebhook,
		{
			body,
			headers,
		},
	);

	if (!result.success) {
		console.error("Webhook processing error:", result.message);
		return c.json({ error: result.message }, 400);
	}

	console.log("Webhook processed successfully:", result.message);
	return c.json({ success: true });
});

export default new HttpRouterWithHono(app);
