import { singleOperators } from './config';
import type { FormulaData } from './type';

const isData = (item: FormulaData) => {
  return ['device', 'source', 'special_source'].includes(item.type);
};

const specialDispose = (item: FormulaData, callback: any) => {
  const specialOperator =
    item.type === 'operator' && ['abs', 'sum'].includes(item.value || '');

  if (specialOperator) {
    return `${item.value}(${callback()})`;
  }

  return item.value;
};

const getKey = ({ sourceCodeList, secondInfo, otherInfo }: FormulaData) => {
  const idStr =
    sourceCodeList?.reduce((pre, cur) => `${pre}_${cur}`, '').slice(1) || '';
  return `${idStr}${secondInfo ? `@${secondInfo}` : ''}${
    otherInfo ? `#${otherInfo}` : ''
  }`;
};

export const formula = {
  toString: (data: FormulaData[]) =>
    data.reduce((pre, cur) => {
      return `${pre}${
        isData(cur)
          ? `[${getKey(cur)}]`
          : specialDispose(cur, () =>
              formula.toString(cur.specialCalculationDTOList ?? []),
            )
      }`;
    }, ''),
  toLabel: (data: FormulaData[], map: Record<string, string>) =>
    data.reduce((pre, cur) => {
      return `${pre}${
        isData(cur)
          ? map[getKey(cur)] || cur.value
          : specialDispose(cur, () =>
              formula.toLabel(cur.specialCalculationDTOList ?? [], map),
            )
      }`;
    }, ''),

  toStringByLabel: (str: string) => {
    function deep(str: string): string[] {
      if (str?.includes('sum(') || str?.includes('abs(')) {
        const subStart = str.indexOf('sum(');
        const absStart = str.indexOf('abs(');

        const start =
          subStart > absStart
            ? absStart >= 0
              ? absStart
              : subStart
            : subStart >= 0
            ? subStart
            : absStart;

        const end = str.indexOf(')', start) + 1;

        if (end <= 0) {
          return str.slice(0, start).split('');
        }

        return [
          ...str.slice(0, start).split(''),
          str.slice(start, end),
          ...deep(str.slice(end, str.length)),
        ];
      }

      return str.split('');
    }

    return deep(str);
  },
  toData: (str: string) => {
    const splitArr = formula.toStringByLabel(str);
    const data: FormulaData[] = [];

    let isField = false;
    let isNumber = false;
    let fieldStart = 0;
    let numberStart = 0;
    const lastIndex = (splitArr?.length || 0) - 1;
    const handleNumber = (index: number) => {
      if (isNumber) {
        const number = splitArr.slice(numberStart, index).join('');
        data.push({
          type: 'number',
          value: number,
        });
      }
    };

    splitArr.forEach((item, index) => {
      switch (true) {
        case (item.includes('abs(') || item.includes('sum(')) && !isField: {
          handleNumber(index);
          isField = false;
          isNumber = false;
          data.push({
            type: 'operator',
            value: item.includes('abs(') ? 'abs' : 'sum',
            specialCalculationDTOList: formula.toData(
              item.slice(4, item.length - 1),
            ),
          });
          break;
        }
        case singleOperators.includes(item) && !isField: {
          handleNumber(index);
          isField = false;
          isNumber = false;
          data.push({
            type: 'operator',
            value: item,
          });
          break;
        }
        case item === '[': {
          handleNumber(index);
          isField = true;
          isNumber = false;
          fieldStart = index;
          break;
        }
        case item === ']': {
          isField = false;
          isNumber = false;
          const field = splitArr.slice(fieldStart + 1, index).join('');
          const sourceCodeList = field.split('@')[0].split('_');
          const [sourceId, fieldId, value] = sourceCodeList;
          const isSpecialData = field.includes('@');

          data.push({
            sourceId,
            fieldId,
            value,
            sourceCodeList,
            secondInfo: isSpecialData
              ? field.split('@')[1].split('#')[0]
              : undefined,
            otherInfo: isSpecialData
              ? field.split('@')[1].split('#')[1]
              : undefined,
            type: isSpecialData
              ? 'special_source'
              : value
              ? 'device'
              : 'source',
          });
          break;
        }
        default: {
          if (!isField) {
            if (!isNumber) {
              numberStart = index;
            }
            isNumber = true;
            if (index === lastIndex) {
              handleNumber(index + 1);
            }
          }
        }
      }
    });
    return data;
  },
};
