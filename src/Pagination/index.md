---
group:
  title: Components
  order: 2
---

# Pagination

```tsx
import React from 'react';
import { Pagination, usePagination } from 'formula-ui';

export default () => {
  const apiCallback = async (params: any) => {
    const res: any = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        current: params.current,
        pageSize: params.pageSize,
      }),
    });

    const result = res.data.data;

    return {
      current: result.current,
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

  const handlePaginationChange = () => {
    refresh({
      current,
      pageSize,
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
