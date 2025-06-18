import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
	BoardReaderController,
	BoardWriterController,
} from "./model/boards/controllers";
import { boardSchema } from "./model/boards/schema";

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		const boardController = new BoardReaderController(ctx.db);
		const boards = await boardController.query().collect();
		return boards;
	},
});

export const getAllEnriched = query({
	args: {},
	handler: async (ctx) => {
		const boardController = new BoardReaderController(ctx.db);
		const boards = await boardController.query().collect();
		return (
			await Promise.all(
				boards.map((board) => boardController.getEnriched(board._id)),
			)
		).filter((board): board is NonNullable<typeof board> => board !== null);
	},
});

export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, { id }) => {
		const boardController = new BoardReaderController(ctx.db);

		const normalizedId = ctx.db.normalizeId("boards", id);
		if (!normalizedId) {
			throw new Error(`Invalid board ID: ${id}`);
		}

		return boardController.get(normalizedId);
	},
});

export const getEnrichedById = query({
	args: { id: v.string() },
	handler: async (ctx, { id }) => {
		const boardController = new BoardReaderController(ctx.db);
		const normalizedId = ctx.db.normalizeId("boards", id);
		if (!normalizedId) {
			throw new Error(`Invalid board ID: ${id}`);
		}
		return boardController.getEnriched(normalizedId);
	},
});

export const createBoard = mutation({
	args: {
		board: boardSchema,
	},
	returns: v.id("boards"),
	handler: async (ctx, { board }) => {
		const boardController = new BoardWriterController(ctx.db);
		const newBoardId = await boardController.insert(board);
		return newBoardId;
	},
});

export const updateBoard = mutation({
	args: {
		id: v.id("boards"),
		board: boardSchema,
	},
	handler: async (ctx, { id, board }) => {
		const updatedBoard = await ctx.db.patch(id, board);
		return updatedBoard;
	},
});

