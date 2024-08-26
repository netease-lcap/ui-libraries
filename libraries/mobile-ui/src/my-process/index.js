import _debounce from 'lodash/debounce';
import dayjs from '../utils/dayjs';
import { createNamespace } from '../utils';

import Tabs from '../tabs';
import Tab from '../tab';
import PullRefresh from '../pull-refresh';
import List from '../list';
import Iconv from '../iconv';

import Toolbar from './toolbar';

import mockData from './mock';

const [createComponent, bem, t] = createNamespace('my-process');

export default createComponent({
  data() {
    return {
      currentTab: 'myPendingTaskList',

      myPendingTaskList: [],
      myPendingTaskListTotal: 0,
      myPendingTaskListFinished: false,
      myPendingTaskListRefresh: false,
      myPendingTaskListFilter: {
        procDefKey: null,
        procInstInitiator: null,
        procInstStartTimeAfter: null, // 开始时间
        procInstStartTimeBefore: null, // 结束时间

        page: 1,
        size: 5,
      },

      myCompletedTaskList: [],
      myCompletedTaskListTotal: 0,
      myCompletedTaskListFinished: false,
      myCompletedTaskListFilter: {
        procDefKey: null,
        procInstInitiator: null,
        procInstStartTimeAfter: null, // 开始时间
        procInstStartTimeBefore: null, // 结束时间

        page: 1,
        size: 5,
      },

      myLaunchList: [],
      myLaunchListTotal: 0,
      myLaunchListFinished: false,
      myLaunchListFilter: {
        procDefKey: null,

        procInstStartTimeAfter: null, // 开始时间
        procInstStartTimeBefore: null, // 结束时间

        page: 1,
        size: 5,
      },
    };
  },

  created() {
    location.search
      .replace('?', '')
      .split('&')
      .forEach((item) => {
        const [key, value] = item.split('=');
        if (key === 'taskId') {
          this.taskId = value;
        }
      });
  },

  methods: {
    async fetchData(type) {
      const typeMap = {
        myPendingTaskList: 'getMyPendingTasks',
        myCompletedTaskList: 'getMyCompletedTasks',
        myLaunchList: 'getMyInitiatedTasks',
      };

      const filter = this[`${type}Filter`];
      const { page, size, ...rest } = filter;

      let result = {
        list: [],
        total: 0,
      };

      const body = {
        taskId: this.taskId,
        page,
        size,
      };
      Object.keys(rest).forEach((key) => {
        if (rest[key]) {
          body[key] = rest[key];
        }
      });

      if (this.inDesigner() || this.isDev()) {
        return {
          list: mockData[type].slice((page - 1) * size, page * size),
          total: mockData[type].length,
        };
      };

      const { data } = await this.$processV2?.getMyTaskList({
        path: {
          taskType: typeMap[type],
        },
        body,
      });

      result = data;

      return result;
    },

    onLoad: _debounce(
      async function (type) {
        if (this[`${type}Refresh`]) return;

        const result = await this.fetchData(type);
        const { list, total } = result;

        this[type].push(...list);
        this[`${type}Total`] = total;
        this[`${type}Finished`] = this[type].length >= total;
        this[`${type}Filter`].page += 1;
      },
      500,
      { leading: true, trailing: false }
    ),

    async reload(type) {
      // 重置分页
      this[`${type}Filter`].page = 1;

      const result = await this.fetchData(type);
      const { list, total } = result;
      this[type] = list;
      this[`${type}Total`] = total;
      this[`${type}Finished`] = this[type].length >= total;
      this[`${type}Filter`].page += 1;
      this[`${type}Refresh`] = false;
    },

    onToolbarChange(fields, tab) {
      if (this.currentTab === tab) {
        Object.assign(this[`${tab}Filter`], fields);

        this.reload(tab);
      }
    },

    async onGotoDetail(taskId) {
      const result = await this.$processV2?.getTaskDestinationUrl({
        body: {
          taskId,
        },
      });
      const url = window.location.origin + result.data;
      window.location.href = url;
    },

    // 筛选工具区
    toolbarRender() {
      return <Toolbar tab={this.currentTab} onChange={this.onToolbarChange} />;
    },

    cardRender(data) {
      const {
        taskId,
        procInstTitle: title,
        procDefTitle: type,
        procInstCurrNodes: currentNodeList,
        procInstInitiator: initiator,
        procInstStartTime: startTime,
      } = data || {};

      const nodes = (currentNodeList || []).map((item) => item.currNodeTitle).join('，');
      const assignees = (currentNodeList || []).map((item) => (item.currNodeParticipants || []).join('，')).join('，');

      return (
        <div class={bem('item-card')} onClick={() => this.onGotoDetail(taskId)}>
          <div class={bem('item-card-title')}>
            <div class={bem('item-card-title-text')}>{title}</div>
            <Iconv class={bem('item-card-title-icon')} name="right-arrow" size={12} icotype="only"></Iconv>
          </div>

          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('type')}</div>
            <div class={bem('item-card-content')}>{type || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('currentNode')}</div>
            <div class={bem('item-card-content')}>{nodes || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('currentAssignee')}</div>
            <div class={bem('item-card-content')}>{assignees || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('initiator')}</div>
            <div class={bem('item-card-content')}>{initiator || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('startTime')}</div>
            <div class={bem('item-card-content')}>{dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
      );
    },
  },

  render() {
    return (
      <div class={bem()} value={this.currentTab} vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        <Tabs vModel={this.currentTab}>
          <Tab title={t('todo')} name="myPendingTaskList">
            {this.toolbarRender()}
            <PullRefresh
              vModel={this.myPendingTaskListRefresh}
              onRefresh={() => this.reload('myPendingTaskList')}
            >
              <List
                class={bem('list-view')}
                onLoad={() => this.onLoad('myPendingTaskList')}
                offset={50}
                finished={this.myPendingTaskListFinished}
              >
                {this.myPendingTaskList.map((item) => {
                  return this.cardRender(item);
                })}

                {!this.myPendingTaskList.length ? (
                  <div class={bem('list-view-empty')}>{t('empty')}</div>
                ) : null}
              </List>
            </PullRefresh>
          </Tab>
          <Tab title={t('done')} name="myCompletedTaskList">
            {this.toolbarRender()}
            <PullRefresh
              vModel={this.myCompletedTaskListRefresh}
              onRefresh={() => this.reload('myCompletedTaskList')}
            >
              <List
                class={bem('list-view')}
                onLoad={() => this.onLoad('myCompletedTaskList')}
                offset={50}
                finished={this.myCompletedTaskListFinished}
              >
                {this.myCompletedTaskList.map((item) => {
                  return this.cardRender(item);
                })}

                {!this.myCompletedTaskList.length ? (
                  <div class={bem('list-view-empty')}>{t('empty')}</div>
                ) : null}
              </List>
            </PullRefresh>

          </Tab>
          <Tab title={t('initiate')} name="myLaunchList">
            {this.toolbarRender()}
            <PullRefresh
              vModel={this.myLaunchListRefresh}
              onRefresh={() => this.reload('myLaunchList')}
            >
              <List
                class={bem('list-view')}
                onLoad={() => this.onLoad('myLaunchList')}
                offset={50}
                finished={this.myLaunchListFinished}
              >
                {this.myLaunchList.map((item) => {
                  return this.cardRender(item);
                })}

                {!this.myLaunchList.length ? (
                  <div class={bem('list-view-empty')}>{t('empty')}</div>
                ) : null}
              </List>
            </PullRefresh>
          </Tab>
        </Tabs>
      </div>
    );
  },
});
