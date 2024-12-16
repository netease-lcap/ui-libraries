import React, { CSSProperties, FC, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import styles from './index.module.less';


export interface {{compName}}Props {
  style?: CSSProperties;
  className?: string;
}

const {{compName}}: FC<{{compName}}Props> = (props) => {
  const {
    style,
    className,
    ...rest
  } = props;

  const rootClassName = useMemo(() => {
    return [
      styles.{{compName}},
      className || ''
    ].join(' ').trim();
  }, [className]);

  return (
    <div
      {...rest}
      style={style}
      className={rootClassName}
    >
      Hello word
    </div>
  );
}

export default withErrorBoundary({{compName}}, {
  fallback: (<div>{{compName}} render error</div>),
});
