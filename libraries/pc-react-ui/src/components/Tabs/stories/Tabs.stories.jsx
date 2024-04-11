import React from 'react';
import { Tabs, TabPane, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Tabs',
  component: Tabs,
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
    const [value, setValue] = React.useState();
    React.useEffect(() => {
      console.log(ref, ref, 'ref');
    }, []);
    return (
      <div>
        <button
          onClick={() => {
            // ref.current.setValue(3);
            setValue('1');
          }}
        >
          1234
        </button>
        <Tabs
          ref={ref}
          activeKey={value}
          dataSource={args.dataSource}
          textField="entityForSel.name"
          valueField="entityForSel.id"
          onActiveKeyChange={setValue}
          renderTitle={(item) => <Text>{item.entityForSel.name}</Text>}
          renderContent={(item) => <Text>{item.entityForSel.name}</Text>}
        />
      </div>
    );
  },
  args: {
    dataSource: () => new Promise((res) => {
      setTimeout(() => {
        res([
          {
            entityForSel: {
              id: 1,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 0,
              name: '测试1',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 2,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 0,
              name: '测试2',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 3,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 1,
              name: '测试1.1',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 4,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 3,
              name: '测试1.1.1',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 5,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 2,
              name: '测试2.1',
              sonid: [],
            },
          },
        ]);
      }, 3000);
    }),
  },
};
export const 同步函数 = {
  render: (args) => {
    function HoistNodePath(params) {
      return <div />;
    }
    function EmptySlot(params) {
      return (
        <div
          style={{ width: '100px', height: '100px', border: '1px solid red' }}
        />
      );
    }
    return (
      <Tabs
        data-nodepath="rootview.0"
        ide-iscontainer="true"
        key="component-4"
        dataSource={[{}, {}, {}]}
        titleRender={(item) => <Text>1234</Text>}
      >
        <TabPane
          ide-iscontainer="true"
          key="1"
          tab={(() => (
            <>
              <HoistNodePath
                key="17"
                nodePath="rootview.0.0"
                topSelector=".cw-tabs-tab"
                data-nodepath-multiple="true"
              />
              <div ide-draggable="false" data-nodepath="rootview.0.0.0">
                <Text
                  data-nodepath="rootview.0.0.0.0"
                  children="选项卡1"
                  key="component-5"
                  data-editable="true"
                />
              </div>
            </>
          ))()}
          titleRender={() => (
            <div ide-draggable="false" data-nodepath="rootview.0.0.1">
              <EmptySlot data-emptyslot-nodepath="rootview.0.0.1" key="18" />
            </div>
          )}
          contentRender={() => (
            <div ide-draggable="false" data-nodepath="rootview.0.0.2">
              <EmptySlot data-emptyslot-nodepath="rootview.0.0.2" key="19" />
            </div>
          )}
        >
          <HoistNodePath
            key="15"
            nodePath="rootview.0.0"
            topSelector=".cw-tabs-tabpane"
            data-nodepath-multiple="true"
          />
          <EmptySlot data-emptyslot-nodepath="rootview.0.0" key="16" />
        </TabPane>
        <TabPane
          ide-iscontainer="true"
          key="2"
          tab={(() => (
            <>
              <HoistNodePath
                key="22"
                nodePath="rootview.0.1"
                topSelector=".cw-tabs-tab"
                data-nodepath-multiple="true"
              />
              <div ide-draggable="false" data-nodepath="rootview.0.1.0">
                <Text
                  data-nodepath="rootview.0.1.0.0"
                  children="选项卡2"
                  key="component-6"
                  data-editable="true"
                />
              </div>
            </>
          ))()}
          titleRender={() => (
            <div ide-draggable="false" data-nodepath="rootview.0.1.1">
              <EmptySlot data-emptyslot-nodepath="rootview.0.1.1" key="23" />
            </div>
          )}
          contentRender={() => (
            <div ide-draggable="false" data-nodepath="rootview.0.1.2">
              <EmptySlot data-emptyslot-nodepath="rootview.0.1.2" key="24" />
            </div>
          )}
        >
          <HoistNodePath
            key="20"
            nodePath="rootview.0.1"
            topSelector=".cw-tabs-tabpane"
            data-nodepath-multiple="true"
          />
          <EmptySlot data-emptyslot-nodepath="rootview.0.1" key="21" />
        </TabPane>
        <TabPane
          ide-iscontainer="true"
          key="3"
          tab={(() => (
            <>
              <HoistNodePath
                key="27"
                nodePath="rootview.0.2"
                topSelector=".cw-tabs-tab"
                data-nodepath-multiple="true"
              />
              <div ide-draggable="false" data-nodepath="rootview.0.2.0">
                <Text
                  data-nodepath="rootview.0.2.0.0"
                  children="选项卡3"
                  key="component-7"
                  data-editable="true"
                />
              </div>
            </>
          ))()}
          titleRender={() => (
            <div ide-draggable="false" data-nodepath="rootview.0.2.1">
              <EmptySlot data-emptyslot-nodepath="rootview.0.2.1" key="28" />
            </div>
          )}
          contentRender={() => (
            <div ide-draggable="false" data-nodepath="rootview.0.2.2">
              <EmptySlot data-emptyslot-nodepath="rootview.0.2.2" key="29" />
            </div>
          )}
        >
          <HoistNodePath
            key="25"
            nodePath="rootview.0.2"
            topSelector=".cw-tabs-tabpane"
            data-nodepath-multiple="true"
          />
          <EmptySlot data-emptyslot-nodepath="rootview.0.2" key="26" />
        </TabPane>
      </Tabs>
    );
  },
  args: {
    dataSource: () => [{}, {}, {}],
    // titleRender: (item) => <Text>1234</Text>,
    // contentRender: (item) => <Text> 1234</Text>,
  },
};

export const 数组 = {
  render: (args) => {
    return (
      <Tabs
        data-nodepath="rootview.11"
        ide-iscontainer="true"
        defaultActiveKey="2"
      >
        <TabPane
          ide-iscontainer="true"
          key={1}
          tab={(() => (
            <Text data-nodepath="rootview.11.0.0.0" children="选项卡1" />
          ))()}
        >
          <Text data-nodepath="rootview.11.0.2" children="普通文本" />
        </TabPane>
        <TabPane
          ide-iscontainer="true"
          key={2}
          tab={(() => (
            <Text data-nodepath="rootview.11.1.0.0" children="选项卡2" />
          ))()}
        >
          <Text data-nodepath="rootview.11.1.1" children="普通文本" />
        </TabPane>
        <TabPane
          ide-iscontainer="true"
          key={3}
          tab={(() => (
            <Text data-nodepath="rootview.11.2.0.0" children="选项卡3" />
          ))()}
        />
      </Tabs>
    );
  },
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
  },
};
