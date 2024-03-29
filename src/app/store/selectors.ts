import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './store';
import { groupBy } from '../utils/utils';

export const selectMonthlySpend = createSelector(
  (state: RootState) => state.spending.entries,
  entries => {
    const currentMonth = new Date().getMonth();
    const filtered = entries.filter(
      el => new Date(el.date).getMonth() === currentMonth && el.type === "expense"
    );
    return filtered.reduce((acc, item) => acc + item.value, 0);
  }
);

export const selectCategoriesGroupedByType = createSelector(
  (state: RootState) => state.settings.categories.data,
  categories => {

    return groupBy(categories, i => i.type);
  }
)

export const selectMontlyIncome = createSelector(
  (state: RootState) =>  state.spending.entries,
  income => {
    const currentMonth = new Date().getMonth();
    const filtered = income.filter(
      el => new Date(el.date).getMonth() === currentMonth && el.type === "income"
    );
    return filtered.reduce((acc, item) => acc + item.value, 0);
  }
);
