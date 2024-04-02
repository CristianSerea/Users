import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render} from '@testing-library/react-native';
import PlaceholderView from '../PlaceholderView';

describe('PlaceholderView tests', () => {
  it('Test placeholder view rendering', () => {
    const text = 'Test';
    const {getByTestId, toJSON} = render(<PlaceholderView text={text} />);

    expect(getByTestId('PlaceholderView')).toBeTruthy();
    expect(getByTestId(`${text}`)).toHaveTextContent(text);

    expect(toJSON()).toMatchSnapshot();
  });
});
