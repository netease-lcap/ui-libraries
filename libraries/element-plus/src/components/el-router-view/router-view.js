import { h } from 'vue';

export default {
  name: 'ElRouterView',
  setup(props) {
    return () => h('router-view', {
      class: 'el-router-view',
    });
  },
};
