import _ from 'lodash';

export function tableToolBarPlugin(props) {
  const tableSlots = props.get('tableSlots');
  const defaultSlotProps = _.flatMap(_.attempt(tableSlots?.default) as Array<any>, (node) => (node.type.name === 'ElTableColumn' ? [{ ...node.props }] : []));
  return {
    defaultSlotProps,
    tableSlots,
    render: (props, { attrs }) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div />
          <el-flex style={{ display: 'flex', alignItems: 'center' }}>
            <el-icon name="Refresh" size="18px" />
            <el-popover title="列配置" trigger="click" width="200" show-arrow={false}>
              {{
                reference: <el-icon name="Setting" size="18px" />,
                default: () => {
                  return (
                    <div>
                      <el-checkbox-group
                        onChange={(value) => {
                          console.log(value, 'value');
                          attrs.setValue(value);
                        }}
                      >
                        {_.map(props.defaultSlotProps, (item) => (
                          <el-checkbox label={item.label} value={item.prop} checked={!item.hidden} />
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
