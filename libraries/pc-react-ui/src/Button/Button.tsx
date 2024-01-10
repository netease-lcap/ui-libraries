// eslint-disable-next-line import/no-extraneous-dependencies
import React, { FC, HTMLAttributes } from 'react';
import styles from './button.module.css';

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
  const mode = primary ? styles['storybook-button'] : styles['storybook-button--secondary'];
  return (
    <button
      {...rest}
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].map((s) => styles[s]).join(' ')}
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
