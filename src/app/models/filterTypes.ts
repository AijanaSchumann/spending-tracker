import { Entry } from "./entry";
import { Income } from "./income";


//TODO: add category one day
export type FilterTypes =
  | 'month'
  | 'day'
  | 'income'
  | 'reacurring'
  | 'ascDescValue'
  | 'ascDescDate';

export enum SupportedFilters {
  month = 'month',
  day = 'day',
  income = 'income',
  reacurring = 'reacurring',
  ascDescValue = 'ascDescValue',
  ascDescDate = 'ascDescDate',
}

export const getSupportedFilter = (filter: FilterTypes) =>{

  const result = SupportedFilters[filter];
  console.log("parsed filter"+result);
  return result;

}

export type FilterConfig = {
  content: JSX.Element;
  filteredData?: () => (Entry | Income)[];
};