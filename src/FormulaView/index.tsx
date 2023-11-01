import { EditorView } from '@codemirror/view';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { operators, specialOperators } from './config';
import styles from './index.module.scss';
import { placeholders } from './plugin';
import { FormulaData } from './type';
import { formula } from './utils';

interface DataSource {
  id: number | string;
  label: string;
  code?: string;
  children?: Array<DataSource & { parentId?: number }>;
}

interface Props {
  /**
   * @description 数据源
   * @type DataSource[]
   */
  dataSource: DataSource[];
  /**
   * @description 数据源映射对象
   * @type Record<string, string>
   */
  mapData?: Record<string, string>;
  /**
   * @description 输入值
   * @type [string, FormulaData[]]
   */
  value?: [string, FormulaData[]];
  /**
   * @description 公式计算输入值变更
   * @type (value: [string, FormulaData[]]) => void
   */
  onChange?: (value: [string, FormulaData[]]) => void;
  /**
   * @description 公式计算回调-用于外部调用
   * @type (insertStr: (str: string) => void) => void
   */
  callback: (insertStr: (str: string) => void) => void;
  /**
   * @description 公式计算标签点击事件
   * @type (params: {
    sourceList: DataSource[];
    onChange: (
      secondInfo?: string,
      otherInfo?: string,
    ) => void; sourceList: 第一个代表父级，第二个代表子级...
   */
  onPlaceholderClick?: (params: {
    secondInfo: string;
    otherInfo: string;
    sourceList: DataSource[];
    onChange: (secondInfo?: string, otherInfo?: string) => void;
  }) => void;
}

function FormulaView(props: Props) {
  const {
    callback,
    dataSource,
    onPlaceholderClick,
    mapData: originMapData,
  } = props;
  const label = props?.value?.[0];
  const editor = useRef<ReactCodeMirrorRef>(null);
  const [cursor, setCursor] = useState(0);
  const [value, setValue] = useState('');

  const mapData = useMemo(() => {
    if (!!originMapData) return originMapData;

    const map: Record<string, string> = {};

    dataSource.forEach((item) => {
      item.children?.forEach((child) => {
        map[`${item.id}_${child.id}`] = child.label;
      });
    });

    return map;
  }, [dataSource, originMapData]);

  const insertStr = (str: string) => {
    //@ts-ignore
    const specialCursor = specialOperators[str];
    const newCursor = cursor + (specialCursor || str).length;
    setValue(
      value.slice(0, cursor) + (specialCursor || str) + value.slice(cursor),
    );

    setTimeout(() => {
      try {
        editor.current?.view?.focus();
        editor.current?.view?.dispatch({
          selection: {
            anchor: newCursor,
          },
        });
      } catch (e) {}
    }, 100);
  };

  useEffect(() => {
    if (callback) {
      callback(insertStr);
    }
  });

  useEffect(() => {
    const val = formula.toData(value);
    props.onChange?.([formula.toLabel(val, mapData), val]);
  }, [value, mapData]);

  useEffect(() => {
    if (label) {
      const newValue = formula.toString(props.value?.[1] ?? []);
      if (value !== newValue) {
        setValue(newValue);
        setTimeout(() => {
          try {
            editor.current?.view?.dispatch({
              selection: {
                anchor: newValue.length,
              },
            });
          } catch (e) {}
        }, 100);
      }
    }
  }, [label]);

  const handlePlaceholderClick = (
    placeholderLabel: string,
    _: string,
    uniqueId: string,
  ) => {
    const secondInfo = placeholderLabel.split('@')?.[1]?.split('#')?.[0];
    const otherInfo = placeholderLabel.split('@')?.[1]?.split('#')?.[1];
    const codeList = placeholderLabel.split('@')?.[0]?.split('_');

    const sourceList: DataSource[] = [];
    codeList.forEach((key, index) => {
      if (index === 0) {
        const source = dataSource.find(
          (item: any) => String(item.id) === String(key),
        );
        if (source) {
          sourceList.push(source);
        }
      } else {
        if (!!sourceList.length) {
          const currentSource = sourceList[
            sourceList.length - 1
          ]?.children?.find((item: any) => String(item.id) === String(key));
          if (currentSource) {
            sourceList.push(currentSource);
          }
        }
      }
    });

    const onChange = (secondInfo?: string, otherInfo?: string) => {
      const elements = document.querySelectorAll(
        `[data-label="${placeholderLabel}"]`,
      );
      const elementCursor = Array.from(elements).findIndex((item: Element) => {
        return item.getAttribute('data-unique-id') === uniqueId;
      });

      let currentIndex = 0;
      const result = (value ?? '').replace(
        new RegExp(placeholderLabel, 'g'),
        (match: string) => {
          if (match === placeholderLabel) {
            currentIndex++;
            if (currentIndex === elementCursor + 1) {
              return `${placeholderLabel.split('@')[0]}${
                secondInfo ? `@${secondInfo}` : ''
              }${otherInfo ? `#${otherInfo}` : ''}`;
            }
          }
          return match;
        },
      );

      props.onChange?.([
        formula.toString(formula.toData(result)),
        formula.toData(result),
      ]);
    };

    onPlaceholderClick?.({
      secondInfo,
      otherInfo,
      sourceList,
      onChange,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.operators}>
          {operators.map((i) => (
            <div
              key={i}
              className={styles.operator}
              onClick={() => insertStr(i)}
            >
              {i}
            </div>
          ))}
        </div>
        {mapData && (
          <CodeMirror
            ref={editor}
            theme="none"
            value={value}
            height="160px"
            className={styles.editor}
            basicSetup={false}
            extensions={[
              placeholders(mapData, handlePlaceholderClick),
              EditorView.lineWrapping,
            ]}
            onChange={(v) => setValue(v)}
            onStatistics={(data) => {
              setCursor(data.selectionAsSingle.from);
            }}
          />
        )}
      </div>
    </>
  );
}

export default FormulaView;
export type { DataSource, FormulaData, Props as FormulaViewProps };
