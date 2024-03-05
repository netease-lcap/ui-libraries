import React from 'react';
import { Button } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    confirm: {
      options: ['无', 'modalConfirm', 'popConfirm'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  render: (args) => {
    const refss = React.useRef();
    return (
      <Button {...args} ref={refss}>
        {' '}
        Button-loading
      </Button>
    );
  },
  args: {
    type: 'primary',
    asyncLoading: true,
    // icon: 'AimOutli2ned',
    icon: 'http://minio-api.react01-lowcode.com/lowcode-static/user/defaulttenant/1709200203232_account-book.svg',
    children: '123',
    onClick: () => new Promise((res) => {
      setTimeout(() => {
        res();
        alert('点击了按钮');
      }, 1000);
    }),
    mySize: 'small',
    // appType: '',
    // usePlugin: ['lowCode'],
    // size: 'small',
    // onClick: () => {},
  },
};
export const 单实例插件 = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    label: 'Button',
    usePlugin: {
      scopePlugin(props) {
        return {
          render(scopeProps) {
            const Component = props.get('render');
            return (
              <div>
                <p>use Plugin</p>
                <Component {...scopeProps} />
              </div>
            );
          },
        };
      },
    },
    // mySize: 'small',
  },
};

export const Large = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    size: 'large',
  },
};

export const Small = {
  render: (args) => {
    // return <Button {...args}>Button</Button>;
    return (
      <div>
        <svg width="100" height="100">
          <image xlinkHref="http://minio-api.react01-lowcode.com/lowcode-static/user/defaulttenant/1709200203232_account-book.svg" width="100" height="100" />
        </svg>
      </div>
    );
  },
  args: {
    size: 'small',
  },
};
