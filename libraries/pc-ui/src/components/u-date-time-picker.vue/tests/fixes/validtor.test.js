import {
  test,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';

test('test validator getValue', async () => {
  const wrapper = mount({
    data() {
      return {
        startDate: '',
        endData: '',
      };
    },
    template: `<u-validator ref="validator" label="日期选择" rulee="required">
    <u-date-time-picker range converter="format" :startDate="startDate" :endDate="endDate" clearable></u-date-time-picker>
    </u-validator>`,
  });

  await wrapper.vm.$nextTick();

  expect(wrapper.vm.$refs.validator.value).toBe('');

  wrapper.vm.startDate = '2024-04-01 12:00:00';
  wrapper.vm.endDate = '2024-04-10 12:00:00';

  await wrapper.vm.$nextTick();

  expect(wrapper.vm.$refs.validator.value).toEqual([
    '2024-04-01 12:00:00',
    '2024-04-10 12:00:00',
  ]);
});
