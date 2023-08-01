import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './store';

export const selectMonthlySpend = createSelector(
  (state: RootState) => state.entries.entries,
  entries => {
    const currentMonth = new Date().getMonth();
    const filtered = entries.filter(
      el => new Date(el.date).getMonth() === currentMonth,
    );
    return filtered.reduce((acc, item) => acc + item.value, 0);
  }
);

export const selectMontlyIncome = createSelector(
  (state: RootState) => state.income.income,
  income => {
    const currentMonth = new Date().getMonth();
    const filtered = income.filter(
      el => new Date(el.date).getMonth() === currentMonth,
    );
    return filtered.reduce((acc, item) => acc + item.value, 0);
  }
);
