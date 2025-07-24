import { mutation } from '../_generated/server';

export const seedDummyBoards = mutation({
  args: {},
  handler: async (ctx) => {
    ctx.db;
    const ownerId = await ctx.db
      .query('users')
      .first()
      .then((user) => user?._id);

    if (!ownerId) {
      throw new Error('No owner found');
    }

    const boards = [
      {
        title: 'Classic Jeopardy',
        description: 'A classic board with general trivia.',
        imageId: null,
        ownerId,
        categories: [
          {
            title: 'Science',
            questions: [
              {
                text: 'This planet is known as the Red Planet.',
                answer: 'What is Mars?',
                value: 100,
              },
              {
                text: 'Plants breathe in this gas during photosynthesis.',
                answer: 'What is carbon dioxide?',
                value: 200,
              },
              {
                text: 'The chemical formula H2O represents this substance.',
                answer: 'What is water?',
                value: 300,
              },
              {
                text: 'This force keeps us anchored to the ground.',
                answer: 'What is gravity?',
                value: 400,
              },
              {
                text: 'This organ is responsible for pumping blood throughout the body.',
                answer: 'What is the heart?',
                value: 500,
              },
            ],
          },
          {
            title: 'History',
            questions: [
              {
                text: 'He was the first President of the United States.',
                answer: 'Who is George Washington?',
                value: 100,
              },
              {
                text: 'World War II ended in this year.',
                answer: 'What is 1945?',
                value: 200,
              },
              {
                text: 'This wall, dividing a German city, fell in 1989.',
                answer: 'What is the Berlin Wall?',
                value: 300,
              },
              {
                text: 'This explorer is credited with discovering America in 1492.',
                answer: 'Who is Christopher Columbus?',
                value: 400,
              },
              {
                text: 'This famous ship sank after hitting an iceberg in 1912.',
                answer: 'What is the Titanic?',
                value: 500,
              },
            ],
          },
          {
            title: 'Pop Culture',
            questions: [
              {
                text: "This King of Pop sang 'Thriller'.",
                answer: 'Who is Michael Jackson?',
                value: 100,
              },
              {
                text: 'This epic fantasy movie trilogy features a powerful ring.',
                answer: 'What is The Lord of the Rings?',
                value: 200,
              },
              {
                text: "This dark wizard is Harry Potter's greatest enemy.",
                answer: 'Who is Voldemort?',
                value: 300,
              },
              {
                text: 'Pikachu is this type of creature in a popular franchise.',
                answer: 'What is a Pokémon?',
                value: 400,
              },
              {
                text: 'Tony Stark is the secret identity of this Marvel superhero.',
                answer: 'Who is Iron Man?',
                value: 500,
              },
            ],
          },
        ],
      },
      {
        title: 'Tech & Gadgets',
        description: 'Questions about technology and gadgets.',
        imageId: null,
        ownerId,
        categories: [
          {
            title: 'Programming',
            questions: [
              {
                text: 'HTML is an acronym for this markup language.',
                answer: 'What is HyperText Markup Language?',
                value: 100,
              },
              {
                text: 'JS is the common abbreviation for this programming language.',
                answer: 'What is JavaScript?',
                value: 200,
              },
              {
                text: 'The Python programming language logo features this number of snakes.',
                answer: 'What is two?',
                value: 300,
              },
              {
                text: 'Git is primarily used for this software development process.',
                answer: 'What is version control?',
                value: 400,
              },
              {
                text: 'This company manufactures the iPhone.',
                answer: 'What is Apple?',
                value: 500,
              },
            ],
          },
          {
            title: 'Gadgets',
            questions: [
              {
                text: 'A GoPro is this type of portable camera.',
                answer: 'What is an action camera?',
                value: 100,
              },
              {
                text: "Amazon's Kindle device is primarily designed for this activity.",
                answer: 'What is reading e-books?',
                value: 200,
              },
              {
                text: 'The Nintendo Switch is this type of entertainment device.',
                answer: 'What is a game console?',
                value: 300,
              },
              {
                text: "Amazon's Alexa is this type of AI assistant.",
                answer: 'What is a voice assistant?',
                value: 400,
              },
              {
                text: 'A Fitbit is this type of wearable device.',
                answer: 'What is a fitness tracker?',
                value: 500,
              },
            ],
          },
          {
            title: 'Startups',
            questions: [
              {
                text: 'YC is the abbreviation for this famous startup accelerator.',
                answer: 'What is Y Combinator?',
                value: 100,
              },
              {
                text: 'This Harvard dropout founded Facebook.',
                answer: 'Who is Mark Zuckerberg?',
                value: 200,
              },
              {
                text: 'In startup terminology, this mythical creature refers to a company valued at over $1 billion.',
                answer: 'What is a unicorn?',
                value: 300,
              },
              {
                text: 'SaaS stands for this business model.',
                answer: 'What is Software as a Service?',
                value: 400,
              },
            ],
          },
        ],
      },
      {
        title: 'Travel Trivia',
        description: 'Test your knowledge of the world!',
        imageId: null,
        ownerId,
        categories: [
          {
            title: 'Capitals',
            questions: [
              {
                text: 'This city is the capital of France.',
                answer: 'What is Paris?',
                value: 100,
              },
              {
                text: "This city serves as Japan's capital.",
                answer: 'What is Tokyo?',
                value: 200,
              },
              {
                text: "This city, not Sydney, is Australia's capital.",
                answer: 'What is Canberra?',
                value: 300,
              },
              {
                text: "This city is Canada's capital.",
                answer: 'What is Ottawa?',
                value: 400,
              },
              {
                text: "This city is Brazil's capital.",
                answer: 'What is Brasília?',
                value: 500,
              },
            ],
          },
          {
            title: 'Landmarks',
            questions: [
              {
                text: "This iron tower is Paris's most famous landmark.",
                answer: 'What is the Eiffel Tower?',
                value: 100,
              },
              {
                text: 'This ancient amphitheater can be found in Rome.',
                answer: 'What is the Colosseum?',
                value: 200,
              },
              {
                text: 'This ancient Incan citadel is located high in the Peruvian Andes.',
                answer: 'What is Machu Picchu?',
                value: 300,
              },
              {
                text: 'This white marble mausoleum is located in Agra, India.',
                answer: 'What is the Taj Mahal?',
                value: 400,
              },
              {
                text: 'This massive fortification stretches across northern China.',
                answer: 'What is the Great Wall of China?',
                value: 500,
              },
            ],
          },
          {
            title: 'Currencies',
            questions: [
              {
                text: 'This is the official currency of the United States.',
                answer: 'What is the dollar?',
                value: 100,
              },
              {
                text: 'This is the currency used in the United Kingdom.',
                answer: 'What is the pound?',
                value: 200,
              },
              {
                text: "This is Japan's currency.",
                answer: 'What is the yen?',
                value: 300,
              },
              {
                text: 'This is the currency of India.',
                answer: 'What is the rupee?',
                value: 400,
              },
            ],
          },
        ],
      },
      {
        title: 'Food & Drink',
        description: 'Yummy trivia about food and drinks.',
        imageId: null,
        ownerId,
        categories: [
          {
            title: 'Fruits',
            questions: [
              {
                text: 'This yellow, curved fruit is rich in potassium.',
                answer: 'What is a banana?',
                value: 100,
              },
              {
                text: 'This red berry is unique for having its seeds on the outside.',
                answer: 'What is a strawberry?',
                value: 200,
              },
              {
                text: 'This fruit is brown and fuzzy outside, green inside.',
                answer: 'What is a kiwi?',
                value: 300,
              },
              {
                text: 'This red fruit is commonly used in American pies and keeps doctors away.',
                answer: 'What is an apple?',
                value: 400,
              },
              {
                text: 'These small purple fruits grow in bunches and are used to make wine.',
                answer: 'What are grapes?',
                value: 500,
              },
            ],
          },
          {
            title: 'Drinks',
            questions: [
              {
                text: 'This caffeinated beverage helps millions wake up each morning.',
                answer: 'What is coffee?',
                value: 100,
              },
              {
                text: 'This alcoholic beverage is made from fermented grapes.',
                answer: 'What is wine?',
                value: 200,
              },
              {
                text: 'This hot beverage is particularly popular in England, often served at 4 PM.',
                answer: 'What is tea?',
                value: 300,
              },
              {
                text: 'This carbonated soft drink is a popular cold beverage.',
                answer: 'What is soda?',
                value: 400,
              },
            ],
          },
          {
            title: 'Dishes',
            questions: [
              {
                text: 'This dish of raw fish and rice originated in Japan.',
                answer: 'What is sushi?',
                value: 100,
              },
              {
                text: 'This flatbread topped with cheese and sauce originated in Italy.',
                answer: 'What is pizza?',
                value: 200,
              },
              {
                text: "This rice dish with saffron is Spain's national dish.",
                answer: 'What is paella?',
                value: 300,
              },
              {
                text: 'This dish of fries, cheese curds, and gravy originated in Canada.',
                answer: 'What is poutine?',
                value: 400,
              },
              {
                text: 'This spiced dish originated in India and comes in many varieties.',
                answer: 'What is curry?',
                value: 500,
              },
            ],
          },
        ],
      },
      {
        title: 'Sports & Games',
        description: 'Trivia for sports and games fans.',
        imageId: null,
        ownerId,
        categories: [
          {
            title: 'Olympics',
            questions: [
              {
                text: 'This Brazilian city hosted the 2016 Summer Olympics.',
                answer: 'What is Rio de Janeiro?',
                value: 100,
              },
              {
                text: 'This symbol of five interlocking circles represents the Olympics.',
                answer: 'What are the Olympic rings?',
                value: 200,
              },
              {
                text: 'Usain Bolt became famous for excelling in this track and field discipline.',
                answer: 'What is sprinting?',
                value: 300,
              },
              {
                text: 'These Olympic Games feature sports like skiing and ice hockey.',
                answer: 'What are the Winter Olympics?',
                value: 400,
              },
              {
                text: 'This ceremonial fire burns throughout the Olympic Games.',
                answer: 'What is the Olympic flame?',
                value: 500,
              },
            ],
          },
          {
            title: 'Board Games',
            questions: [
              {
                text: 'In this property-trading game, players can build hotels and collect rent.',
                answer: 'What is Monopoly?',
                value: 100,
              },
              {
                text: 'This ancient strategy game features kings, queens, and checkmate.',
                answer: 'What is chess?',
                value: 200,
              },
              {
                text: 'In this word game, players form words using lettered tiles for points.',
                answer: 'What is Scrabble?',
                value: 300,
              },
              {
                text: "This children's board game features climbing up and sliding down.",
                answer: 'What is Snakes and Ladders?',
                value: 400,
              },
              {
                text: 'This sport involves rolling a ball to knock down ten pins.',
                answer: 'What is bowling?',
                value: 500,
              },
            ],
          },
          {
            title: 'Video Games',
            questions: [
              {
                text: "This green-clad plumber is Mario's younger brother.",
                answer: 'Who is Luigi?',
                value: 100,
              },
              {
                text: 'This princess is frequently rescued by Mario in the Mushroom Kingdom.',
                answer: 'Who is Princess Peach?',
                value: 200,
              },
              {
                text: 'This green-tunic wearing hero is the main character in the Zelda series.',
                answer: 'Who is Link?',
                value: 300,
              },
              {
                text: 'This sandbox game allows players to build with blocks in an infinite world.',
                answer: 'What is Minecraft?',
                value: 400,
              },
            ],
          },
        ],
      },
    ];

    for (const board of boards) {
      const boardId = await ctx.db.insert('boards', {
        title: board.title,
        description: board.description,
        imageId: board.imageId,
        ownerId: board.ownerId,
      });
      const categoryIds = [];
      for (const category of board.categories) {
        const categoryId = await ctx.db.insert('categories', {
          boardId,
          title: category.title,
        });
        const questionIds = [];
        let order = 0;
        for (const question of category.questions) {
          const questionId = await ctx.db.insert('questions', {
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
    return 'Seeded 5 jeopardy boards!';
  },
});
