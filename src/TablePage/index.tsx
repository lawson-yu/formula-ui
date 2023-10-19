import cn from 'classnames';
import { Button, ButtonProps, Pagination, UsePaginationOptions, usePagination } from 'formula-ui';
import Table, { TableProps } from 'rc-table';
import React, { ReactNode, type FC } from 'react';
import styles from './index.module.scss';

interface Props {
  /**
   * @description 表格类名
   * @type string
   */
  tableClassName?: string;
  /**
   * @description 额外内容
   * @type ReactNode
   */
  extra?: ReactNode;
  /**
   * @description 表格底部
   * @type ReactNode
   */
  footer?: ReactNode;
  /**
   * @description 表格属性-参考：rc-table
   * @type TableProps
   */
  tableProps?: Omit<TableProps<Record<string, any>>, 'data' | 'columns'>;
  /**
   * @description 按钮属性-参考：Button组件属性
   * @type ButtonProps
   */
  btnProps?: ButtonProps;
  /**
   * @description 列属性-参考：rc-table
   * @type TableProps['columns']
   */
  columns: TableProps<any>['columns'];
  /**
   * @description 请求信息配置-参考：usePagination属性
   * @type UsePaginationOptions
   */
  requestInfo: UsePaginationOptions
}

const TablePage: FC<Props> = (props) => {
  const { footer, columns, extra, tableClassName, tableProps, btnProps, requestInfo } =
    props;

  const { dataSource, current, pageSize, total, fetch } = usePagination(requestInfo);

  const handlePaginationChange = (page: number, pageSize: string | number) => {
    fetch({
      current: page,
      pageSize: pageSize,
    });
  };

  return (
    <div className={cn('table-page-container', styles.container)}>
      <div className={styles.card}>
        {extra ? (
          extra
        ) : (
          <div className={styles.btnWrap}>
            <Button icon={'+'} {...btnProps}>
              &nbsp;&nbsp;新增数据
            </Button>
          </div>
        )}
        <div className={styles.content}>
          <Table
            className={tableClassName}
            data={dataSource}
            columns={columns}
            {...tableProps}
          />
        </div>
        {!footer ? (
          <Pagination
            total={total}
            pageSize={pageSize}
            current={current}
            onChange={handlePaginationChange}
          />
        ) : (
          footer
        )}
      </div>
    </div>
  );
};

export default TablePage;
