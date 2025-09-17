import _ from 'lodash';
import { ElCheckboxGroup, ElCheckbox, ElIcon, ElFlex, ElPopover } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

// TODO
const TableToolBarAccumulate = new PluginAccumulateTypes<nasl.ui.ElTableOptions<any, any, any, any>, any>();
export default TableToolBarAccumulate.addPlugin({
  name: 'handleTableToolBar',
  handle(props) {
    const columns = props.get('columns');
    const value = props.get('selectedColumns');
    const setValue = props.get('setSelectedColumns');
    return {
      value,
      columns,
      setValue,
      render: (props, { attrs }) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div />
            <ElFlex style={{ display: 'flex', alignItems: 'center' }}>
              <ElPopover title="列配置" key="12" trigger="click" width="200" show-arrow={false}>
                {{
                  reference: <ElIcon name="Setting" size="18px" />,
                  default: () => {
                    return (
                      <div>
                        <ElCheckboxGroup
                          onChange={(value) => {
                            attrs.setValue(value);
                          }}>
                          {_.map(props.columns, (item) => (
                            <ElCheckbox
                              label={item.label}
                              value={item.prop}
                              checked={props.value?.includes?.(item.prop)}
                            />
                          ))}
                        </ElCheckboxGroup>
                      </div>
                    );
                  },
                }}
              </ElPopover>
            </ElFlex>
          </div>
        );
      },
    };
  },
});
