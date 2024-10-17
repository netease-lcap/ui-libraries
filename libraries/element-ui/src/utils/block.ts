export const blockDecorator = () => ({
  provide() {
    return {
      VUE_APP_DESIGNER: true,
    };
  },
  template: '<div style="width: 500px;"><story/></div>',
});
