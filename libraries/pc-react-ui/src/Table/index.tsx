import React from 'react';
import { Table } from 'antd';

const withIDE = (Component: React.ElementType) => {
  return React.forwardRef((props, ref) => {
    // TODO IDE 适配逻辑写在这...
    return (
      <Component
        {...props}
        ref={ref}
      />
    );
  });
};

const ButtonHoc = withIDE(Table);

export default ButtonHoc;
