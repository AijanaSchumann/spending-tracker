import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Category } from '../models/category';

class DefaultDataService{
    private readonly appFirstLaunchKey = 'appFirstLaunchKey';
    readonly settingsTableName = 'settings';
  readonly categoriesTableName = 'categories';

    sql = `SELECT * FROM '${this.settingsTableName}' WHERE key = '${this.appFirstLaunchKey}'; `;
    updateSql = `INSERT INTO '${this.settingsTableName}' (key, data) values (?,?);`;
    db: SQLiteDatabase | null = null;
    private isAppFirstRun: boolean | null = null;

    setup(db: SQLiteDatabase){
        this.db = db;
    }

    async createDefaultCategories(){
        const categories : Category[]=[
            {id:1, title:"Gorceries", type:"expense"},
            {id:2, title:"Rent", type:"expense"},
            {id:3, title:"Medical", type:"expense"},
            {id:4, title:"Gym", type:"expense"},
            {id:5, title:"Fun", type:"expense"},
            {id:6, title:"Salary", type:"income"},
            {id:7, title:"Gift", type:"income"}
        ];

        let sql = `INSERT OR REPLACE INTO '${this.categoriesTableName}' (id, title, note, type) values `;
        categories.forEach(el=>{
            sql +=`(${el.id},'${el.title}',null,'${el.type}'),`
        });
        sql = sql.slice(0, -1) + ";";
        console.log(sql);
       
        try {
            await this.db?.executeSql(sql);
          } 
          catch (error) {
            console.log('category creation failed');
            console.error(error);
          }

        return categories;


    }

    async isAppFirstLaunched(){

        if(this.isAppFirstRun === null){
            const result = await this.db?.executeSql(this.sql);
            console.log(result);
            const row = result?.[0].rows;
            if(result && row && row.length>0){
                const value = row.item(0).data;
                this.isAppFirstRun = JSON.parse(value);
            }else{
                this.isAppFirstRun = true;
            }
            
           
        }

        return this.isAppFirstRun;
    }

    async saveAppSetupDone(){

        this.db?.executeSql(this.updateSql, [this.appFirstLaunchKey, "false"]).then(e=> console.log(e)).catch(err=> console.error(err));
    }
}

const defaultDataService = new DefaultDataService();

export default defaultDataService;