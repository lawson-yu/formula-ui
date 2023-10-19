import React, { FC, useCallback, useEffect, useState } from 'react';

interface Options {
  /**
   * @description 默认每页条数
   * @type number
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * @description 默认当前页
   * @type number
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * @description 请求接口回调
   * @type (params: any) => Promise<{
   *  current: number;
   *  pageSize: number;
   *  total: number;
   *  data: any[];
   * }>
   */
  apiCallback: (params: any) => Promise<{
    current: number;
    pageSize: number;
    total: number;
    data: any[];
  }>;
  /**
   * @description 请求接口异常处理回调
   * @type (error: any) => void
   */
  errorCallback?: (error: any) => void;
}

export { Options as UsePaginationOptions };

export function usePagination<T = any>(options: Options) {
  const {
    defaultPageSize = 10,
    defaultCurrent = 1,
    apiCallback,
    errorCallback,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    pageSize: defaultPageSize,
    current: defaultCurrent,
    dataSource: [] as T[],
    total: 0,
  });

  const fetchData = useCallback(
    async (params = {}) => {
      try {
        setIsLoading(true);
        const { current, pageSize, total, data } = await apiCallback({
          current: paginationInfo.current,
          pageSize: paginationInfo.pageSize,
          ...params,
        });

        setPaginationInfo({
          dataSource: data,
          current,
          pageSize,
          total,
        });
      } catch (err) {
        errorCallback?.(err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiCallback, errorCallback, paginationInfo],
  );

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    current: paginationInfo.current,
    pageSize: paginationInfo.pageSize,
    total: paginationInfo.total,
    dataSource: paginationInfo.dataSource,
    fetch: fetchData,
  };
}

const Index: FC<Options> = () => <></>;
export default Index;
