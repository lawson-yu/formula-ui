import { Form, FormInstance, Input } from 'antd';
import cn from 'classnames';
import { DataMenu, FormulaView } from 'lsbiz-ui';
import { DataSource } from 'lsbiz-ui/FormulaView';
import { FormulaData } from 'lsbiz-ui/FormulaView/type';
import React, { FC, useState } from 'react';
import styles from './index.module.scss';

interface FormulaValue {
  dataName: string;
  calculation: [string, FormulaData[]];
  unit: string;
}

interface Props {
  /**
   * @description 页面样式类名
   * @type string
   */
  pageClassName?: string;
  /**
   * @description 数据菜单样式类名
   * @type string
   */
  dataMenuClassName?: string;
  /**
   * @description form表单实例
   * @type FormInstance<any>
   */
  form?: FormInstance<any>;
  /**
   * @description 数据源
   * @type DataSource[]
   * @default []
   */
  dataSource: DataSource[];
  /**
   * @description 数据源映射对象
   * @type Record<string, string>
   */
  mapData?: Record<string, string>;
  /**
   * @description 计算详情值
   * @type FormulaValue
   */
  formulaValue?: FormulaValue;
  /**
   * @description 生成ID映射标签方法
   * @type (e: (str: string) => void) => void
   */
  commitCallback: (e: (str: string) => void) => void;
  /**
   * @description 点击数据菜单项事件
   * @type (current: DataSource, items: DataSource[]) => void
   */
  onDataMenuItemClick?: (current: DataSource, items: DataSource[]) => void;
  /**
   * @description 点击删除事件
   * @type () => void
   */
  onDeleteBtn?: () => void;
  /**
   * @description 点击取消事件
   * @type () => void
   */
  onCancelBtn?: () => void;
  /**
   * @description 点击保存事件
   * @type (data: any) => void
   */
  onSubmitBtn: (data: any) => void;
  /**
   * @description 代码视图标签点击事件
   * @type (params: {
    sourceList: DataSource[];
    onChange: (
      secondInfo?: string,
      otherInfo?: string,
    ) => void; sourceList: 第一个代表父级，第二个代表子级...
   */
  onPlaceholderClick?: (params: {
    secondInfo: string;
    otherInfo: string;
    sourceList: DataSource[];
    onChange: (secondInfo?: string, otherInfo?: string) => void;
  }) => void;
}

const { useForm, Item } = Form;
const FormulaPage: FC<Props> = (props) => {
  const {
    pageClassName,
    dataMenuClassName,
    formulaValue,
    dataSource,
    mapData,
    form: formInstance,
    commitCallback,
    onDataMenuItemClick,
    onDeleteBtn,
    onCancelBtn,
    onSubmitBtn,
    onPlaceholderClick,
  } = props;

  let [form] = useForm<FormulaValue>();

  if (formInstance) {
    form = formInstance;
  }

  const [value, setValue] = useState<FormulaValue | undefined>();
  if (formulaValue !== value) {
    setValue(formulaValue);
    form.setFieldsValue({
      ...formulaValue,
    });
  }

  const handleDeleteBtn = (e: any) => {
    e.preventDefault();
    onDeleteBtn?.();
  };

  const handleCancelBtn = (e: any) => {
    e.preventDefault();
    onCancelBtn?.();
  };

  const handleFormSubmit = async (data: any) => {
    onSubmitBtn?.(data);
  };

  const handleDataMenuItemClick = (
    current: DataSource,
    items: DataSource[],
  ) => {
    onDataMenuItemClick?.(current, items);
  };

  return (
    <div className={cn(styles.page, pageClassName)}>
      <div className={styles.menu}>
        <DataMenu
          hasSearch
          className={dataMenuClassName}
          dataSource={dataSource}
          onClick={handleDataMenuItemClick}
        />
      </div>
      <Form
        form={form}
        className={styles.form}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Item
          name="dataName"
          label={'数据名称'}
          rules={[{ required: true, message: '请输入数据字段名称' }]}
        >
          <Input maxLength={50} placeholder={'请输入数据字段名称'} />
        </Item>
        <Item
          name="calculation"
          label={'演算模式'}
          validateTrigger={['onSubmit']}
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                if (!value?.[0]) {
                  throw new Error('请输入计算公式');
                }
              },
            },
          ]}
        >
          <FormulaView
            mapData={mapData}
            dataSource={dataSource}
            callback={commitCallback}
            onPlaceholderClick={onPlaceholderClick}
          />
        </Item>
        <Item
          name="unit"
          label={'单位'}
          rules={[
            {
              required: true,
              message: '请输入单位',
            },
          ]}
        >
          <Input maxLength={30} placeholder={'请输入单位'} />
        </Item>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} type="submit">
            保存
          </button>
          {!!onDeleteBtn && (
            <button
              type="button"
              className={styles.btnError}
              onClick={handleDeleteBtn}
            >
              删除
            </button>
          )}
          <button
            type="button"
            className={styles.btn}
            onClick={handleCancelBtn}
          >
            取消
          </button>
        </div>
      </Form>
    </div>
  );
};

export default FormulaPage;
export type { Props as FormulaPageProps, FormulaValue };
