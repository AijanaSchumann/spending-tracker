
import { Currency } from "../src/app/constants/currencyList";
import databaseService, { DbService } from "../src/app/services/dbService";


const settingsFromDb = [
    {"data": "true", "key": "appFirstLaunch"}, 
    {"data": "{\"name\":\"Japanese Yen\",\"shorthand\":\"YEN\",\"symbol\":\"¥\"}", "key": "currency"},
    {"data": "{\"showIcons\": true}", key: "categories"}
]
const expectedCurrency : Currency = {name: 'Japanese Yen', shorthand: 'YEN', symbol: '¥'};
const expectedCategorySetting = {categories: {showIcons: true}};
const loadAll = jest.spyOn(DbService.prototype as any, 'loadAll').mockResolvedValue(settingsFromDb);

describe("database service", ()=>{
    it("settings load correctly", async ()=>{
       const result = await databaseService.loadSettings();
       expect(loadAll).toBeCalled();
       expect(result).toHaveProperty("appFirstLaunch");
       expect(result).toHaveProperty("currency");
       expect(result).toHaveProperty("categories");
       expect(result.currency).toStrictEqual(expectedCurrency);
       expect(result.categories).toStrictEqual(expectedCategorySetting.categories);

    });
});
  
