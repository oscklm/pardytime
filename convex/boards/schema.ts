import { defineTable } from "convex/server";
import { v } from "convex/values";

const boardSchema = v.object({
	title: v.string(),
	description: v.optional(v.string()),
	image_id: v.optional(v.id("_storage")),
	owner_id: v.id("users"),
	category_order: v.optional(v.array(v.id("categories"))),
});

const questionSchema = v.object({
	board_id: v.id("boards"),
	category_id: v.id("categories"),
	text: v.string(),
	answer: v.string(),
	order: v.optional(v.number()),
	value: v.optional(v.number()),
});

const categorySchema = v.object({
	board_id: v.id("boards"),
	title: v.string(),
	description: v.optional(v.string()),
	question_order: v.optional(v.array(v.id("questions"))),
});

const tagSchema = v.object({
	name: v.string(),
	color: v.optional(v.string()),
	description: v.optional(v.string()),
});

const boardTagSchema = v.object({
	board_id: v.id("boards"),
	tag_id: v.id("tags"),
});

const boardTables = {
	boards: defineTable(boardSchema),
	categories: defineTable(categorySchema),
	questions: defineTable(questionSchema),
	tags: defineTable(tagSchema).index("by_name", ["name"]),
	boardTags: defineTable(boardTagSchema)
		.index("by_board", ["board_id"])
		.index("by_tag", ["tag_id"]),
};

export { boardSchema, questionSchema, categorySchema, tagSchema, boardTables };
