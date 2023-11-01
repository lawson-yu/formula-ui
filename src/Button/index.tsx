import cn from 'classnames';
import React, { FC, ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  /**
   * @description 按钮内容
   * @type ReactNode
   * @default 按钮
   */
  children?: ReactNode;
  /**
   * @description 按钮ClassName
   * @type string
   */
  className?: string;
  /**
   * @description 按钮Style
   * @type React.CSSProperties
   */
  style?: React.CSSProperties;
  /**
   * @description icon
   * @type ReactNode | undefined
   */
  icon?: ReactNode | undefined;
  /**
   * @description 是否禁用按钮
   * @type boolean
   */
  disabled?: boolean;
  /**
   * @description 点击事件
   * @type () => void
   */
  onClick?: () => void;
}

const Button: FC<Props> = (props) => {
  const { className, style, children, icon, disabled, onClick } = props;

  const handleBtnClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div
      className={cn(styles.btn, className)}
      style={style}
      onClick={handleBtnClick}
    >
      {icon}
      {children ?? '按钮'}
    </div>
  );
};

export default Button;
export type { Props as ButtonProps };
