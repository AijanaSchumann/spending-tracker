import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectMonthlySpend = createSelector(
    (state: RootState) => state.entries.entries,
    (entries) => entries.reduce((acc, item)=> acc+item.value, 0)
)