import React, { useRef, useEffect } from 'react';
import {
  Tree, TreeNode, Flex, CheckboxGroup, Checkbox,
} from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Tree',
  component: Tree,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 异步函数 = {
  render: (args) => {
    const ref = React.useRef();
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <div>
        <button onClick={() => ref.current.reload()}>1234</button>
        <Tree {...args} ref={ref} />
      </div>
    );
  },
  args: {
    dataSource: () => [
      {
        entity1: {
          id: 2825065773829632,
          createdTime: '2024-03-12T06:19:18.000Z',
          updatedTime: '2024-03-12T06:19:18.000Z',
          createdBy: null,
          updatedBy: null,
          property1: '123123',
          parentId: 11,
        },
      },
      {
        entity1: {
          id: 2825065836039680,
          createdTime: '2024-03-12T06:19:25.000Z',
          updatedTime: '2024-03-12T06:19:25.000Z',
          createdBy: null,
          updatedBy: null,
          property1: '微软',
          parentId: 33,
        },
      },
      {
        entity1: {
          id: 2825065883872768,
          createdTime: '2024-03-12T06:19:31.000Z',
          updatedTime: '2024-03-12T06:19:31.000Z',
          createdBy: null,
          updatedBy: null,
          property1: '士大夫十分',
          parentId: 22,
        },
      },
      {
        entity1: {
          id: 2825069794012672,
          createdTime: '2024-03-12T06:27:29.000Z',
          updatedTime: '2024-03-12T06:27:29.000Z',
          createdBy: null,
          updatedBy: null,
          property1: 'adasd',
          parentId: 12,
        },
      },
      {
        entity1: {
          id: 2825070030769664,
          createdTime: '2024-03-12T06:27:57.000Z',
          updatedTime: '2024-03-12T06:28:03.000Z',
          createdBy: null,
          updatedBy: null,
          property1: 'sdfs',
          parentId: 2825065773829632,
        },
      },
    ],
    valueField: 'entity1.id',
    textField: 'entity1.createdTime',
    parentField: 'entity1.parentId',
    // valueField: 'a.key',
    // textField: 'a.label',
    // childrenField: 'a.children',
  },
};
export const 同步函数 = {
  render: (args) => {
    console.log('xxxxx');
    function EmptySlot() {
      return <div />;
    }
    const ref0 = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const ref8 = useRef(null);
    const ref9 = useRef(null);
    const ref10 = useRef(null);
    const ref11 = useRef(null);
    const refs = {
      'rootview.0': ref0,
      'rootview.0.0': ref1,
      'rootview.0.0.0': ref2,
      'rootview.0.0.0.0': ref3,
      'rootview.0.0.0.1': ref4,
      'rootview.0.0.1': ref5,
      'rootview.0.0.2': ref6,
      'rootview.1': ref7,
      'rootview.1.1': ref8,
      'rootview.1.1.0': ref9,
      'rootview.1.2': ref10,
      'rootview.1.2.0': ref11,
    };
    // window._ideCallComponentMethod = function (nodepath, method, ...args) {
    //   console.log(`调用了!${nodepath}上的方法：${method}`, refs[nodepath]?.current?.[method]);
    //   refs[nodepath].current[method](...args);
    // };

    useEffect(() => {
      // window.invokeComponentUpdatedMessage();
      console.log('rerender!');
    }, []);

    return (
      <Flex data-nodepath="rootview.0" ref={ref0} ide-iscontainer="true">
        <Tree data-nodepath="rootview.0.0" ref={ref1} ide-iscontainer="true">
          <TreeNode
            data-nodepath="rootview.0.0.0"
            ref={ref2}
            ide-iscontainer="true"
            key={1}
            title={(() => (
              <div ide-draggable="false" data-nodepath="rootview.0.0.0.2">
                <EmptySlot />
              </div>
            ))()}
          >
            <TreeNode
              data-nodepath="rootview.0.0.0.0"
              ref={ref3}
              ide-iscontainer="true"
              key={5}
              title={(() => (
                <div ide-draggable="false" data-nodepath="rootview.0.0.0.0.0">
                  <EmptySlot />
                </div>
              ))()}
            >
              <EmptySlot />
            </TreeNode>
            <TreeNode
              data-nodepath="rootview.0.0.0.1"
              ref={ref4}
              ide-iscontainer="true"
              key={6}
              title={(() => (
                <div ide-draggable="false" data-nodepath="rootview.0.0.0.1.0">
                  <EmptySlot />
                </div>
              ))()}
            >
              <EmptySlot />
            </TreeNode>
          </TreeNode>
          <TreeNode
            data-nodepath="rootview.0.0.1"
            ref={ref5}
            ide-iscontainer="true"
            key={2}
            title={(() => (
              <div ide-draggable="false" data-nodepath="rootview.0.0.1.0">
                <EmptySlot />
              </div>
            ))()}
          >
            <EmptySlot />
          </TreeNode>
          <TreeNode
            data-nodepath="rootview.0.0.2"
            ref={ref6}
            ide-iscontainer="true"
            key={4}
            title={(() => (
              <div ide-draggable="false" data-nodepath="rootview.0.0.2.0">
                <EmptySlot />
              </div>
            ))()}
          >
            <EmptySlot />
          </TreeNode>
        </Tree>
      </Flex>
    );
  },
  args: {
    dataSource: () => [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
    valueField: 'key',
    textField: 'label',
  },
};

export const 数组 = {
  render: (args) => <Tree {...args} />,
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
    valueField: 'key',
    textField: 'label',
  },
};
