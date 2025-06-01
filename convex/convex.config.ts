import betterAuth from "@erquhart/convex-better-auth/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(betterAuth);

export default app;
