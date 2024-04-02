import {createSelector} from '@reduxjs/toolkit';
import {StoreState} from './store';

const usersStore = (state: StoreState) => state.users.users;

export const selectPreviousUser = (currentUserId: number) => {
  return createSelector(usersStore, users => {
    const index = users.findIndex(user => user.id === currentUserId);
    return index > 0 ? users[index - 1] : undefined;
  });
};

export const selectNextUser = (currentUserId: number) => {
  return createSelector(usersStore, users => {
    const index = users.findIndex(user => user.id === currentUserId);
    return index >= 0 && index < users.length - 1
      ? users[index + 1]
      : undefined;
  });
};
