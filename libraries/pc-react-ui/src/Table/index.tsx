import React from 'react';
import { Table } from 'antd';

const withIDE = (Component: React.ElementType) => {
  return React.forwardRef((props, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
      />
    );
  });
};

const TableHoc = withIDE(Table);

export default TableHoc;
