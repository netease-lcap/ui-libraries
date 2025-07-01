import _ from 'lodash';

// TODO
export function tableToolBarPlugin(props) {
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
          <el-flex style={{ display: 'flex', alignItems: 'center' }}>
            <el-popover title="列配置" key="12" trigger="click" width="200" show-arrow={false}>
              {{
                reference: <el-icon name="Setting" size="18px" />,
                default: () => {
                  return (
                    <div>
                      <el-checkbox-group
                        onChange={(value) => {
                          attrs.setValue(value);
                        }}
                      >
                        {_.map(props.columns, (item) => (
                          <el-checkbox
                            label={item.label}
                            value={item.prop}
                            checked={props.value?.includes?.(item.prop)}
                          />
                        ))}
                      </el-checkbox-group>
                    </div>
                  );
                },
              }}
            </el-popover>
          </el-flex>
        </div>
      );
    },
  };
}
