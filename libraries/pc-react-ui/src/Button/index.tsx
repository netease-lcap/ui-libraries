import React from 'react';
import { Button } from './Button';

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

const ButtonHoc = withIDE(Button);

export default ButtonHoc;
