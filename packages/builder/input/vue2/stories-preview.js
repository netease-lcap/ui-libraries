import styles from './index.module.css';

function createStoriesPreview(stories) {
  const demos = [];

  Object.keys(stories || {}).forEach((key) => {
    if (key === 'default' || !stories[key] || !stories[key].render) {
      return;
    }

    const Component = stories[key].render(stories[key].args || {}, { argTypes: [] });

    if (Component) {
      demos.push(Component);
    }
  });

  return {
    inheritAttrs: false,
    functional: true,
    render: (h) => {
      return h('div', {
        class: styles.storiesPreview,
      }, demos.map((demo) => h(demo)));
    },
  };
}

export default createStoriesPreview;
