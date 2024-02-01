import React, { useEffect, useRef } from 'react';
import { Table as AntdTable } from 'antd';
import Table, { TableColumn } from '../index';
import Text from '../../Text';
import Select from '../../Select';

const { Column, ColumnGroup } = AntdTable;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Table',
  component: Table,
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
export const 默认 = {
  render: (args) => {
    function View() {
      console.log('xxxxx');
      useEffect(() => {
        console.log('rerender!');
      }, []);
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
      const ref12 = useRef(null);
      const ref13 = useRef(null);
      const ref14 = useRef(null);
      const ref15 = useRef(null);
      const ref16 = useRef(null);
      const ref17 = useRef(null);
      const ref18 = useRef(null);
      const refs = {
        'rootview.0': ref0,
        'rootview.1': ref1,
        'rootview.2': ref2,
        'rootview.2.0': ref3,
        'rootview.2.0.1.0': ref4,
        'rootview.2.1': ref5,
        'rootview.2.1.1.0': ref6,
        'rootview.2.2': ref7,
        'rootview.2.2.1.0': ref8,
        'rootview.2.3': ref9,
        'rootview.2.3.1.0': ref10,
        'rootview.2.4': ref11,
        'rootview.2.4.1.0': ref12,
        'rootview.2.5': ref13,
        'rootview.2.5.1.0': ref14,
        'rootview.2.6': ref15,
        'rootview.2.6.1.0': ref16,
        'rootview.2.7': ref17,
        'rootview.2.7.1.0': ref18,
      };
      return (
        <>
          <Text key="21" nodepath="rootview.0" ref={ref0} children="文本" />
          <Select key="22" nodepath="rootview.1" ref={ref1} placeholder="请选择" />
          <Table key="25" data-nodepath="rootview.2" search={false} options={false} ref={ref2} ide-iscontainer="true" dataSource={[{}, {}, {}]} className="ide-style0">
            <TableColumn
              key="26"
              ref={ref3}
              render={() => <span>1234</span>}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="31" nodepath="rootview.2.0.1.0" ref={ref4} children="主键" />
                </div>
              )}
            />
            <TableColumn
              key="32"
              ref={ref5}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="37" nodepath="rootview.2.1.1.0" ref={ref6} children="创建时间" />
                </div>
              )}
            />
            <TableColumn
              key="38"
              ref={ref7}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="43" nodepath="rootview.2.2.1.0" ref={ref8} children="更新时间" />
                </div>
              )}
            />
            <TableColumn
              key="44"
              ref={ref9}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="49" nodepath="rootview.2.3.1.0" ref={ref10} children="创建者" />
                </div>
              )}
            />
            <TableColumn
              key="50"
              ref={ref11}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="55" nodepath="rootview.2.4.1.0" ref={ref12} children="更新者" />
                </div>
              )}
            />
            <TableColumn
              key="56"
              ref={ref13}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="61" nodepath="rootview.2.5.1.0" ref={ref14} children="A属性" />
                </div>
              )}
            />
            <TableColumn
              key="62"
              ref={ref15}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="67" nodepath="rootview.2.6.1.0" ref={ref16} children="B属性" />
                </div>
              )}
            />
            <TableColumn
              key="68"
              ref={ref17}
              ide-iscontainer="true"
              title={() => (
                <div ide-draggable="false">
                  <Text key="73" nodepath="rootview.2.7.1.0" ref={ref18} children="C属性" />
                </div>
              )}
            />
          </Table>
        </>
      );
    }
    return <View />;
  },
  args: {},
};
