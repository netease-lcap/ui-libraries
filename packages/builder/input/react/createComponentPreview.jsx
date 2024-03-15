/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import styles from './index.module.css';

export default (stories) => {
  const ComponentPreview = ({ componentNames }) => {
    const visibleStories = useMemo(() => {
      if (!componentNames || componentNames.length === 0) {
        return stories;
      }

      return stories.filter((c) => componentNames.includes(c.name));
    }, [componentNames]);

    return (
      <div className={styles.componentPreview}>
        {
          visibleStories.map((c) => (
            <div className={[styles.componentCard, 'cw-nasl', 'cw-card'].join(' ')}>
              <div className={styles.componentCardTitle}>
                {c.title || c.name}
              </div>
              <div className={styles.componentCardBody}>
                <c.demo />
              </div>
            </div>
          ))
        }
      </div>
    );
  };

  return ComponentPreview;
};
