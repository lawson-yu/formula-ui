---
nav: Components
group:
  title: 计算类
---

# DataMenu

```tsx
import { DataMenu } from 'lsbiz-ui';
import React from 'react';

const Component = () => {
  const dataSource: DataSource[] = [
    {
      id: 1,
      label: 'cool',
      children: [
        {
          id: '1-1',
          label: 'hao',
        },
        {
          id: '1-2',
          label: 'cool',
        },
      ],
    },
    {
      id: 2,
      label: 'xiu',
      children: [
        {
          id: '2-1',
          label: 'fule',
          children: [
            {
              id: '2-1-1',
              label: 'fule2-1-1',
            },
            {
              id: '2-1-2',
              label: 'fule2-1-2',
            },
            {
              id: '2-1-3',
              label: 'fule2-1-3',
              children: [
                {
                  id: '2-1-3-1',
                  label: 'fule2-1-3-1',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleClickItem = (...rest: any) => {
    console.log('rest', ...rest);
  };

  return (
    <div style={{ width: 300 }}>
      <DataMenu hasSearch dataSource={dataSource} onClick={handleClickItem} />
    </div>
  );
};

export default Component;
```

参数
<API id="DataMenu"></API>
