import React from 'react';
import {render} from '@testing-library/react-native';
import TabBarIcon from '../TabBarIcon';

describe('TabBarIcon tests', () => {
  it('Test tab bar icon rendering', () => {
    const source = require('../../assets/home.png');
    const {getByTestId, toJSON} = render(<TabBarIcon source={source} />);
    const image = getByTestId('TabBarIcon');

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(source);

    expect(toJSON()).toMatchSnapshot();
  });
});
