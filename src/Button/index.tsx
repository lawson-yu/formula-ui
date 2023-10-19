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

export { Props as ButtonProps}

const Button: FC<Props> = (props) => {
  const { className, children, icon, disabled, onClick } = props;

  const handleBtnClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div className={cn(styles.btn, className)} onClick={handleBtnClick}>
      {icon}
      {children ?? '按钮'}
    </div>
  );
};

export default Button;
