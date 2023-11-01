---
nav: Components
group:
  title: Table类
---

# TablePage

基于`Pagination`和`Button`，`Table(rc-table)`组件封装

```tsx
import { TablePage } from 'lsbiz-ui';
import React from 'react';

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
    const data = await Promise.resolve({
      pageNum: 1,
      pageSize: 10,
      size: 5,
      startRow: 1,
      endRow: 5,
      total: 5,
      pages: 1,
      list: [
        {
          id: 50,
          userId: 29,
          dataName: '22',
          calculationFormula:
            '耗电量（修正后）停机耗电量室外机运转时间*室外温度平均值',
          unit: '22',
          state: 1,
          gmtCreate: '2023-10-30 17:57:43',
          gmtModified: '2023-10-30 17:59:43',
          calculationDTOList: null,
          calculationJson:
            '[{"type": "vrv_dkc_source", "sourceId": "4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "sourceType": 2, "sourceCodeList": ["4a753a90-47d9-11ee-9e1c-aa0385eca4c2"], "sourceDataType": 1}, {"type": "vrv_dkc_source", "fieldId": "d8f852ba-47df-11ee-a9c9-e67b20d13fd2", "sourceId": "4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "sourceType": 2, "sourceCodeList": ["4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "d8f852ba-47df-11ee-a9c9-e67b20d13fd2"], "sourceDataType": 2}, {"type": "vrv_dkc_source", "value": "7081c870-47d9-11ee-b5ef-6e3bc33b1a35", "fieldId": "d8f852ba-47df-11ee-a9c9-e67b20d13fd2", "sourceId": "4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "sourceType": 2, "sourceCodeList": ["4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "d8f852ba-47df-11ee-a9c9-e67b20d13fd2", "7081c870-47d9-11ee-b5ef-6e3bc33b1a35", "53a873e4-47dd-11ee-baf7-062c0d724ab3"], "sourceDataType": 3}, {"type": "operator", "value": "*"}, {"type": "vrv_dkc_source", "value": "7081c870-47d9-11ee-b5ef-6e3bc33b1a35", "fieldId": "d8f852ba-47df-11ee-a9c9-e67b20d13fd2", "sourceId": "4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "sourceType": 2, "sourceCodeList": ["4a753a90-47d9-11ee-9e1c-aa0385eca4c2", "d8f852ba-47df-11ee-a9c9-e67b20d13fd2", "7081c870-47d9-11ee-b5ef-6e3bc33b1a35", "54e14a9c-47dd-11ee-baf7-062c0d724ab3"], "sourceDataType": 7}]',
          sourceType: null,
        },
        {
          id: 49,
          userId: 29,
          dataName: '11',
          calculationFormula: '耗电量（修正后）停机耗电量室外机运转时间',
          unit: '11',
          state: 1,
          gmtCreate: '2023-10-30 17:57:26',
          gmtModified: '2023-10-30 17:57:26',
          calculationDTOList: null,
          calculationJson:
            '[{"type": "vrv_dkc_source", "sourceId": "00000001103", "sourceType": 1, "sourceCodeList": ["00000001103"], "sourceDataType": 1}, {"type": "vrv_dkc_source", "fieldId": "LI2N2PYK9Z", "sourceId": "00000001103", "sourceType": 1, "sourceCodeList": ["00000001103", "LI2N2PYK9Z"], "sourceDataType": 2}, {"type": "vrv_dkc_source", "value": "afa2e69d-66fc-4bab-886f-6bc0bf6c18f2-00000003614", "fieldId": "LI2N2PYK9Z", "sourceId": "00000001103", "sourceType": 1, "sourceCodeList": ["00000001103", "LI2N2PYK9Z", "afa2e69d-66fc-4bab-886f-6bc0bf6c18f2-00000003614"], "sourceDataType": 3}]',
          sourceType: null,
        },
        {
          id: 9,
          userId: 29,
          dataName: 'CoolMan',
          calculationFormula:
            'Outdoor Air Temperature5788+合计累计值1042*abs(重复绑定另外一个5788*SA Temperature)',
          unit: '11',
          state: 1,
          gmtCreate: '2023-06-02 09:40:29',
          gmtModified: '2023-10-24 14:27:01',
          calculationDTOList: null,
          calculationJson:
            '[{"type": "source", "fieldId": "7", "sourceId": "13"}, {"type": "operator", "value": "+"}, {"type": "source", "fieldId": "9", "sourceId": "7"}, {"type": "operator", "value": "*"}, {"type": "operator", "value": "abs", "specialCalculationDTOList": [{"type": "source", "fieldId": "10", "sourceId": "7"}, {"type": "operator", "value": "*"}, {"type": "source", "fieldId": "11", "sourceId": "14"}]}]',
          sourceType: null,
        },
        {
          id: 8,
          userId: 29,
          dataName: 'Cool',
          calculationFormula:
            'SA Temperature-Supply air temperature setting/abs(再再重复绑定合计累计值1042*用电量-瞬时值)',
          unit: 'km',
          state: 1,
          gmtCreate: '2023-06-02 09:40:11',
          gmtModified: '2023-10-31 17:49:18',
          calculationDTOList: null,
          calculationJson:
            '[{"type": "source", "fieldId": "11", "sourceId": "14", "sourceCodeList": ["14", "11"]}, {"type": "operator", "value": "-"}, {"type": "source", "fieldId": "12", "sourceId": "14", "sourceCodeList": ["14", "12"]}, {"type": "operator", "value": "/"}, {"type": "operator", "value": "abs", "specialCalculationDTOList": [{"type": "source", "fieldId": "14", "sourceId": "13", "sourceCodeList": ["13", "14"]}, {"type": "operator", "value": "*"}, {"type": "source", "fieldId": "1", "sourceId": "1", "sourceCodeList": ["1", "1"]}]}]',
          sourceType: null,
        },
        {
          id: 1,
          userId: 29,
          dataName: '123',
          calculationFormula:
            '燃气量-瞬时值+(燃气量-合计值-燃气量-合计值)+abs(用水量-瞬时值-用电量-瞬时值)-sum(Outdoor Air Temperature)',
          unit: '213',
          state: 1,
          gmtCreate: '2023-05-30 09:52:12',
          gmtModified: '2023-05-30 09:52:12',
          calculationDTOList: null,
          calculationJson:
            '[{"type": "source", "fieldId": 3, "sourceId": 3}, {"type": "operator", "value": "+"}, {"type": "operator", "value": "("}, {"type": "source", "fieldId": 6, "sourceId": 3}, {"type": "operator", "value": "-"}, {"type": "source", "fieldId": 6, "sourceId": 3}, {"type": "operator", "value": ")"}, {"type": "operator", "value": "+"}, {"type": "operator", "value": "abs", "specialCalculationDTOList": [{"type": "source", "fieldId": 2, "sourceId": 2}, {"type": "operator", "value": "-"}, {"type": "source", "fieldId": 1, "sourceId": 1}]}, {"type": "operator", "value": "-"}, {"type": "operator", "value": "sum", "specialCalculationDTOList": [{"type": "source", "fieldId": 7, "sourceId": 13}]}]',
          sourceType: null,
        },
      ],
      prePage: 0,
      nextPage: 0,
      isFirstPage: true,
      isLastPage: true,
      hasPreviousPage: false,
      hasNextPage: false,
      navigatePages: 8,
      navigatepageNums: [1],
      navigateFirstPage: 1,
      navigateLastPage: 1,
      firstPage: 1,
      lastPage: 1,
    });
    return {
      current: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      data: data.list,
    };
  };

  return <TablePage columns={columns} requestInfo={{ apiCallback }} />;
};
```

参数
<API id="TablePage"></API>

> 参考：[rc-table]('https://table-react-component.vercel.app/')
