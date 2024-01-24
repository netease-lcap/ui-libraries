import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { composeStories } from '@storybook/testing-react';

import * as stories from '../stories/Menu.stories';

const {
  Primary, Secondary, Large, Small,
} = composeStories(stories);

test('Render Primary Button', () => {
  const wrapper = renderer.create(<Primary />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

test('Render Secondary Button', () => {
  const wrapper = renderer.create(<Secondary />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

test('Render Large Button', () => {
  const wrapper = renderer.create(<Large />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

test('Render Small Button', () => {
  const wrapper = renderer.create(<Small />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});
