import { defineComponent, ref, watch, toRefs } from 'vue';
import { ElCheckboxGroup, ElButton, ElIcon, ElFlex, ElPopover } from '@/index';

export const ElTableToolBar = defineComponent({
  name: 'TableToolBar',
  props: {
    columns: {
      type: Array<{
        prop: string;
        header?: () => string;
        label: string;
      }>,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { columns, value } = toRefs(props);
    const selectedValue = ref([]);
    const visible = ref(false);
    selectedValue.value = value.value as any;
    watch(value, (newVal) => {
      selectedValue.value = newVal as any;
    });
    return () => {
      return (
        <ElFlex
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '16px 0',
          }}
        >
          <ElPopover visible={visible.value} title="列配置" key="12" trigger="click" width="200" show-arrow={false}>
            {{
              reference: (
                <ElIcon
                  name="Setting"
                  onClick={() => {
                    visible.value = true;
                  }}
                  size="18px"
                />
              ),
              default: () => {
                return (
                  <div>
                    <ElCheckboxGroup
                      direction="vertical"
                      dataSource={columns.value}
                      valueField="prop"
                      modelValue={selectedValue.value}
                      onChange={(changeValue) => {
                        selectedValue.value = changeValue as any;
                      }}
                    >
                      {{
                        item: ({ item }) => {
                          return <div>{item.header?.() ?? item.label}</div>;
                        },
                      }}
                    </ElCheckboxGroup>
                    <ElFlex
                      justify="center"
                      style={{ borderTop: '1px solid #e5e5e5', marginTop: '12px', paddingTop: '12px' }}
                    >
                      <ElButton
                        size="small"
                        text="确定"
                        onClick={() => {
                          props.onChange(selectedValue.value);
                          visible.value = false;
                        }}
                      />
                      <ElButton
                        size="small"
                        text="取消"
                        type="primary"
                        onClick={() => {
                          selectedValue.value = value.value as any;
                          visible.value = false;
                        }}
                      />
                    </ElFlex>
                  </div>
                );
              },
            }}
          </ElPopover>
        </ElFlex>
      );
    };
  },
});
