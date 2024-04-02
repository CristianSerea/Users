import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render, fireEvent} from '@testing-library/react-native';
import UserCard from '../UserCard';
import {User} from '../../types/types';
import users from '../../../mock/users.json';

const indexMock: number = 0;
const userMock: User = users[indexMock];

describe('UserCard tests', () => {
  it('Test user card rendering', () => {
    const {getByTestId, toJSON} = render(
      <UserCard user={userMock} index={indexMock} onPress={() => {}} />,
    );

    expect(getByTestId(`UserCard-${userMock.id}`)).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('Test user card attributes', () => {
    const {getByText, getByTestId} = render(
      <UserCard user={userMock} index={indexMock} onPress={() => {}} />,
    );

    expect(getByText(userMock.name)).toBeTruthy();

    expect(getByTestId(`Email-${userMock.email}`)).toBeTruthy();
    expect(getByTestId(`${userMock.email}`)).toHaveTextContent(userMock.email);

    expect(getByTestId(`Phone-${userMock.phone}`)).toBeTruthy();
    expect(getByTestId(`${userMock.phone}`)).toHaveTextContent(userMock.phone);

    const address = `${userMock.address.street} ${userMock.address.city} ${userMock.address.zipcode}`;
    expect(getByTestId(`Address-${address}`)).toBeTruthy();
    expect(getByTestId(`${address}`)).toHaveTextContent(address);

    expect(getByTestId(`Company-${userMock.company.name}`)).toBeTruthy();
    expect(getByTestId(`${userMock.company.name}`)).toHaveTextContent(
      userMock.company.name,
    );
  });

  it('Test user card action', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <UserCard user={userMock} index={indexMock} onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId(`UserCard-${userMock.id}`));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
