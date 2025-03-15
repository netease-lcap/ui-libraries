import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { $deletePropsList } from '@/plugins/constants';

export * from './ide';

 export function handleConfigProvider(props) {
  const Component = props.get('render');
  const render = (props, { attrs, slots }) => {
    return (
      <ElConfigProvider locale={zhCn}>
        <Component {...props} {...attrs} v-slots={slots} />
      </ElConfigProvider>
    );
  };
  render.inheritAttrs = false;
  return {
    render,
  };
}
