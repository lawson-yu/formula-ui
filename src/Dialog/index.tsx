/* eslint-disable @typescript-eslint/no-use-before-define */
import type { FormInstance, ModalFuncProps } from 'antd';
import { Form, Modal, Row, Spin } from 'antd';
import classNames from 'classnames';
import React, {
  FC,
  cloneElement,
  createRef,
  isValidElement,
  useState,
} from 'react';
import styles from './index.module.scss';

type Callback = (
  values: Record<string, any>,
  hide: () => void,
  core: FormInstance,
) => void;

interface Props extends ModalFuncProps {
  /**
   * @description 是否展示加载中
   * @type boolean
   */
  spin?: boolean;
  /**
   * @description 点击确认按钮的回调
   * @type Callback
   */
  onOk?: Callback;
  /**
   * @description 点击取消按钮的文案
   * @type Callback
   */
  onCancel?: Callback;
  /**
   * @description 是否是表单内容
   * @type boolean
   */
  isFormCont?: boolean;
}

const isForm = (item: any) => item?.type === Form;

//@ts-ignore
const Dialog: FC<Props> = (props) => {
  const {
    title,
    content,
    okText = '确认',
    cancelText = '取消',
    onCancel,
    onOk,
    okButtonProps = {},
    isFormCont,
    spin,
    ...rest
  } = props;

  const ref = createRef<FormInstance>();

  const Content = () => {
    const [loading, setLoading] = useState(false);

    return (
      <Spin tip="处理中..." spinning={loading}>
        <div className={classNames(styles.dialog)}>
          <div className={styles.titleBar}>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.contWrap}>
            {isValidElement(content) ? (
              <>
                {isFormCont || isForm(content)
                  ? cloneElement(content, {
                      //@ts-ignore
                      ref,
                    })
                  : content}
              </>
            ) : (
              <div className={styles.content}>{content}</div>
            )}
          </div>
          <Row className={styles.footer} gutter={[6, 6]}>
            {okText !== '' && (
              <div
                className={styles.ok}
                type="primary"
                onClick={async () => {
                  if (onOk) {
                    if (spin) {
                      setLoading(true);
                    }
                    try {
                      await ref.current?.validateFields?.();
                      await onOk?.(
                        ref.current?.getFieldsValue?.(),
                        modal.destroy,
                        //@ts-ignore
                        ref.current,
                      );
                    } catch (e) {}
                    setLoading(false);
                  } else {
                    modal.destroy();
                  }
                }}
                {...okButtonProps}
              >
                {okText}
              </div>
            )}
            {cancelText !== '' && (
              <div
                className={styles.cancel}
                onClick={() => {
                  onCancel?.(
                    ref.current?.getFieldsValue?.(),
                    modal.destroy,
                    // @ts-ignore
                    ref.current,
                  );
                  modal.destroy();
                }}
              >
                {cancelText}
              </div>
            )}
          </Row>
        </div>
      </Spin>
    );
  };

  const modal = Modal.info({
    width: 720,
    icon: null,
    className: styles.modal,
    wrapClassName: styles.modalWrap,
    maskClosable: true,
    centered: true,
    footer: null,
    content: <Content />,
    ...rest,
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return modal;
};

export default Dialog;
export type { Props as DialogProps };
