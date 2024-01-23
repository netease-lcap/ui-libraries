import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { composeStories } from '@storybook/react';

import * as stories from '../stories/Button.stories';

const { Primary } = composeStories(stories);

test('Render Primary Button', () => {
  const wrapper = renderer.create(<Primary />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});
