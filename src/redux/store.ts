import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './reducers';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
