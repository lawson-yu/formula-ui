---
nav: Components
group:
  title: 基础组件
---

# Dialog

基于`Antd Modal`组件封装

```tsx
import { Button, Dialog } from 'lsbiz-ui';
import React from 'react';

export default () => {
  const handleBtnClick = () => {
    Dialog({
      title: '提示',
      content: '确定删除该数据？',
      onOk: () => {
        console.log('ok');
      },
      onCancel: () => {
        console.log('cancel');
      },
    });
  };
  return <Button onClick={handleBtnClick}>Click</Button>;
};
```

参数
| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spin | 是否展示加载中 | boolean | --- |
| onOk | 点击确认按钮的回调 | (values: Record<string, any>, hide: () => void, core: FormInstance<any>) => void | --- |
| onCancel | 点击取消按钮的文案 | (values: Record<string, any>, hide: () => void, core: FormInstance<any>) => void | --- |
| isFormCont | 是否是表单内容 | boolean | --- |

> 更多参考 Antd Modal 属性
