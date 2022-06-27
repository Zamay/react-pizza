import { RootState } from '../store';

export const selectSort = (state: RootState) => state.filters.sort;
export const selectFilter = (state: RootState) => state.filters;
