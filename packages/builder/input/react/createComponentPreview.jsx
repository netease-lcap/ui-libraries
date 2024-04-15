/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import { ComponentWrap } from 'virtual:lcap-theme-preview-wrap.js';
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
              group: it ? it.group : '',
            };
          }
          return c;
        }).sort((a, b) => {
          const sortValueA = `${a.group || ''}-${a.name}`;
          const sortValueb = `${b.group || ''}-${b.name}`;
          return sortValueA.localeCompare(sortValueb);
        });
      }

      return stories.filter((c) => componentNames.includes(c.name)).map((c) => {
        if (window.THEME_INFO && window.THEME_INFO.components) {
          const it = window.THEME_INFO.components.find((tc) => tc.name.toLowerCase() === c.name.toLowerCase());
          return {
            ...c,
            title: it ? it.title : '',
            group: it ? it.group : '',
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
            <ComponentWrap
              name={c.name}
              title={c.title}
              key={c.name}
              actived={c.name === activeName}
              demo={<c.demo />}
              onClick={() => handleClick(c.name)}
            />
          ))
        }
      </div>
    );
  };

  return ComponentPreview;
};
