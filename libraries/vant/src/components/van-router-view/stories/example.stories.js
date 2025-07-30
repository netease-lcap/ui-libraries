export default {
  title: 'VanRouterView/子页面容器',
  component: () => import('../index.ts'),
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `
      <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0; color: #333;">子页面容器示例</h3>
        <van-router-view style="min-height: 200px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #666;">
          <div>此容器为子页面呈现占位，可在子页面编辑内容</div>
        </van-router-view>
        <p style="margin: 16px 0 0 0; font-size: 12px; color: #999;">
          注：在实际应用中，此容器会显示匹配到的路由组件内容
        </p>
      </div>
    `,
  }),
}; 