import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Entry} from '../models/entry';
import defaultDataService from './defaultDataService';
import { Category } from '../models/category';
import { Setting } from '../models/settings';

export class DbService {
  db: SQLiteDatabase | null = null;
  readonly entryTableName = 'entries';
  readonly settingsTableName = 'settings';
  readonly categoriesTableName = 'categories';

  async openDbConnection(){
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

  async createBaseTables(){
    await this.createEntryTable();
    await this.createSettingsTable();
    await this.createCategoryTable();
  };

  async loadEntries(){

    const result = await this.loadAll<Entry>(this.entryTableName);
    return result;
  };

  async loadCategories(){
    const result = await this.loadAll<Category>(this.categoriesTableName);
    return result;
  }

  async loadSettings(){
    const result = await this.loadAll<Setting>(this.settingsTableName);

    const flat = result.reduce((acc : {[index: string]: any}, curr: Setting)=>{
      acc[curr.key] = JSON.parse(curr.data);
      return acc;
    },{} as {[index: string]: any});
    
    return flat;
  }

  async saveSetting(name: string, value: any){

    const sql = `INSERT OR REPLACE INTO '${this.settingsTableName}' (key, data) values (?,?)`;
    const result = await this.db?.executeSql(sql,[name, JSON.stringify(value)]);
    return result ? result[0].rowsAffected != 0 : false;
  }

  async loadIncome(){
    const result = await this.loadAll<Entry>(this.entryTableName, `WHERE type ='income';`);
    return result;
  }

  private async loadAll<T,>(tableName: string, filter?: string){

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

  async saveEntry(data: Entry){

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

  async saveIncome(data: Entry){
    const result = await this.saveEntry(data);
    return result;
  };

  async updateEntry(data: Entry){
   
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

  async deleteEntry(entry: Entry){

    const sql = `DELETE FROM '${this.entryTableName}' WHERE id = ${entry.id};`;
    try {
      this.db?.executeSql(sql);
    } catch (error) {
      console.log('deleting entry failed');
      console.error(error);
    }
  };

  async saveAllIncome(data: Entry[]){

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

  private async createEntryTable(){
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

  private async createSettingsTable(){
    const sql = `CREATE TABLE IF NOT EXISTS '${this.settingsTableName}' 
           (key TEXT NOT NULL PRIMARY KEY,
            data TEXT NOT NULL);`;
    await this.db?.executeSql(sql);
  };

  private async createCategoryTable(){

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
