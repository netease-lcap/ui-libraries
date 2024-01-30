import React from 'react';
// import Router from '../index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Router',
  component: RouterProvider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: () => (
    <React.StrictMode>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: <div>Hello world!</div>,
          },
        ])}
      />
    </React.StrictMode>
  ),
  args: {},
};
