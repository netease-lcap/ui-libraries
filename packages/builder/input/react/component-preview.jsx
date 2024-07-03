/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.css';

function ComponentPreview(props) {
  const {
    demo,
    actived = false,
    title,
    name,
    ...rest
  } = props;

  return (
    <div {...rest} id={name} className={[styles.sectionContainer, actived ? styles.selected : ''].join(' ').trim()}>
      <div className={styles.sectionTitle}>
        {title}
      </div>
      <hr style={{ margin: 0 }} />
      <div className={styles.sectionBody}>
        {demo}
      </div>
    </div>
  );
}

export default ComponentPreview;
