import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import NewsReducers from 'module/news/reducer/NewsReducers';
import CommonReducers from 'reducer/common/CommonReducers';
import AuthReducers from 'module/auth/reducer/AuthReducers';

const reducers = combineReducers({
  common: CommonReducers,
  auth: AuthReducers,
  news: NewsReducers,
});

const store: ToolkitStore = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
