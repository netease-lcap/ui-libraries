import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { Button } from 'antd';

test('Render Default Button', () => {
  const wrapper = renderer.create(<Button />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});
