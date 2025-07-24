import type {
  GenericDatabaseReader,
  GenericDatabaseWriter,
  WithOptionalSystemFields,
  WithoutSystemFields,
} from 'convex/server';
import type { DataModel, Doc, Id, TableNames } from './_generated/dataModel';

// Reader base: read-only CRUD
export class BaseReaderController<TableName extends TableNames> {
  protected db: GenericDatabaseReader<DataModel>;
  protected table: TableName;

  constructor(db: GenericDatabaseReader<DataModel>, table: TableName) {
    this.db = db;
    this.table = table;
  }

  async get(id: Id<TableName>) {
    return this.db.get(id);
  }

  async getMany(ids: Id<TableName>[]) {
    return Promise.all(ids.map((id) => this.db.get(id)));
  }

  query() {
    return this.db.query(this.table);
  }
}

// Writer base: read/write CRUD
export class BaseWriterController<
  TableName extends TableNames,
> extends BaseReaderController<TableName> {
  protected db: GenericDatabaseWriter<DataModel>;

  constructor(db: GenericDatabaseWriter<DataModel>, table: TableName) {
    super(db, table);
    this.db = db;
  }

  async insert(doc: WithoutSystemFields<Doc<TableName>>) {
    return this.db.insert(this.table, doc);
  }

  async patch(id: Id<TableName>, updates: Partial<Doc<TableName>>) {
    return this.db.patch(id, updates);
  }

  async replace(
    id: Id<TableName>,
    doc: WithOptionalSystemFields<Doc<TableName>>
  ) {
    return this.db.replace(id, doc);
  }

  async delete(id: Id<TableName>) {
    return this.db.delete(id);
  }
}
