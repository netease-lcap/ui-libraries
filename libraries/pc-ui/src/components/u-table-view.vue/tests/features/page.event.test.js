import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';

import { mount } from '@vue/test-utils';

import { UTableView } from '../../index.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const baseData = [
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

const load = () => {
  // 这里使用 Promise 和 setTimeout 模拟一个后端请求
  const remoteData = [];
  for (let i = 0; i < 75; i++) {
    const item = { ...baseData[i % 5] };
    item.name += `-${i}`;
    item.phone = String(+item.phone + i);
    item.createdTime += i * 1000 * 3600 * 24;
    item.loginTime += i * 1000 * 3600 * 24;
    remoteData.push(item);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(remoteData);
    }, 16);
  });
};

describe('u-table-view.vue events test', () => {
  it('should $emit page & beforePage', async () => {
    const handlePage = jest.fn();
    const handleBeforePage = jest.fn();

    const wrapper = mount(UTableView, {
      propsData: {
        dataSource: load,
        valueField: 'name',
        pagination: true,
      },
      slots: {
        default: `<u-table-view-column type="radio" title="选择" width="8%"></u-table-view-column>
                    <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
                    <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
                    <u-table-view-column title="地址" field="address"></u-table-view-column>
                    <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>`,
      },
    });

    wrapper.vm.$on('before-page', handleBeforePage);
    wrapper.vm.$on('page', handlePage);

    await sleep(16);

    const pagination = wrapper.findComponent({ name: 'UPagination' });
    expect(pagination.exists()).toBe(true);
    pagination.vm.select(3);

    await sleep(16);

    expect(handlePage).toBeCalled();
    expect(handleBeforePage).toBeCalled();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('before-page')[0][0].size).toEqual(20);
      expect(wrapper.emitted('before-page')[0][0].number).toEqual(3);
      expect(wrapper.emitted('page')[0][0].size).toEqual(20);
      expect(wrapper.emitted('page')[0][0].number).toEqual(3);
    });
  });
});
