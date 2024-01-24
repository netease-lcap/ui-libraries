import { Row as AntdRow, Col as AntdCol } from 'antd';
import type { RowProps, ColProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

// const AntdRow = AntdGrid.Row;
// const AntdCol = AntdGrid.Col;
import './index.module.less';

const mapProps = {
  mySize: 'size',
};

const Row = registerComponet<
  RowProps,
  pluginType<RowProps>
>(
  AntdRow,
  { plugin, displayName: AntdRow.displayName, mapProps },
);

const Col = registerComponet<
  ColProps,
  pluginType<ColProps>
>(
  AntdCol,
  { plugin, displayName: AntdCol.displayName, mapProps },
);

export default { Row, Col };
export { Row, Col };
