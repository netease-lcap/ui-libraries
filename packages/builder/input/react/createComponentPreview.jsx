/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import styles from './index.module.css';

export default (stories) => {
  const ComponentPreview = ({ componentNames, onActive }) => {
    const [activeName, setActiveName] = useState('');
    const visibleStories = useMemo(() => {
      if (!componentNames || componentNames.length === 0) {
        return stories.map((c) => {
          if (window.THEME_INFO && window.THEME_INFO.components) {
            const it = window.THEME_INFO.components.find((tc) => tc.name.toLowerCase() === c.name.toLowerCase());
            return {
              ...c,
              title: it ? it.title : '',
            };
          }
          return c;
        });
      }

      return stories.filter((c) => componentNames.includes(c.name)).map((c) => {
        if (window.THEME_INFO && window.THEME_INFO.components) {
          const it = window.THEME_INFO.components.find((tc) => tc.name.toLowerCase() === c.name.toLowerCase());
          return {
            ...c,
            title: it ? it.title : '',
          };
        }
        return c;
      });
    }, [componentNames]);

    const handleClick = (name) => {
      setActiveName(name);
      // eslint-disable-next-line no-unused-expressions
      onActive && onActive(name);
    };

    useEffect(() => {
      const handleMessage = (e) => {
        if (!e.data) {
          return;
        }

        const { from, type, data } = e.data;
        if (from !== 'lcap' || type !== 'scrollToComponent') {
          return;
        }

        setActiveName(data);
      };

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);

    useEffect(() => {
      const element = document.getElementById(activeName);
      if (!element) {
        return;
      }

      element.scrollIntoView();
    }, [activeName]);

    return (
      <div className={styles.componentPreview}>
        {
          visibleStories.map((c) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              id={c.name}
              className={[styles.componentCard, 'cw-nasl', 'cw-card', activeName === c.name ? styles.active : ''].join(' ')}
              key={c.name}
              onClick={() => handleClick(c.name)}
            >
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
