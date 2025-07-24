import type {
  GenericDatabaseReader,
  GenericDatabaseWriter,
} from 'convex/server';
import type { DataModel, Id } from '@/convex/_generated/dataModel';
import {
  BaseReaderController,
  BaseWriterController,
} from '@/convex/controllers';

export class BoardReaderController extends BaseReaderController<'boards'> {
  private categoryController: CategoryReaderController;
  private questionController: QuestionReaderController;

  constructor(db: GenericDatabaseReader<DataModel>) {
    super(db, 'boards');
    this.categoryController = new CategoryReaderController(db);
    this.questionController = new QuestionReaderController(db);
  }

  async getEnriched(id: Id<'boards'>) {
    const board = await this.get(id);
    if (!board) return null;

    const categories = await this.categoryController
      .query()
      .filter((q) => q.eq(q.field('boardId'), id))
      .collect();

    const categoriesWithQuestions = await Promise.all(
      categories.map(async (category) => {
        const questions = await this.questionController
          .query()
          .filter((q) => q.eq(q.field('categoryId'), category._id))
          .collect();
        return { ...category, questions };
      })
    );

    return { ...board, enriched: { categories: categoriesWithQuestions } };
  }
}

export class CategoryReaderController extends BaseReaderController<'categories'> {
  constructor(db: GenericDatabaseReader<DataModel>) {
    super(db, 'categories');
  }
}

export class QuestionReaderController extends BaseReaderController<'questions'> {
  constructor(db: GenericDatabaseReader<DataModel>) {
    super(db, 'questions');
  }
}

export class BoardWriterController extends BaseWriterController<'boards'> {
  constructor(db: GenericDatabaseWriter<DataModel>) {
    super(db, 'boards');
  }
}
