import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';
  import { mount } from '@vue/test-utils';

import ValueFieldDemo from './__demos__/valueField.vue';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('u-list-view.vue', () => {
    it('valueField取得的值是0', async () => {
        const wrapper = mount(ValueFieldDemo);
        await sleep(16);

        const rows = wrapper.findAll('div[index]');
        expect(rows.length).toBe(2);

        const rows0 = rows.at(0);
        expect(rows0.exists()).toBe(true);
        rows0.trigger('click');
        expect(wrapper.vm.value).toBe(0);

        const rows1 = rows.at(1);
        expect(rows1.exists()).toBe(true);
        rows1.trigger('click');
        expect(wrapper.vm.value).toBe('c');
    });
});