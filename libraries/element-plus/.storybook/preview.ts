import { type Preview, setup } from '@storybook/vue3';
import ElementPlus from '../src/index';

setup((app) => {
  app.use(ElementPlus);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 全局参数，所有 story 都可以访问
    globalConfig: {
      apiBaseUrl: 'https://api.example.com',
      theme: 'light',
      locale: 'zh-CN',
      asyncData: (time = 0) => {
        return async () =>
          new Promise((res) => {
            setTimeout(() => {
              res(
                new Array(10).fill(0).map((item, i) => {
                  return {
                    index: i + 1,
                    value: i + 1,
                    applicant: ['贾明', '张三', '王芳'][i % 3],
                    status: i % 3,
                    label: ['电子签署', '纸质签署', '纸质签署'][i % 3],
                    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
                    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
                    time: [2, 3, 1, 4][i % 4],
                    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
                    applyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
                    modifyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
                    confirmTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
                  };
                }),
              );
            }, time);
          });
      },
      dataSource: () => {
        return new Array(10).fill(0).map((item, i) => {
          return {
            index: i + 1,
            value: i + 1,
            applicant: ['贾明', '张三', '王芳'][i % 3],
            status: i % 3,
            label: ['电子签署', '纸质签署', '纸质签署'][i % 3],
            email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
            matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
            time: [2, 3, 1, 4][i % 4],
            createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            applyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            modifyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            confirmTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
          };
        });
      },
    },
  },
};

export default preview;
