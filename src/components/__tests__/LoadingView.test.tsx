import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingView from '../LoadingView';

describe('LoadingView tests', () => {
  it('Test loading view rendering', () => {
    const {getByTestId, toJSON} = render(<LoadingView />);

    expect(getByTestId('LoadingView')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
