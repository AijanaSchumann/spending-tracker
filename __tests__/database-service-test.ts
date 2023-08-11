
import { Currency } from "../src/app/constants/currencyList";
import databaseService, { DbService } from "../src/app/services/dbService";


const settingsFromDb = [{"data": "true", "key": "appFirstLaunch"}, {"data": "{\"name\":\"Japanese Yen\",\"shorthand\":\"YEN\",\"symbol\":\"¥\"}", "key": "currency"}]
const expectedCurrency : Currency = {name: 'Japanese Yen', shorthand: 'YEN', symbol: '¥'};
const loadAll = jest.spyOn(DbService.prototype as any, 'loadAll').mockResolvedValue(settingsFromDb);

describe("database service", ()=>{
    it("settings load correctly", async ()=>{
       const result = await databaseService.loadSettings();
       expect(loadAll).toBeCalled();
       expect(result).toHaveProperty("appFirstLaunch");
       expect(result).toHaveProperty("currency");
       expect(result.currency).toStrictEqual(expectedCurrency);
    });
});
  
