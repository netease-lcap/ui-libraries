import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';

import { mount } from '@vue/test-utils';

import URadio from '../../../u-radios.vue/radio.vue';
import UCheckBox from '../../../u-checkbox.vue/index.vue';

import { UTableView } from '../../index.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('u-table-view.vue events test', () => {
  it('should type radio column $emit change', async () => {
    const handleChange = jest.fn();

    const dataSource = [
      {
        name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000,
      },
      {
        name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000,
      },
      {
        name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000,
      },
      {
        name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000,
      },
      {
        name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000,
      },
    ];
    const wrapper = mount(UTableView, {
      propsData: {
        dataSource,
        valueField: 'name',
      },
      slots: {
        default: `<u-table-view-column type="radio" title="选择" width="8%"></u-table-view-column>
                  <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
                  <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
                  <u-table-view-column title="地址" field="address"></u-table-view-column>
                  <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>`,
      },
    });
    wrapper.vm.$on('change', handleChange);

    await sleep(16);

    const index = 2;
    const uRadio = wrapper.findAllComponents(URadio).at(index);
    expect(uRadio.exists()).toBe(true);

    const label = uRadio.find('label');
    label.trigger('click');

    // watch 后 emit事件，需要放到nextTick中
    wrapper.vm.$nextTick(() => {
      expect(handleChange).toBeCalled();
      expect(wrapper.vm.selectedItem).toEqual(dataSource[index]);
      expect(wrapper.emitted('change')[0][0].value).toEqual(dataSource[index].name);
      expect(wrapper.emitted('change')[0][0].item).toEqual(dataSource[index]);
      expect(wrapper.emitted('change')[0][0].oldValue).toEqual(undefined);
      expect(wrapper.emitted('change')[0][0].oldItem).toEqual(undefined);

      const index1 = 3;
      const uRadio1 = wrapper.findAllComponents(URadio).at(index1);
      expect(uRadio1.exists()).toBe(true);

      const label1 = uRadio.find('label');
      label1.trigger('click');

      wrapper.vm.$nextTick(() => {
        expect(handleChange).toBeCalled();
        expect(wrapper.vm.selectedItem).toEqual(dataSource[index1]);
        expect(wrapper.emitted('change')[0][0].value).toEqual(dataSource[index1].name);
        expect(wrapper.emitted('change')[0][0].item).toEqual(dataSource[index1]);
        expect(wrapper.emitted('change')[0][0].oldValue).toEqual(dataSource[index].name);
        expect(wrapper.emitted('change')[0][0].oldItem).toEqual(dataSource[index]);
      });
    });
  });

  it('should selectable $emit change', async () => {
    const handleChange = jest.fn();

    const dataSource = [
      {
        name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000,
      },
      {
        name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000,
      },
      {
        name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000,
      },
      {
        name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000,
      },
      {
        name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000,
      },
    ];
    const wrapper = mount(UTableView, {
      propsData: {
        dataSource,
        valueField: 'name',
        selectable: true,
        value: '',
      },
      slots: {
        default: `
                  <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
                  <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
                  <u-table-view-column title="地址" field="address"></u-table-view-column>
                  <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>`,
      },
    });
    wrapper.vm.$on('change', handleChange);

    await sleep(16);

    console.log(wrapper.vm.selectedItem);

    const index = 2;
    const row = wrapper.findAll('tr').at(index + 1);
    expect(row.exists()).toBe(true);

    row.trigger('click');

    // watch 后 emit事件，需要放到nextTick中
    wrapper.vm.$nextTick(() => {
      expect(handleChange).toBeCalled();
      expect(wrapper.vm.selectedItem).toEqual(dataSource[index]);
      expect(wrapper.emitted('change')[0][0].value).toEqual(dataSource[index].name);
      expect(wrapper.emitted('change')[0][0].item).toEqual(dataSource[index]);
      expect(wrapper.emitted('change')[0][0].oldValue).toEqual(undefined);
      expect(wrapper.emitted('change')[0][0].oldItem).toEqual(undefined);

      const index1 = 3;
      const row1 = wrapper.findAll('tr').at(index + 1);
      expect(row1.exists()).toBe(true);
      row1.trigger('click');

      wrapper.vm.$nextTick(() => {
        expect(handleChange).toBeCalled();
        expect(wrapper.vm.selectedItem).toEqual(dataSource[index1]);
        expect(wrapper.emitted('change')[0][0].value).toEqual(dataSource[index1].name);
        expect(wrapper.emitted('change')[0][0].item).toEqual(dataSource[index1]);
        expect(wrapper.emitted('change')[0][0].oldValue).toEqual(dataSource[index].name);
        expect(wrapper.emitted('change')[0][0].oldItem).toEqual(dataSource[index]);
      });
    });
  });
  it('should type checkbox column $emit change', async () => {
    const handleChange = jest.fn();

    const dataSource = [
      {
        name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000,
      },
      {
        name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000,
      },
      {
        name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000,
      },
      {
        name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000,
      },
      {
        name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000,
      },
    ];
    const wrapper = mount(UTableView, {
      propsData: {
        dataSource,
        valueField: 'name',
      },
      slots: {
        default: `<u-table-view-column type="checkbox" title="选择" width="8%"></u-table-view-column>
                    <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
                    <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
                    <u-table-view-column title="地址" field="address"></u-table-view-column>
                    <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>`,
      },
    });
    wrapper.vm.$on('check', handleChange);

    await sleep(16);

    const index = 2;
    const uCheckboxs = wrapper.findAllComponents(UCheckBox);
    const uCheckbox = uCheckboxs.at(index);
    expect(uCheckbox.exists()).toBe(true);

    await uCheckbox.vm.check();

    // wrapper.vm.$nextTick(async () => {
    //   expect(handleChange).toBeCalled();
    //   expect(wrapper.vm.currentValues).toEqual(['小明']);

    //   await sleep(32);

    //   expect(wrapper.emitted('change')[0][0].values).toEqual(['小明']);
    //   expect(wrapper.emitted('change')[0][0].oldValues).toEqual([]);
    //   // expect(wrapper.emitted('change')[0][0].items).toEqual([dataSource[index - 1]]);

    //   const index1 = 3;
    //   const uCheckboxs1 = wrapper.findAllComponents(UCheckBox);
    //   const uCheckbox1 = uCheckboxs1.at(index1);
    //   expect(uCheckbox1.exists()).toBe(true);

    //   await uCheckbox.vm.check();

    //   wrapper.vm.$nextTick(async () => {
    //     expect(handleChange).toBeCalled();
    //     expect(wrapper.vm.currentValues).toEqual(['小明', '李四']);

    //     await sleep(32);

    //     expect(wrapper.emitted('change')[0][0].values).toEqual(['小明', '李四']);
    //     expect(wrapper.emitted('change')[0][0].oldValues).toEqual(['小明']);
    //     // expect(wrapper.emitted('change')[0][0].items).toEqual([dataSource[index - 1], dataSource[index1 - 1]]);
    //   });
    // });
  });
});
