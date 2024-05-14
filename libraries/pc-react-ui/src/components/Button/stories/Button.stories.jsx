import React from 'react';
import { Button, Icon } from '@/index';

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
    React.useEffect(() => {
      console.log(refss, 'refss');
    }, []);
    return (
      <Button {...args} ref={refss}>
        取色
        <Icon name="RiCornerLeftUpFill" />
      </Button>
    );
  },
  args: {
    type: 'primary',
    asyncLoading: true,
    // icon: 'AimOutli2ned',
    onContextMenu: (e) => console.log(1),
    // icon: '//minio-api.codewave-test.163yun.com/lowcode-static/user/defaulttenant/1709717732938_%E5%A4%AA%E9%98%B3.svg',
    icon: 'RiCornerLeftUpFill',
    onClick: async () => {
      // const eyeDropper = new EyeDropper();
      // const color = await eyeDropper.open();
      // alert(color.sRGBHex);
    },
    // mySize: 'small',
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
        console.log(1234);
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
          <image
            xlinkHref="http://minio-api.react01-lowcode.com/lowcode-static/user/defaulttenant/1709200203232_account-book.svg"
            width="100"
            height="100"
          />
        </svg>
      </div>
    );
  },
  args: {
    size: 'small',
  },
};
