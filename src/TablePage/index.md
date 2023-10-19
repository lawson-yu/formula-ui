---
group:
  title: Components
  order: 1
---

# TablePage

基于`Pagination`和`Button`，`Table(rc-table)`组件封装

```tsx
import React from 'react';
import axios from 'axios';
import { TablePage } from 'formula-ui';

export default () => {
  const handleOperationBtn = (item: any) => {
    console.log('🚀 ~ file: index.md:16 ~ handleOperationBtn ~ item:', item);
  };

  const columns = [
    {
      key: 'dataName',
      title: '数据名称',
      dataIndex: 'dataName',
      width: 300,
      ellipsis: true,
    },
    {
      key: 'calculationFormula',
      title: '演算模式',
      dataIndex: 'calculationFormula',
      ellipsis: true,
    },
    {
      key: 'unit',
      title: '单位',
      dataIndex: 'unit',
      width: 150,
      ellipsis: true,
    },
    {
      key: 'gmtModified',
      title: '编辑时间',
      dataIndex: 'gmtModified',
      width: 200,
      ellipsis: true,
    },
    {
      key: 'operations',
      title: '操作',
      width: 150,
      ellipsis: true,
      render: (item: any) => {
        return (
          <div>
            <a onClick={() => handleOperationBtn(item)}>编辑</a>
          </div>
        );
      },
    },
  ];

  const apiCallback = async (params: any) => {
    const res = await axios.post<any>(
      '/api',
      {},
      {
        headers: {
          Applicationcode: 'ENERGY_MONITORING',
          Client: 'web',
          'X-Access-Token': '9099bfba-85aa-4552-9c5c-97124236f4ef-15',
        },
        params: {
          current: params.current,
          pageSize: params.pageSize,
        },
      },
    );

    const result = res.data.data;

    return {
      current: result.current,
      pageSize: result.pageSize,
      total: result.total,
      data: result.list,
    };
  };

  return <TablePage columns={columns} requestInfo={{ apiCallback }} />;
};
```

参数
<API id="TablePage"></API>

> 参考：[rc-table]('https://table-react-component.vercel.app/')
