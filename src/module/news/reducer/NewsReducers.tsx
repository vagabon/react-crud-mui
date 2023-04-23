import { createSlice } from '@reduxjs/toolkit';
import { INewsDto } from '../dto/NewsDto';
import { DefaultState, ReducerCrudState, ReducersActions } from 'reducer/BaseReducer';

export interface NewsReducerState extends ReducerCrudState {
  datas: INewsDto[];
  data: INewsDto;
}

const initialState: NewsReducerState = {
  ...DefaultState,
};

export const NewsReducer = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    ...ReducersActions,
  },
});
export const NewsAction = { ...NewsReducer.actions };
const NewsReducers = NewsReducer.reducer;
export default NewsReducers;
