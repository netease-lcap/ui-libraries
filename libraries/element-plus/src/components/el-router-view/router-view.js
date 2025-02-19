import { h, resolveComponent } from 'vue';

export default {
  name: 'ElRouterView',
  setup(props) {
    return () => h(resolveComponent('router-view'), {
      class: 'el-router-view',
    });
  },
};
