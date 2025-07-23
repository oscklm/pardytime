import { v } from "convex/values";
import { partial } from "convex-helpers/validators";
import invariant from "tiny-invariant";
import { internalMutation, mutation } from "../utils/functions";
import { gameSchema } from "./schema";

function generateGameCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const create = mutation({
  args: {
    userId: v.id("users"),
    boardId: v.optional(v.id("boards")),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const boardId = args.boardId ?? (await ctx.db.query("boards").first())?._id;

    invariant(boardId, "Could not compute boardId");

    let code: string | undefined;
    let isUnique = false;
    while (!isUnique) {
      const generatedCode = generateGameCode();
      const existingGame = await ctx.db
        .query("games")
        .withIndex("by_code", (q) => q.eq("code", generatedCode))
        .first();
      if (!existingGame) {
        code = generatedCode;
        isUnique = true;
      }
    }

    invariant(code, "Could not generate unique game code");

    await ctx.db.insert("games", {
      boardId,
      ownerId: args.userId,
      status: "pending",
      activeQuestionId: null,
      answeredQuestions: [],
      code,
      name: args.name,
    });

    return code;
  },
});

export const deleteGame = mutation({
  args: {
    gameId: v.id("games"),
  },
  handler: async (ctx, args) => {
    return ctx.db.delete(args.gameId);
  },
});

export const updateGame = mutation({
  args: {
    gameId: v.id("games"),
    values: v.object(partial(gameSchema.fields)),
  },
  handler: async (ctx, args) => {
    return ctx.db.patch(args.gameId, args.values);
  },
});

export const resetGame = mutation({
  args: {
    gameId: v.id("games"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.gameId, {
      status: "active",
      activeQuestionId: null,
      answeredQuestions: [],
    });

    // Reset all team scores to 0
    const teams = await ctx.db
      .query("teams")
      .withIndex("by_gameId", (q) => q.eq("gameId", args.gameId))
      .collect();

    await Promise.all(
      teams.map((team) => ctx.db.patch(team._id, { score: 0 }))
    );
  },
});

export const addAnsweredQuestion = mutation({
  args: {
    gameId: v.id("games"),
    questionId: v.id("questions"),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);

    invariant(game, "Game not found");

    if (game.answeredQuestions.includes(args.questionId)) {
      throw new Error("Question already answered");
    }

    return ctx.db.patch(args.gameId, {
      answeredQuestions: [...game.answeredQuestions, args.questionId],
    });
  },
});

export const deleteOldGames = internalMutation({
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago

    const oldGames = await ctx.db
      .query("games")
      .withIndex("by_creation_time", (q) =>
        q.lt("_creationTime", twentyFourHoursAgo)
      )
      .collect();

    for (const game of oldGames) {
      const teams = await ctx.db
        .query("teams")
        .withIndex("by_gameId", (q) => q.eq("gameId", game._id))
        .collect();

      await Promise.all(
        teams.map((team) => ctx.db.patch(team._id, { gameId: null }))
      );

      await ctx.db.delete(game._id);
    }
  },
});
