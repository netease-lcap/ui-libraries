import React from 'react';
import styles from './index.module.css';

function createStoriesPreview(stories) {
  const demos = [];

  Object.keys(stories || {}).forEach((key) => {
    if (key === 'default' || !stories[key] || !stories[key].render) {
      return;
    }

    const PreiveNode = stories[key].render(stories[key].args || {}, { argTypes: [] });

    if (PreiveNode) {
      demos.push(PreiveNode);
    }
  });

  return () => (<div className={styles.storiesPreview}>{demos}</div>);
}

export default createStoriesPreview;
