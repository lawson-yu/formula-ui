import { Input } from 'antd';
import classNames from 'classnames';
import { map } from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import styles from './index.module.scss';

interface DataSource {
  id: number | string;
  label: string;
  code?: string;
  [key: string]: any;
  children?: Array<DataSource & { parentId?: number }>;
}

interface Props {
  /**
   * @description 样式类名
   * @type string
   */
  className?: string;
  /**
   * @description 是否展示搜索框
   * @type boolean
   */
  hasSearch?: boolean;
  /**
   * @description 数据源
   * @type {
   *    id: number;
   *    label: string;
   *    code?: string;
   *    children?: Array<DataSource & { parentId: number }>;
   * }[]
   * @default []
   */
  dataSource: DataSource[];
  /**
   * @description 点击事件
   * @type (current: DataSource,item: DataSource[]) => void
   */
  onClick?: (current: DataSource, items: DataSource[]) => void;
}

const filterGroup = (group: DataSource[], searchVal: string) => {
  const searchValMap = (item: any) => {
    if (!item?.children?.length) return item.label.includes(searchVal);

    return item.children.some(searchValMap);
  };

  return group.filter(
    (item) =>
      item.label.includes(searchVal) || item.children?.some(searchValMap),
  );
};

const DataMenu: FC<Props> & { MenuFoldItem: React.FC<MenuFolderProps> } = (
  props,
) => {
  const { className, onClick, dataSource, hasSearch } = props;

  const [sourceList, setSourceList] = useState<DataSource[]>(dataSource);
  const [openKeys, setOpenKeys] = useState(
    new Set(dataSource.map((item: any) => item.id)),
  );
  const [searchInputValue, setSearchInputValue] = useState('');

  if (dataSource !== sourceList) {
    setOpenKeys(new Set(dataSource.map((item: any) => item.id)));
    setSourceList(dataSource);
  }

  const toggleOpenKey = (openKey: number | string) => {
    if (openKeys.has(openKey)) {
      openKeys.delete(openKey);
    } else {
      openKeys.add(openKey);
    }

    setOpenKeys(new Set(openKeys));
  };

  const handleSearchInputChange = (e: any) => {
    setSearchInputValue(e.target.value);
  };

  const filterSourceList = useMemo(() => {
    return filterGroup(sourceList, searchInputValue);
  }, [sourceList, searchInputValue]);

  return (
    <div className={classNames(styles.block, className)}>
      {!!hasSearch && (
        <Input
          maxLength={30}
          className={styles.searchCtrl}
          value={searchInputValue}
          onChange={handleSearchInputChange}
          placeholder={'请输入数据名称'}
        />
      )}
      <div className={styles.scrollBlock}>
        <div className={styles.listBox}>
          {filterSourceList.map((group) => (
            <div
              key={group.id}
              className={classNames(
                styles.listGroup,
                openKeys.has(group.id) && styles.open,
              )}
            >
              <div className={styles.listGroupItem}>
                <div
                  className={styles.groupLabel}
                  onClick={() => onClick?.(group, [group])}
                >
                  {group.label}
                </div>
                <div
                  onClick={() => toggleOpenKey(group.id)}
                  className={classNames(
                    styles.fold,
                    openKeys.has(group.id) && styles.foldRotate,
                  )}
                />
              </div>
              <div className={styles.listGroupChildren}>
                {map(group.children, (item) => (
                  <DataMenu.MenuFoldItem
                    item={item}
                    levels={[group, item]}
                    onClick={onClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MenuFolderProps {
  item: DataSource;
  levels: DataSource[];
  onClick?: (...arg: any[]) => void;
}

const MenuFoldItem: FC<MenuFolderProps> = (props) => {
  const { item, levels, onClick } = props;
  const [openKey, setOpenKey] = useState(new Set());

  const toggleOpenKey = (key: string | number) => {
    if (openKey.has(key)) {
      openKey.delete(key);
    } else {
      openKey.add(key);
    }

    setOpenKey(new Set(openKey));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          onClick={() => toggleOpenKey(item.id)}
          className={classNames(
            !!item?.children?.length && styles.fold,
            openKey.has(item.id) && styles.foldRotate,
          )}
        />
        <div
          className={classNames(styles.item, styles.supItem)}
          key={item.id}
          onClick={() => {
            onClick?.(item, levels);
          }}
        >
          {item.label}
        </div>
      </div>
      <div
        className={classNames(
          styles.hidden,
          openKey.has(item.id) && styles.show,
        )}
      >
        {!!item?.children?.length
          ? map(item.children, (item) => (
              <DataMenu.MenuFoldItem
                key={item.id}
                item={item}
                levels={[...levels, item]}
                onClick={onClick}
              />
            ))
          : null}
      </div>
    </div>
  );
};

DataMenu.MenuFoldItem = MenuFoldItem;

export default DataMenu;
export type { Props as DataMenuProps, DataSource };
