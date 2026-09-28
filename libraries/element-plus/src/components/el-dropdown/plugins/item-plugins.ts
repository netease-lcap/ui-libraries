import { h } from 'vue';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import ElIcon from '../../el-icon/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const DropdownItemBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElDropdownItemOptions, object>();

export default DropdownItemBasicAccumulate.addPlugin({
  name: 'handleItemPlugin',
  handle(props) {
    return {
      [$deletePropsList]: ['icon'],
    };
  },
});
