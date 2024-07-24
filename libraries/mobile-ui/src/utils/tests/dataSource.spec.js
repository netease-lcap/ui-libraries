import {
  test,
  expect,
  vi,
} from 'vitest';

import DataSource from '../DataSource/index';

const data = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
  { id: 5, name: 'E' },
  { id: 6, name: 'F' },
  { id: 7, name: 'G' },
  { id: 8, name: 'H' },
  { id: 9, name: 'I' },
  { id: 10, name: 'J' },
  { id: 11, name: 'K' },
  { id: 12, name: 'L' },
  { id: 13, name: 'M' },
  { id: 14, name: 'N' },
  { id: 15, name: 'O' },
  { id: 16, name: 'P' },
  { id: 17, name: 'Q' },
  { id: 18, name: 'R' },
  { id: 19, name: 'S' },
  { id: 20, name: 'T' },
  { id: 21, name: 'U' },
  { id: 22, name: 'V' },
  { id: 23, name: 'W' },
  { id: 24, name: 'X' },
  { id: 25, name: 'Y' },
  { id: 26, name: 'Z' },
];

test('组件开启分页 + 远端数据返回分页数据', async () => {
  const load = (params) => {
    const { page, size } = params;
    return new Promise((resolve) => {
      const start = (page - 1) * size;
      const end = page * size;

      resolve({
        list: data.slice(start, end),
        total: data.length,
      });
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: {
      number: 1,
      size: 20,
    },
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  expect(dataSource.hasMore()).toEqual(true);

  await dataSource.loadMore();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 40)));

  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.reload();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  expect(dataSource.hasMore()).toEqual(true);
});

test('组件开启分页 + 远端数据返回全量数据', async () => {
  const load = (params) => {
    const { page, size } = params;
    return new Promise((resolve) => {
      resolve({
        list: data,
        total: data.length,
      });
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: {
      number: 1,
      size: 20,
    },
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  expect(dataSource.hasMore()).toEqual(true);

  await dataSource.loadMore();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 40)));

  expect(dataSource.hasMore()).toEqual(false);
});

test('组件关闭分页 + 远端数据返回分页数据', async () => {
  const cb = vi.fn();
  const load = (params) => {
    const { page = 1, size = 20 } = params;

    cb();

    return new Promise((resolve) => {
      const start = (page - 1) * size;
      const end = page * size;

      resolve({
        list: data.slice(start, end),
        total: data.length,
      });
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: undefined,
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  // 期待load被触发
  expect(cb).toHaveBeenCalledTimes(1);

  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.loadMore();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  // 期待load被触发
  expect(cb).toHaveBeenCalledTimes(1);

  await dataSource.reload();
  // 期待load被触发
  expect(cb).toHaveBeenCalledTimes(2);
});

test('组件关闭分页 + 远端数据返回全量数据', async () => {
  const cb = vi.fn();
  const load = (params) => {
    const { page, size } = params;
    cb();
    return new Promise((resolve) => {
      resolve({
        list: data,
        total: data.length,
      });
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: undefined,
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data));

  // 期待load被触发
  expect(cb).toHaveBeenCalledTimes(1);

  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.loadMore();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data));

  // 期待load被触发
  expect(cb).toHaveBeenCalledTimes(1);

  await dataSource.reload();

  // 期待load被触发
  expect(cb).toHaveBeenCalledTimes(2);
});

test('组件开启分页 + 远端数据返回数组', async () => {
  const cb = vi.fn();
  const load = () => {
    cb();
    return new Promise((resolve) => {
      resolve(data);
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: {
      number: 1,
      size: 20,
    },
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));
  expect(cb).toHaveBeenCalledTimes(1);
  expect(dataSource.hasMore()).toEqual(true);

  await dataSource.loadMore();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 40)));

  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.reload();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));
  expect(cb).toHaveBeenCalledTimes(2);
});

test('组件关闭分页 + 远端数据返回数组', async () => {
  const cb = vi.fn();
  const load = () => {
    cb();
    return new Promise((resolve) => {
      resolve(data);
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: undefined,
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data));
  expect(cb).toHaveBeenCalledTimes(1);
  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.reload();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data));
  expect(cb).toHaveBeenCalledTimes(2);
});

test('组件开启分页 + 前端数组数据', async () => {
  const dataSource = new DataSource({
    data,
    viewMode: 'more',
    paging: {
      number: 1,
      size: 20,
    },
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  expect(dataSource.hasMore()).toEqual(true);

  await dataSource.loadMore();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 40)));

  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.reload();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data.slice(0, 20)));

  expect(dataSource.hasMore()).toEqual(true);
});

test('组件关闭分页 + 前端数组数据', async () => {
  const dataSource = new DataSource({
    data,
    viewMode: 'more',
    paging: undefined,
  });

  await dataSource.load();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data));

  expect(dataSource.hasMore()).toEqual(false);

  await dataSource.reload();
  expect(JSON.stringify(dataSource.viewData)).toEqual(JSON.stringify(data));

  expect(dataSource.hasMore()).toEqual(false);
});

test('加载全量数据', async () => {
  const cb = vi.fn();
  const load = (params) => {
    const { page, size } = params;
    cb();
    return new Promise((resolve) => {
      const start = (page - 1) * size;
      const end = page * size;

      resolve({
        list: data.slice(start, end),
        total: data.length,
      });
    });
  };
  const dataSource = new DataSource({
    load,
    viewMode: 'more',
    paging: {
      number: 1,
      size: 20,
    },
    needAllData: true,
  });

  await dataSource.load();
  expect(cb).toHaveBeenCalledTimes(2);

  expect(dataSource.allData.length).toEqual(data.length);

  expect(dataSource.hasMore()).toEqual(true);

  await dataSource.loadMore();
  expect(cb).toHaveBeenCalledTimes(3);

  await dataSource.reload();
  expect(cb).toHaveBeenCalledTimes(5);
});
