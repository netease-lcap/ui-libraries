export default {
  title: 'VanAbsoluteLayout/自由布局',
  component: () => import('../index.tsx'),
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `
      <van-absolute-layout style="height: 400px; border: 1px solid #ddd;">
        <div style="position: absolute; top: 50px; left: 50px; width: 100px; height: 60px; background: #1989fa; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">元素1</div>
        <div style="position: absolute; top: 150px; right: 50px; width: 100px; height: 60px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">元素2</div>
        <div style="position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); width: 120px; height: 60px; background: #ff976a; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">元素3</div>
      </van-absolute-layout>
    `,
  }),
};

export const Complex = {
  name: '复杂布局',
  render: () => ({
    template: `
      <van-absolute-layout style="height: 500px; border: 1px solid #ddd; background: #f5f5f5;">
        <div style="position: absolute; top: 20px; left: 20px; width: 150px; height: 80px; background: #1989fa; color: white; padding: 10px; border-radius: 8px;">
          <h3 style="margin: 0; font-size: 14px;">标题区域</h3>
          <p style="margin: 5px 0 0 0; font-size: 12px;">这是一个标题区域</p>
        </div>
        <div style="position: absolute; top: 20px; right: 20px; width: 100px; height: 40px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 20px; cursor: pointer;">按钮</div>
        <div style="position: absolute; top: 120px; left: 20px; right: 20px; height: 200px; background: white; border-radius: 8px; border: 1px solid #e5e5e5; padding: 20px; box-sizing: border-box;">
          <h4 style="margin: 0 0 10px 0; color: #333;">内容区域</h4>
          <p style="margin: 0; color: #666; line-height: 1.5;">这是一个内容区域，可以放置任何内容。在自由布局中，所有元素都可以通过绝对定位来自由摆放位置。</p>
        </div>
        <div style="position: absolute; bottom: 20px; left: 20px; width: 80px; height: 80px; background: #ff976a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">圆形</div>
        <div style="position: absolute; bottom: 20px; right: 20px; width: 120px; height: 40px; background: #f2637b; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">底部元素</div>
      </van-absolute-layout>
    `,
  }),
};
