---
nav: Components
group:
  title: Table类
---

# Pagination

```tsx
import { Pagination, usePagination } from 'lsbiz-ui';
import React from 'react';

export default () => {
  const apiCallback = async (params: any) => {
    let result: any = await Promise.resolve({
      pageNum: 1,
      pageSize: 10,
      size: 10,
      startRow: 1,
      endRow: 10,
      total: 16,
      pages: 2,
      list: [
        {
          panelId: 334,
          userId: 29,
          panelName: 'hehe',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-05-08 11:31:56',
          gmtModified: '2023-05-08 11:31:56',
        },
        {
          panelId: 333,
          userId: 29,
          panelName: '888',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-28 18:19:37',
          gmtModified: '2023-04-28 18:19:37',
        },
        {
          panelId: 317,
          userId: 29,
          panelName: 'qqq',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-26 11:56:36',
          gmtModified: '2023-04-26 11:56:36',
        },
        {
          panelId: 257,
          userId: 29,
          panelName: '10',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:33',
          gmtModified: '2023-04-18 13:46:33',
        },
        {
          panelId: 256,
          userId: 29,
          panelName: '9',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:29',
          gmtModified: '2023-04-18 13:46:29',
        },
        {
          panelId: 255,
          userId: 29,
          panelName: '8',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:21',
          gmtModified: '2023-04-18 13:46:21',
        },
        {
          panelId: 254,
          userId: 29,
          panelName: '7',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:18',
          gmtModified: '2023-04-18 13:46:18',
        },
        {
          panelId: 253,
          userId: 29,
          panelName: '6',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:13',
          gmtModified: '2023-04-18 13:46:13',
        },
        {
          panelId: 252,
          userId: 29,
          panelName: '5',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:05',
          gmtModified: '2023-04-18 13:46:05',
        },
        {
          panelId: 251,
          userId: 29,
          panelName: '4',
          isHomePanel: 0,
          dateSelStartTime: null,
          dateSelEndTime: null,
          gmtCreate: '2023-04-18 13:46:02',
          gmtModified: '2023-04-18 13:46:02',
        },
      ],
      prePage: 0,
      nextPage: 2,
      isFirstPage: true,
      isLastPage: false,
      hasPreviousPage: false,
      hasNextPage: true,
      navigatePages: 8,
      navigatepageNums: [1, 2],
      navigateFirstPage: 1,
      navigateLastPage: 2,
      firstPage: 1,
      lastPage: 2,
    });

    return {
      current: result.pageNum,
      pageSize: result.pageSize,
      total: result.total,
      data: result.list,
    };
  };

  const {
    dataSource,
    current,
    pageSize,
    total,
    fetch: refresh,
  } = usePagination({
    apiCallback,
    errorCallback: (err) => console.error(err.message),
  });

  const handlePaginationChange = (
    current: number,
    pageSize: number | string,
  ) => {
    console.log(
      '🚀 ~ file: index.md:45 ~ handlePaginationChange ~ pageSize:',
      current,
      pageSize,
    );
    refresh({
      current: Number(current),
      pageSize: Number(pageSize),
    });
  };

  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={handlePaginationChange}
    />
  );
};
```

usePagination
<API id="usePaginationCom"></API>

Pagination
<API id="Pagination"></API>

> `Pagination`组件基于 [rc-pagination](https://pagination-react-component.vercel.app/)
