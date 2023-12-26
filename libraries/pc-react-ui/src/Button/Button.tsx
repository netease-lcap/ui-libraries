// eslint-disable-next-line import/no-extraneous-dependencies
import React, { FC, HTMLAttributes } from 'react';
import './button.css';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: FC<ButtonProps> = ({
  primary, backgroundColor, size, label, ...rest
}) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      {...rest}
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor ? { backgroundColor } : {}}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: '',
  label: '',
  primary: false,
  size: 'medium',
};
