import { expect, it, describe } from 'vitest';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../Button';

describe('Test Button Render', () => {
  it('Normal Button', () => {
    const component = renderer.create(
      <Button>Button</Button>,
    );

    const result = component.toJSON();
    expect(result).toMatchSnapshot();
  });

  it('Primary Button', () => {
    const component = renderer.create(
      <Button primary>Button</Button>,
    );

    const result = component.toJSON();
    expect(result).toMatchSnapshot();
  });

  it('Size Button', () => {
    const component = renderer.create(
      <Button primary size="large">Button</Button>,
    );

    const result = component.toJSON();
    expect(result).toMatchSnapshot();
  });
});
