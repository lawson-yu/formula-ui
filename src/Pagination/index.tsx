import cn from 'classnames';
import RcPagination, { PaginationData } from 'rc-pagination';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  /**
   * @description 当前页
   * @type number
   * @default 1
   */
  current?: number;
  /**
   * @description 总条数
   * @type number
   */
  total: number;
  /**
   * @description 每页条数
   * @type number
   * @default 10
   */
  pageSize?: number;
  /**
   * @description 分页器ClassName
   * @type string
   */
  className?: string;
  /**
   * @description 每页条数选项
   * @type number[]
   */
  pageSizeOptions?: number[];
  /**
   * @description 每页条数改变回调
   * @type (current: number, size: string | number) => void
   */
  onChange?: (current: number, size: string | number) => void;
  /**
   * @description 分页器属性-详见 rc-pagination
   * @type Omit<PaginationData, 'current' | 'pageSize' | 'total' | 'showSizeChanger' | 'jumpPrevIcon' | 'jumpNextIcon'>
   */
  paginationProps?: Omit<
    PaginationData,
    | 'current'
    | 'pageSize'
    | 'total'
    | 'showSizeChanger'
    | 'jumpPrevIcon'
    | 'jumpNextIcon'
  >;
}

const Pagination: FC<Props> = (props) => {
  const {
    current = 1,
    total,
    pageSize = 10,
    className,
    pageSizeOptions = [10, 20, 50, 100],
    onChange,
    paginationProps,
  } = props;

  const totalPage = Math.ceil(total / pageSize);

  return (
    <div className={cn(styles.pagination, className)}>
      <div>
        每页显示 {pageSize} 条，共 {totalPage} 页，当前{' '}
        {`${current}/${totalPage}`}
      </div>
      <div className={styles.right}>
        <RcPagination
          current={current}
          pageSize={pageSize}
          total={total}
          showSizeChanger={false}
          jumpPrevIcon={() => <span>...</span>}
          jumpNextIcon={() => <span>...</span>}
          onChange={onChange}
          {...paginationProps}
        />
        每页显示
        {onChange ? (
          <select
            className={cn(styles.select, 'select')}
            value={pageSize}
            onChange={(e) => onChange?.(1, e.target.value)}
          >
            {pageSizeOptions.map((option: number) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          pageSize
        )}
        条记录
      </div>
    </div>
  );
};

export default Pagination;
export type { Props as PaginationProps };
