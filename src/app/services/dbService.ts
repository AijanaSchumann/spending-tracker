import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Entry} from '../models/entry';

class DbService {
  db: SQLiteDatabase | null = null;
  readonly entryTableName = 'entries';

  openDbConnection = async () => {
    const db = await openDatabase({
      name: 'spendings-data.db',
      location: 'default',
    });
    this.db = db;
    return true;
  };

  createBaseTables = () => {
    this.createEntryTable();
  };

  loadEntries = async () => {
    const entries: Entry[] = [];

    try {
      const sql = `SELECT * FROM '${this.entryTableName}';`;
      const results = await this.db?.executeSql(sql);
      results?.forEach((data, i) => entries.push(data.rows.item(i)));
    } catch (error) {
      console.error('entries not loaded from db');
      console.error(error);
    }

    return entries;
  };

  saveEntry = async (data: Entry) => {
    try {
      const sql =
        `INSERT OR REPLACE INTO '${this.entryTableName}' (id, categoryId, value, note, date, recurring, interval) values ` +
        `('', ${data.categoryId}, ${data.value}, '${data.note || null}', '${
          data.date
        }', ${data.recurring}, '${data.interval}');`;

      const result = await this.db?.executeSql(sql);
      return result![0].insertId;
    } catch (error) {
      console.log('adding entry to db failed');
      console.error(error);
    }
    return undefined;
  };

  deleteEntry = (entry: Entry) => {
    const sql = `DELETE FROM '${this.entryTableName}' WHERE id = ${entry.id};`;
    try {
      this.db?.executeSql(sql);
    } catch (error) {
      console.log('deleting entry failed');
      console.error(error);
    }
  };

  private createEntryTable = () => {
    const sql2 = `CREATE TABLE IF NOT EXISTS '${this.entryTableName}' 
           (id PRIMARYKEY AUTO_INCREMENT INT NOT NULL,
            categoryId INT NOT NULL,
            value DOUBLE NOT NULL,
            note TEXT,
            date TEXT NOT NULL,
            recurring BOOLEAN,
            interval TEXT);`;
    this.db?.executeSql(sql2);
  };
}

enablePromise(true);

const databaseService = new DbService();

export default databaseService;
