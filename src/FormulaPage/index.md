---
nav: Components
group:
  title: 计算类
---

# FormulaPage

基于`FormulaView`和`DataMenu`组件封装

```tsx
import { Form, Radio } from 'antd';
import { Dialog, FormulaPage } from 'lsbiz-ui';
import { DataSource } from 'lsbiz-ui/DataMenu';
import React, { useMemo } from 'react';

const Test = () => {
  let commit = (_value: string) => {};

  const calculation: [string, any[]] = [
    '耗电量（修正后）停机耗电量室外机运转时间*室外温度平均值',
    [
      {
        type: 'vrv_dkc_source',
        value: null,
        specialCalculationDTOList: null,
        fieldId: null,
        sourceId: '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
        sourceType: 2,
        sourceDataType: 1,
        sourceCodeList: ['4a753a90-47d9-11ee-9e1c-aa0385eca4c2'],
      },
      {
        type: 'vrv_dkc_source',
        value: null,
        specialCalculationDTOList: null,
        fieldId: 'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
        sourceId: '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
        sourceType: 2,
        sourceDataType: 2,
        sourceCodeList: [
          '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
          'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
        ],
      },
      {
        type: 'vrv_dkc_source',
        value: '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
        specialCalculationDTOList: null,
        fieldId: 'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
        sourceId: '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
        sourceType: 2,
        sourceDataType: 3,
        sourceCodeList: [
          '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
          'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
          '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
          '53a873e4-47dd-11ee-baf7-062c0d724ab3',
        ],
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
        type: 'vrv_dkc_source',
        value: '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
        specialCalculationDTOList: null,
        fieldId: 'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
        sourceId: '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
        sourceType: 2,
        sourceDataType: 7,
        sourceCodeList: [
          '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
          'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
          '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
          '54e14a9c-47dd-11ee-baf7-062c0d724ab3',
        ],
      },
    ],
  ];

  const traverse = (item: any) => {
    if (!item?.specialCalculationDTOList) {
      return {
        ...item,
        type: item.type === 'vrv_dkc_source' ? 'special_source' : item.type, // special_source 为其他数据源，配合 secondInfo，otherInfo 使用
        secondInfo: item.sourceDataType, // 用于存储区分其他数据
        otherInfo: item.sourceType, // 用于存储区分其他数据
      };
    }

    item?.specialCalculationDTOList?.map((list: any) => {
      return {
        ...list,
        ...traverse(list),
      };
    });
  };

  // 格式化数据
  calculation[1] = calculation[1].map(traverse);

  const values = {
    id: 45,
    userId: 29,
    dataName: '111',
    unit: '111',
    state: 1,
    gmtCreate: '2023-10-27 15:55:02',
    gmtModified: '2023-10-27 16:21:21',
    calculation,
  };
  console.log('🚀 ~ 格式成 ~ values.calculation:', values.calculation);

  const dataTypes = [1, 2];

  // 用于弹窗类型处理
  const dataTypeList = [
    {
      sourceTypeName: '耗电量（修正后）',
      sourceTypeCode: '1',
    },
    {
      sourceTypeName: '停机耗电量',
      sourceTypeCode: '2',
    },
    {
      sourceTypeName: '室外机运转时间',
      sourceTypeCode: '3',
    },
    {
      sourceTypeName: '室外1运转累计时间',
      sourceTypeCode: '4',
    },
    {
      sourceTypeName: '室外2运转累计时间',
      sourceTypeCode: '5',
    },
    {
      sourceTypeName: '室外3运转累计时间',
      sourceTypeCode: '6',
    },
    {
      sourceTypeName: '室外温度平均值',
      sourceTypeCode: '7',
    },
  ];

  // 左侧DataMenu的数据源
  const dataSource: DataSource[] = [
    {
      label: '1',
      id: 27,
      type: '0',
      children: [],
    },
    {
      label: 'IVRV中央西谷',
      id: 26,
      type: '0',
      children: [],
    },
    {
      id: 14,
      label: 'AHU Lunch Room',
      type: '0',
      children: [
        {
          label: 'SA Temperature',
          id: 11,
          type: '0',
          children: [],
        },
        {
          label: 'Supply air temperature setting',
          id: 12,
          type: '0',
          children: [],
        },
      ],
    },
    {
      id: 13,
      label: 'Outdoor Environment',
      type: '0',
      children: [
        {
          label: 'Outdoor Air Temperature5788',
          id: 7,
          type: '0',
          children: [],
        },
        {
          label: '再再重复绑定合计累计值1042',
          id: 14,
          type: '0',
          children: [],
        },
        {
          label: '再新增一个瞬时值6.5',
          id: 16,
          type: '0',
          children: [],
        },
      ],
    },
    {
      id: 7,
      label: '动力能源',
      type: '0',
      children: [
        {
          label: '合计值',
          id: 8,
          type: '0',
          children: [],
        },
        {
          label: '合计累计值1042',
          id: 9,
          type: '0',
          children: [],
        },
        {
          label: '重复绑定另外一个5788',
          id: 10,
          type: '0',
          children: [],
        },
        {
          label: '再重复绑定1042',
          id: 13,
          type: '0',
          children: [],
        },
        {
          label: '6月新增类型-累计值',
          id: 15,
          type: '0',
          children: [],
        },
      ],
    },
    {
      id: 3,
      label: '燃气',
      type: '0',
      children: [
        {
          label: '燃气量-瞬时值',
          id: 3,
          type: '0',
          children: [],
        },
        {
          label: '燃气量-合计值',
          id: 6,
          type: '0',
          children: [],
        },
      ],
    },
    {
      id: 2,
      label: '用水',
      type: '0',
      children: [
        {
          label: '用水量-瞬时值',
          id: 2,
          type: '0',
          children: [],
        },
        {
          label: '用水量-合计值',
          id: 5,
          type: '0',
          children: [],
        },
      ],
    },
    {
      id: 1,
      label: '电力',
      type: '0',
      children: [
        {
          label: '用电量-瞬时值',
          id: 1,
          type: '0',
          children: [],
        },
        {
          label: '用电量-合计值',
          id: 4,
          type: '0',
          children: [],
        },
      ],
    },
    {
      id: '00000001103',
      label: '广州R&D技术开发研究院',
      type: '1',
      children: [
        {
          id: 'LI2N2PYK9Z',
          label: '网关一',
          type: '1',
          children: [
            {
              label: 'W1-01-01----',
              id: 'afa2e69d-66fc-4bab-886f-6bc0bf6c18f2-00000003614',
              type: '1',
              children: [],
            },
            {
              label: '设备2',
              id: 'afa2e69d-66fc-4bab-886f-6bc0bf6c18f2-00000020776',
              type: '1',
              children: [],
            },
          ],
        },
        {
          id: 'LI2NTJC7FY',
          label: 'LI2NTJC7FY',
          type: '1',
          children: [
            {
              label: 'W2-01-01',
              id: '5a42810c-1b5b-4eef-bf76-9b28635198bc-00000003613',
              type: '1',
              children: [],
            },
          ],
        },
        {
          id: 'LI2NXPM4DX',
          label: 'LI2NXPM4DX',
          type: '1',
          children: [
            {
              label: '初创空间',
              id: '0362e8b11cec431494228a8143489652-00000038870',
              type: '1',
              children: [],
            },
            {
              label: '会议室',
              id: '0362e8b11cec431494228a8143489652-00000038871',
              type: '1',
              children: [],
            },
            {
              label: '展厅低矮型',
              id: '0362e8b11cec431494228a8143489652-00000038872',
              type: '1',
              children: [],
            },
            {
              label: '新风',
              id: '0362e8b11cec431494228a8143489652-00000038873',
              type: '1',
              children: [],
            },
            {
              label: '展厅X7',
              id: '0362e8b11cec431494228a8143489652-00000038874',
              type: '1',
              children: [],
            },
            {
              label: '初创空间',
              id: 'cfece3baa79d42c5b6f7bab7a52ee561-00000038870',
              type: '1',
              children: [],
            },
            {
              label: '会议室',
              id: 'cfece3baa79d42c5b6f7bab7a52ee561-00000038871',
              type: '1',
              children: [],
            },
            {
              label: '展厅低矮型',
              id: 'cfece3baa79d42c5b6f7bab7a52ee561-00000038872',
              type: '1',
              children: [],
            },
            {
              label: '新风',
              id: 'cfece3baa79d42c5b6f7bab7a52ee561-00000038873',
              type: '1',
              children: [],
            },
            {
              label: '展厅X7',
              id: 'cfece3baa79d42c5b6f7bab7a52ee561-00000038874',
              type: '1',
              children: [],
            },
          ],
        },
        {
          id: 'LI2NYWS9PU',
          label: 'LI2NYWS9PU',
          type: '1',
          children: [
            {
              label: '开放办公区(2-1)',
              id: '01f5a6a540a54f1692adca9b1db1ccf2-00000038596',
              type: '1',
              children: [],
            },
            {
              label: '评价室',
              id: '01f5a6a540a54f1692adca9b1db1ccf2-00000038597',
              type: '1',
              children: [],
            },
            {
              label: '开放办公区(1-2)',
              id: '01f5a6a540a54f1692adca9b1db1ccf2-00000038598',
              type: '1',
              children: [],
            },
            {
              label: '开放办公区(2-1)',
              id: 'bd2306cb123d4ce6b43ecd5ac2bc965f-00000038596',
              type: '1',
              children: [],
            },
            {
              label: '评价室',
              id: 'bd2306cb123d4ce6b43ecd5ac2bc965f-00000038597',
              type: '1',
              children: [],
            },
            {
              label: '开放办公区(1-2)',
              id: 'bd2306cb123d4ce6b43ecd5ac2bc965f-00000038598',
              type: '1',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
      label: '4a753a90-47d9-11ee-9e1c-aa0385eca4c2',
      type: '2',
      children: [
        {
          id: 'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
          label: 'd8f852ba-47df-11ee-a9c9-e67b20d13fd2',
          type: '2',
          children: [
            {
              id: '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
              label: '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
              type: '2',
              children: [
                {
                  label: '53a873e4-47dd-11ee-baf7-062c0d724ab3',
                  id: '53a873e4-47dd-11ee-baf7-062c0d724ab3',
                  type: '2',
                  children: [],
                },
                {
                  label: '54aeac4a-47dd-11ee-baf7-062c0d724ab3',
                  id: '54aeac4a-47dd-11ee-baf7-062c0d724ab3',
                  type: '2',
                  children: [],
                },
                {
                  label: '54e14a9c-47dd-11ee-baf7-062c0d724ab3',
                  id: '54e14a9c-47dd-11ee-baf7-062c0d724ab3',
                  type: '2',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 'd9dfc500-47df-11ee-a9c9-e67b20d13fd2',
          label: 'd9dfc500-47df-11ee-a9c9-e67b20d13fd2',
          type: '2',
          children: [
            {
              id: '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
              label: '7081c870-47d9-11ee-b5ef-6e3bc33b1a35',
              type: '2',
              children: [
                {
                  label: '53a873e4-47dd-11ee-baf7-062c0d724ab3',
                  id: '53a873e4-47dd-11ee-baf7-062c0d724ab3',
                  type: '2',
                  children: [],
                },
                {
                  label: '54aeac4a-47dd-11ee-baf7-062c0d724ab3',
                  id: '54aeac4a-47dd-11ee-baf7-062c0d724ab3',
                  type: '2',
                  children: [],
                },
                {
                  label: '54e14a9c-47dd-11ee-baf7-062c0d724ab3',
                  id: '54e14a9c-47dd-11ee-baf7-062c0d724ab3',
                  type: '2',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // 生成映射表 - 映射代码视图的Tag标签
  const mapData = useMemo(() => {
    const map: Record<string, string> = {};
    const traverse = (item: DataSource, ids: (string | number)[]) => {
      if (!item?.children?.length) return;

      item?.children?.forEach((child) => {
        const idStr = ids.join('_');
        dataTypeList.forEach((listItem) => {
          map[`${idStr}_${child.id}@${listItem.sourceTypeCode}`] =
            listItem.sourceTypeName;

          dataTypes.forEach((dataType) => {
            map[
              `${idStr}_${child.id}@${listItem.sourceTypeCode}#${dataType}`
            ] = `${listItem.sourceTypeName}=${dataType}`;
          });
        });

        map[`${idStr}_${child.id}`] = child.label;
        traverse(child, [...ids, child.id]);
      });
    };

    dataSource.forEach((item) => {
      map[item.id] = item.label;
      dataTypeList.forEach((listItem) => {
        map[`${item.id}@${listItem.sourceTypeCode}`] = listItem.sourceTypeName;

        dataTypes.forEach((dataType) => {
          map[
            `${item.id}@${listItem.sourceTypeCode}#${dataType}`
          ] = `${listItem.sourceTypeName}=${dataType}`;
        });
      });
      traverse(item, [item.id]);
    });

    return map;
  }, [dataSource]);

  // 点击保存按钮
  const handleSubmitBtn = (...rest: any) => {
    console.log('🚀 ~ file: index.tsx:420 ~ handleSubmitBtn ~ rest:', rest);
  };

  // 点击DataMenu的数据源
  const handleDataMenuItemClick = (
    current: DataSource,
    items: DataSource[],
    info?: {
      secondInfo: string;
      otherInfo: string;
      sourceList: DataSource[];
      onChange: (secondInfo?: string, otherInfo?: string) => void;
    },
  ) => {
    const idStr = items.reduce((prev, cur) => `${prev}_${cur.id}`, '').slice(1);

    if (Number(current.type) !== 0) {
      Dialog({
        title: '标题',
        content: (
          <Form
            initialValues={{
              type: info?.secondInfo ?? dataTypeList[0].sourceTypeCode,
            }}
          >
            <div>Cool</div>
            <Form.Item name="type">
              <Radio.Group>
                {dataTypeList.map((item: any) => {
                  return (
                    <Radio
                      style={{ display: 'block', marginLeft: 20, fontSize: 16 }}
                      key={item.sourceTypeCode}
                      value={item.sourceTypeCode}
                    >
                      {item.sourceTypeName}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          </Form>
        ),
        onOk: ({ type }, hide) => {
          if (!!info) {
            info.onChange(type);
          } else {
            commit(`[${idStr}@${type}]`);
          }
          hide();
        },
        onCancel: () => {},
      });
      return;
    }

    commit(`[${idStr}]`);
  };

  // 点击代码视图的标签
  const handlePlaceholderClick = (info: {
    secondInfo: string;
    otherInfo: string;
    sourceList: DataSource[];
    onChange: (secondInfo?: string, otherInfo?: string) => void;
  }) => {
    const { sourceList } = info;
    handleDataMenuItemClick(
      sourceList[sourceList.length - 1],
      sourceList,
      info,
    );
  };

  return (
    <FormulaPage
      dataSource={dataSource}
      mapData={mapData}
      formulaValue={values}
      commitCallback={(e: (str: string) => void) => {
        commit = e;
      }}
      onDataMenuItemClick={handleDataMenuItemClick}
      onPlaceholderClick={handlePlaceholderClick}
      onSubmitBtn={handleSubmitBtn}
    />
  );
};

export default Test;
```

参数
<API id="FormulaPage"></API>

FormulaValue Type

```ts
interface FormulaValue {
  dataName: string;
  calculation: [string, FormulaData[]];
  unit: string;
}
```
