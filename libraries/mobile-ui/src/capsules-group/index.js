import { createNamespace } from '../utils';

const [createComponent, bem] = createNamespace('capsules-group');

export default createComponent({
  methods: {
    renderSlots() {
      if (this.inDesigner() && !this.slots()) {
        return (
          <div style="text-align: center; height: 40px; line-height: 40px; width:100vw; background: #eceff7">
            选中组件，点击“+”添加组件
          </div>
        );
      }
      return this.slots();
    }
  },
  render() {
    return <div class={bem()}>{this.renderSlots()}</div>;
  }
});
