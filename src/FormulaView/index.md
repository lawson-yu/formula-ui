---
nav: Components
group:
  title: 计算类
---

# FormulaView

基于`CodeMirror(@codemirror/view)`组件封装

```tsx
import { Button, FormulaView } from 'lsbiz-ui';

export default function Component() {
  let commit = (value: string) => {};

  const dataSource = [
    {
      id: 14,
      label: 'AHU Lunch Room',
      children: [
        {
          id: 11,
          label: 'SA Temperature',
        },
        {
          id: 12,
          label: 'Supply air temperature setting',
        },
      ],
    },
    {
      id: 13,
      label: 'Outdoor Environment',
      children: [
        {
          id: 7,
          label: 'Outdoor Air Temperature5788',
        },
        {
          id: 14,
          label: '再再重复绑定合计累计值1042',
        },
        {
          id: 16,
          label: '再新增一个瞬时值6.5',
        },
      ],
    },
    {
      id: 7,
      label: '动力能源',
      children: [
        {
          id: 8,
          label: '合计值',
        },
        {
          id: 9,
          label: '合计累计值1042',
        },
        {
          id: 10,
          label: '重复绑定另外一个5788',
        },
        {
          id: 13,
          label: '再重复绑定1042',
        },
        {
          id: 15,
          label: '6月新增类型-累计值',
        },
      ],
    },
    {
      id: 3,
      label: '燃气',
      children: [
        {
          id: 3,
          label: '燃气量-瞬时值',
        },
        {
          id: 6,
          label: '燃气量-合计值',
        },
      ],
    },
    {
      id: 2,
      label: '用水',
      children: [
        {
          id: 2,
          label: '用水量-瞬时值',
        },
        {
          id: 5,
          label: '用水量-合计值',
        },
      ],
    },
    {
      id: 1,
      label: '电力',
      children: [
        {
          id: 1,
          label: '用电量-瞬时值',
        },
        {
          id: 4,
          label: '用电量-合计值',
        },
      ],
    },
  ];

  const value: [string, FormulaData[]] = [
    'SA Temperature-Supply air temperature setting/abs(再再重复绑定合计累计值1042*用电量-瞬时值)',
    [
      {
        type: 'source',
        value: null,
        specialCalculationDTOList: null,
        fieldId: '11',
        sourceId: '14',
        sourceType: null,
        sourceDataType: null,
        sourceCodeList: ['14', '11'],
      },
      {
        type: 'operator',
        value: '-',
        specialCalculationDTOList: null,
        fieldId: null,
        sourceId: null,
        sourceType: null,
        sourceDataType: null,
        sourceCodeList: null,
      },
      {
        type: 'source',
        value: null,
        specialCalculationDTOList: null,
        fieldId: '12',
        sourceId: '14',
        sourceType: null,
        sourceDataType: null,
        sourceCodeList: ['14', '12'],
      },
      {
        type: 'operator',
        value: '/',
        specialCalculationDTOList: null,
        fieldId: null,
        sourceId: null,
        sourceType: null,
        sourceDataType: null,
        sourceCodeList: null,
      },
      {
        type: 'operator',
        value: 'abs',
        specialCalculationDTOList: [
          {
            type: 'source',
            value: null,
            specialCalculationDTOList: null,
            fieldId: '14',
            sourceId: '13',
            sourceType: null,
            sourceDataType: null,
            sourceCodeList: ['13', '14'],
          },
          {
            type: 'operator',
            value: '*',
            specialCalculationDTOList: null,
            fieldId: null,
            sourceId: null,
            sourceType: null,
            sourceDataType: null,
            sourceCodeList: null,
          },
          {
            type: 'source',
            value: null,
            specialCalculationDTOList: null,
            fieldId: '1',
            sourceId: '1',
            sourceType: null,
            sourceDataType: null,
            sourceCodeList: ['1', '1'],
          },
        ],
        fieldId: null,
        sourceId: null,
        sourceType: null,
        sourceDataType: null,
        sourceCodeList: null,
      },
    ],
  ];

  const handleChange = (value: [string, FormulaData[]]) => {};

  const handleBtnClick = () => {
    commit(`[1_4]`);
  };

  const handlePlaceholderClick = (info: any) => {};

  return (
    <div>
      <Button style={{ marginBottom: 20 }} onClick={handleBtnClick}>
        新增数据源
      </Button>
      <FormulaView
        dataSource={dataSource}
        value={value}
        onChange={handleChange}
        onPlaceholderClick={handlePlaceholderClick}
        callback={(e: any) => {
          commit = e;
        }}
      />
    </div>
  );
}
```

参数

<API id="FormulaView"></API>

Value Type

```ts
type ActionType = 'operator' | 'number' | 'device' | 'source'; // 数据源类型

type FormulaData = {
  type: 'operator' | 'number' | 'device' | 'source' | 'special_source';
  value?: string | number | null; // type 为 source，special_source: 数据源id - 第三级
  fieldId?: string | number | null; // type 为 source，special_source: 数据源id - 第二级
  sourceId?: string | number | null; // type 为 source，special_source: 数据源id - 第一级
  sourceCodeList?: string[]; // 层级id： 第一项第一级...
  secondInfo?: string; // type 为 special_source 时，可以传递多余信息以 @ 符号分割处理
  otherInfo?: string; // 同上 # 分割
  specialCalculationDTOList?: FormulaData[] | null;
};

type ValueType = [string, FormulaData[]];
```

DataSource Type

```ts
interface DataSource {
  id: number | string; // 数据源id
  label: string; // 数据源名称
  code?: string; //数据源编码
  children?: Array<DataSource & { parentId?: number }>; // 数据源字段列表
  [key: string]: any;
}
```