export const seedDummyBoards = mutation({
	args: {},
	handler: async (ctx) => {
		ctx.db;
		const ownerId = await ctx.db
			.query("users")
			.first()
			.then((user) => user?._id);

		if (!ownerId) {
			throw new Error("No owner found");
		}

		const boards = [
			{
				title: "Classic Jeopardy",
				description: "A classic board with general trivia.",
				imageId: null,
				ownerId,
				categories: [
					{
						title: "Science",
						questions: [
							{
								text: "What planet is known as the Red Planet?",
								answer: "Mars",
								value: 100,
							},
							{
								text: "What gas do plants breathe in?",
								answer: "Carbon Dioxide",
								value: 200,
							},
							{ text: "What is H2O?", answer: "Water", value: 300 },
							{
								text: "What force keeps us on the ground?",
								answer: "Gravity",
								value: 400,
							},
							{ text: "What organ pumps blood?", answer: "Heart", value: 500 },
						],
					},
					{
						title: "History",
						questions: [
							{
								text: "Who was the first President of the USA?",
								answer: "George Washington",
								value: 100,
							},
							{ text: "In what year did WW2 end?", answer: "1945", value: 200 },
							{
								text: "What wall fell in 1989?",
								answer: "Berlin Wall",
								value: 300,
							},
							{
								text: "Who discovered America?",
								answer: "Christopher Columbus",
								value: 400,
							},
							{
								text: "What ship sank in 1912?",
								answer: "Titanic",
								value: 500,
							},
						],
					},
					{
						title: "Pop Culture",
						questions: [
							{
								text: "Who sang 'Thriller'?",
								answer: "Michael Jackson",
								value: 100,
							},
							{
								text: "What movie features a ring?",
								answer: "Lord of the Rings",
								value: 200,
							},
							{
								text: "Who is Harry Potter's enemy?",
								answer: "Voldemort",
								value: 300,
							},
							{ text: "What is Pikachu?", answer: "A Pokémon", value: 400 },
							{ text: "Who is Iron Man?", answer: "Tony Stark", value: 500 },
						],
					},
				],
			},
			{
				title: "Tech & Gadgets",
				description: "Questions about technology and gadgets.",
				imageId: null,
				ownerId,
				categories: [
					{
						title: "Programming",
						questions: [
							{
								text: "What does HTML stand for?",
								answer: "HyperText Markup Language",
								value: 100,
							},
							{
								text: "What is JS short for?",
								answer: "JavaScript",
								value: 200,
							},
							{
								text: "What is the Python logo?",
								answer: "Two snakes",
								value: 300,
							},
							{
								text: "What is Git used for?",
								answer: "Version control",
								value: 400,
							},
							{
								text: "What company makes the iPhone?",
								answer: "Apple",
								value: 500,
							},
						],
					},
					{
						title: "Gadgets",
						questions: [
							{ text: "What is a GoPro?", answer: "Action camera", value: 100 },
							{
								text: "What is Kindle for?",
								answer: "Reading e-books",
								value: 200,
							},
							{
								text: "What is the Nintendo Switch?",
								answer: "Game console",
								value: 300,
							},
							{ text: "What is Alexa?", answer: "Voice assistant", value: 400 },
							{
								text: "What is Fitbit?",
								answer: "Fitness tracker",
								value: 500,
							},
						],
					},
					{
						title: "Startups",
						questions: [
							{
								text: "What is YC short for?",
								answer: "Y Combinator",
								value: 100,
							},
							{
								text: "Who founded Facebook?",
								answer: "Mark Zuckerberg",
								value: 200,
							},
							{
								text: "What is a unicorn?",
								answer: "Startup valued at $1B+",
								value: 300,
							},
							{
								text: "What is SaaS?",
								answer: "Software as a Service",
								value: 400,
							},
						],
					},
				],
			},
			{
				title: "Travel Trivia",
				description: "Test your knowledge of the world!",
				imageId: null,
				ownerId,
				categories: [
					{
						title: "Capitals",
						questions: [
							{ text: "Capital of France?", answer: "Paris", value: 100 },
							{ text: "Capital of Japan?", answer: "Tokyo", value: 200 },
							{ text: "Capital of Australia?", answer: "Canberra", value: 300 },
							{ text: "Capital of Canada?", answer: "Ottawa", value: 400 },
							{ text: "Capital of Brazil?", answer: "Brasilia", value: 500 },
						],
					},
					{
						title: "Landmarks",
						questions: [
							{
								text: "Where is the Eiffel Tower?",
								answer: "Paris",
								value: 100,
							},
							{ text: "Where is the Colosseum?", answer: "Rome", value: 200 },
							{ text: "Where is Machu Picchu?", answer: "Peru", value: 300 },
							{ text: "Where is the Taj Mahal?", answer: "India", value: 400 },
							{ text: "Where is the Great Wall?", answer: "China", value: 500 },
						],
					},
					{
						title: "Currencies",
						questions: [
							{ text: "Currency of USA?", answer: "Dollar", value: 100 },
							{ text: "Currency of UK?", answer: "Pound", value: 200 },
							{ text: "Currency of Japan?", answer: "Yen", value: 300 },
							{ text: "Currency of India?", answer: "Rupee", value: 400 },
						],
					},
				],
			},
			{
				title: "Food & Drink",
				description: "Yummy trivia about food and drinks.",
				imageId: null,
				ownerId,
				categories: [
					{
						title: "Fruits",
						questions: [
							{
								text: "What fruit is yellow and curved?",
								answer: "Banana",
								value: 100,
							},
							{
								text: "What fruit has seeds on the outside?",
								answer: "Strawberry",
								value: 200,
							},
							{
								text: "What fruit is green inside and brown outside?",
								answer: "Kiwi",
								value: 300,
							},
							{
								text: "What fruit is red and often used in pies?",
								answer: "Apple",
								value: 400,
							},
							{
								text: "What fruit is purple and used for wine?",
								answer: "Grape",
								value: 500,
							},
						],
					},
					{
						title: "Drinks",
						questions: [
							{
								text: "What drink wakes you up in the morning?",
								answer: "Coffee",
								value: 100,
							},
							{ text: "What is made from grapes?", answer: "Wine", value: 200 },
							{
								text: "What is a popular drink in England?",
								answer: "Tea",
								value: 300,
							},
							{
								text: "What is a cold drink with bubbles?",
								answer: "Soda",
								value: 400,
							},
						],
					},
					{
						title: "Dishes",
						questions: [
							{ text: "What is sushi from?", answer: "Japan", value: 100 },
							{ text: "What is pizza from?", answer: "Italy", value: 200 },
							{ text: "What is paella from?", answer: "Spain", value: 300 },
							{ text: "What is poutine from?", answer: "Canada", value: 400 },
							{ text: "What is curry from?", answer: "India", value: 500 },
						],
					},
				],
			},
			{
				title: "Sports & Games",
				description: "Trivia for sports and games fans.",
				imageId: null,
				ownerId,
				categories: [
					{
						title: "Olympics",
						questions: [
							{
								text: "Where were the 2016 Olympics?",
								answer: "Rio de Janeiro",
								value: 100,
							},
							{
								text: "What is the Olympic symbol?",
								answer: "Five rings",
								value: 200,
							},
							{
								text: "What sport is Usain Bolt famous for?",
								answer: "Sprinting",
								value: 300,
							},
							{
								text: "What is the Winter Olympics?",
								answer: "Snow sports",
								value: 400,
							},
							{
								text: "What is the Olympic flame?",
								answer: "A torch",
								value: 500,
							},
						],
					},
					{
						title: "Board Games",
						questions: [
							{
								text: "What game uses hotels and money?",
								answer: "Monopoly",
								value: 100,
							},
							{
								text: "What game has kings and queens?",
								answer: "Chess",
								value: 200,
							},
							{
								text: "What game uses tiles and words?",
								answer: "Scrabble",
								value: 300,
							},
							{
								text: "What game has ladders and snakes?",
								answer: "Snakes and Ladders",
								value: 400,
							},
							{
								text: "What game uses a ball and pins?",
								answer: "Bowling",
								value: 500,
							},
						],
					},
					{
						title: "Video Games",
						questions: [
							{ text: "Who is Mario's brother?", answer: "Luigi", value: 100 },
							{
								text: "What is the princess in Mario?",
								answer: "Peach",
								value: 200,
							},
							{
								text: "What is the main character in Zelda?",
								answer: "Link",
								value: 300,
							},
							{
								text: "What is the block game?",
								answer: "Minecraft",
								value: 400,
							},
						],
					},
				],
			},
		];

		for (const board of boards) {
			const boardId = await ctx.db.insert("boards", {
				title: board.title,
				description: board.description,
				imageId: board.imageId,
				ownerId: board.ownerId,
			});
			const categoryIds = [];
			for (const category of board.categories) {
				const categoryId = await ctx.db.insert("categories", {
					boardId,
					title: category.title,
				});
				const questionIds = [];
				let order = 0;
				for (const question of category.questions) {
					const questionId = await ctx.db.insert("questions", {
						boardId,
						categoryId,
						text: question.text,
						answer: question.answer,
						value: question.value,
						order: order++,
					});
					questionIds.push(questionId);
				}
				await ctx.db.patch(categoryId, { questionOrder: questionIds });
				categoryIds.push(categoryId);
			}
			await ctx.db.patch(boardId, { category_order: categoryIds });
		}
		return "Seeded 5 jeopardy boards!";
	},
});
