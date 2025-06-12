import { v } from "convex/values";

export const imageIdValidator = v.union(v.id("_storage"), v.null());
