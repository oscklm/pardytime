import { defineTable } from 'convex/server';
import { v } from 'convex/values';

const boardSchema = v.object({
  title: v.string(),
  description: v.optional(v.string()),
  imageId: v.optional(v.id('_storage')),
  ownerId: v.id('users'),
  categoryOrder: v.optional(v.array(v.id('categories'))),
});

const questionSchema = v.object({
  boardId: v.id('boards'),
  categoryId: v.id('categories'),
  text: v.string(),
  answer: v.string(),
  order: v.optional(v.number()),
  value: v.optional(v.number()),
});

const categorySchema = v.object({
  boardId: v.id('boards'),
  title: v.string(),
  description: v.optional(v.string()),
  questionOrder: v.optional(v.array(v.id('questions'))),
});

const tagSchema = v.object({
  name: v.string(),
  color: v.optional(v.string()),
  description: v.optional(v.string()),
});

const boardTagSchema = v.object({
  boardId: v.id('boards'),
  tagId: v.id('tags'),
});

const boardTables = {
  boards: defineTable(boardSchema),
  categories: defineTable(categorySchema),
  questions: defineTable(questionSchema),
  tags: defineTable(tagSchema).index('by_name', ['name']),
  boardTags: defineTable(boardTagSchema).index('by_board', ['boardId']).index('by_tag', ['tagId']),
};

export { boardSchema, questionSchema, categorySchema, tagSchema, boardTables };
