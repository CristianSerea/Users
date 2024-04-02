import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '../types/types';
import {getData, saveData} from '../utils/storage';
import Strings from '../../strings/strings.json';

type Props = {
  users: User[];
  error?: Error;
  loading: boolean;
};

const initialState: Props = {
  users: [],
  error: undefined,
  loading: false,
};

const fetchUsersRequest = 'https://jsonplaceholder.typicode.com/users';
const storageKey = 'Users';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
      let storageData = await getData(storageKey);
      if (storageData) {
        return storageData;
      } else {
        const response = await fetch(fetchUsersRequest);

        if (!response.ok) {
          throw new Error(Strings.InvalidResponse);
        }

        const data = await response.json();
        await saveData(storageKey, data);

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });
  },
});

export default usersSlice.reducer;
