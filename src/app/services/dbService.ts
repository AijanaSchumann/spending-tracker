import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Entry} from '../models/entry';
import defaultDataService from './defaultDataService';
import { Category } from '../models/category';

class DbService {
  db: SQLiteDatabase | null = null;
  readonly entryTableName = 'entries';
  readonly settingsTableName = 'settings';
  readonly categoriesTableName = 'categories';

  openDbConnection = async () => {
    const db = await openDatabase({
      name: 'spendings-data.db',
      location: 'default',
    }, 
    ()=>{
      console.log("connection to db opened")
      //initialize associated services
     defaultDataService.setup(db);
    }, 
    (error)=>{
      console.error(error);
    });

    this.db = db;
    console.log(db);
    return db !== null;
  };

  createBaseTables = async () => {
    await this.createEntryTable();
    await this.createSettingsTable();
    await this.createCategoryTable();
  };

  loadEntries = async () => {

    const result = await this.loadAll<Entry>(this.entryTableName);
    return result;
  };

  loadCategories = async () =>{
    const result = await this.loadAll<Category>(this.categoriesTableName);
    return result;
  }

  loadIncome = async () =>{
    const result = await this.loadAll<Entry>(this.entryTableName, `WHERE type ='income';`);
    return result;
  }

  private loadAll = async <T,>(tableName: string, filter?: string) =>{

    let entries : T[] = [];
    const filterSQL = filter || '';

    try {
      const sql = `SELECT * FROM '${tableName}' `+ filterSQL;
      const results = await this.db?.executeSql(sql);
      results?.forEach((data, x) => {
        data.rows.raw().forEach((el: any)=>{
          entries.push(el);
        });
      });
     
    } catch (error) {
      console.error('data not loaded from db '+tableName);
      console.error(error);
    }
    return entries;
  }

  saveEntry = async (data: Entry) => {

    try {
      const interval = data.interval ? "'"+data.interval+"'" : null;

      const sql =
        `INSERT INTO '${this.entryTableName}' (categoryId, value, note, date, interval, type) values ` +
        `(${data.categoryId}, ${data.value}, '${data.note || null}', datetime('now'), ${interval}, '${data.type}');`;

      const result = await this.db?.executeSql(sql);
      return result![0].insertId;
    } catch (error) {
      console.log('adding entry to db failed');
      console.error(error);
    }
    return undefined;
  };

  saveIncome = async (data: Entry) => {
    const result = await this.saveEntry(data);
    return result;
  };

  updateEntry = async (data: Entry) => {
   
    try {
      const sql =
        `INSERT OR REPLACE INTO '${this.entryTableName}' (id, categoryId, value, note, date, interval) values ` +
        `(${data.id!}, ${data.categoryId}, ${data.value}, '${data.note || null}', datetime('now'),'${data.interval}');`;

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

  saveAllIncome = async (data: Entry[]) =>{

    try {
    let sql =
        `INSERT OR REPLACE INTO '${this.entryTableName}' (categoryId, value, note, date, interval, type) values `;

        data.forEach((income: Entry) => {
          const interval = income.interval ? "'"+income.interval+"'" : null;
          sql+=`(${income.categoryId},${income.value}, '${income.note}',datetime('now'), ${interval}, '${income.type}'),`;
        });

        sql = sql.slice(0, -1) + ";";

      const result = await this.db?.executeSql(sql);
      return true
    } catch (error) {
      console.log('adding income array to db failed');
      console.error(error);
    }
    return false;
  }

  private createEntryTable = async () => {
    const sql2 = `CREATE TABLE IF NOT EXISTS '${this.entryTableName}' 
           (id INTEGER PRIMARY KEY AUTOINCREMENT,
            parentId INTEGER,
            categoryId INT NOT NULL,
            value DOUBLE NOT NULL,
            note TEXT,
            date INTEGER NOT NULL,
            interval TEXT,
            type TEXT NOT NULL);`;
            await this.db?.executeSql(sql2);
  };

  private createSettingsTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS '${this.settingsTableName}' 
           (id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT NOT NULL,
            data TEXT NOT NULL);`;
    await this.db?.executeSql(sql);
  };

  private createCategoryTable = async () =>{

    const sql = `CREATE TABLE IF NOT EXISTS '${this.categoriesTableName}' 
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT NULL,
     note TEXT,
     type TEXT NOT NULL);`;
     await this.db?.executeSql(sql);
  }
}

enablePromise(true);

const databaseService = new DbService();

export default databaseService;
