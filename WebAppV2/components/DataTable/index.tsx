import {
  DataTableColumnType,
  DataTablePropsType,
} from '@/types/Components/DataTable';
import React, { ReactNode, useState } from 'react';
import Loader from '../Loader';
import { useTheme } from '@/hooks/theme';
import Tooltip from '../Tooltip';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons';
import Typography from '../Typography';
import Icon from '../Icon';
import Stack from '../Stack';
import { faSort, faSortUp, faSortDown } from '@fortawesome/pro-solid-svg-icons';

type SortingDirection = 'asc' | 'desc' | 'default';

type SortingConfig = {
  sortKey: string;
  direction: SortingDirection;
};

const DataTable = <T,>({
  cols,
  loading,
  error,
  data,
  onRowClick,
  rowStyle,
  noDataMessage,
  rowChild,
  rounded,
}: DataTablePropsType<T>) => {
  const { palette } = useTheme();
  const [sortingConfig, setSortingConfig] = useState<SortingConfig | null>({
    sortKey: '',
    direction: 'default',
  });

  const direction = (direction: SortingDirection) => {
    switch (direction) {
      case 'asc':
        return 'desc';
      case 'desc':
        return 'default';
      default:
        return 'asc';
    }
  };
  const handleHeaderClick = (sortKey: string) => {
    if (!sortKey) return;
    if (sortingConfig?.sortKey === sortKey) {
      // Toggle the direction if the same column is clicked again
      setSortingConfig(
        (prevConfig) =>
          ({
            ...prevConfig,
            direction: direction(prevConfig?.direction ?? 'default'),
          }) as SortingConfig | null,
      );
    } else {
      // Set the new column and default direction for a different column
      setSortingConfig({ sortKey, direction: 'asc' });
    }
  };

  const sortedData = () => {
    if (!sortingConfig || sortingConfig.direction === 'default') {
      return data;
    }
    return [...(data ?? [])]?.slice().sort((a, b) => {
      const valueA = getNestedPropertyValue(a, sortingConfig.sortKey);
      const valueB = getNestedPropertyValue(b, sortingConfig.sortKey);

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortingConfig?.direction === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      const strA = String(valueA)?.toLowerCase();
      const strB = String(valueB)?.toLowerCase();

      return sortingConfig?.direction === 'asc'
        ? strA?.localeCompare(strB)
        : strB?.localeCompare(strA);
    });
  };
  const getNestedPropertyValue = (obj: any, key: string) => {
    const keys = key?.split('.');
    return keys?.reduce((acc, k) => {
      if (k?.includes('[')) {
        const [arrayKey, index] = k.split(/[[\]]/).filter(Boolean);
        return acc ? acc[arrayKey][index] : undefined;
      }
      return acc ? acc[k] : undefined;
    }, obj);
  };
  const createRowProps = (a: T, index: number) => {
    return onRowClick
      ? {
          onClick: () => onRowClick(a, index),
          className:
            'cursor-pointer hover:bg-surface-dark dark:hover:bg-surfaceDark-dark',
        }
      : {};
  };

  const createCell = (c: DataTableColumnType<T>, a: T, index: number) => {
    const key = c.key ? (a[c.key] as ReactNode) : <></>;
    return (
      <td
        className={`p-2 md:px-4 text-sm border-none dark:text-primaryDark text-primary ${
          c?.cellStyle ? c?.cellStyle(a, index) : ''
        }`}
      >
        {c.cellRender ? c.cellRender(a, index) : key}
      </td>
    );
  };
  const createRow = (a: T, index: number) => {
    const rowProps = createRowProps(a, index);

    return (
      <>
        <tr
          className={`border-b mt-1 dark:border-surfaceDark-dark border-surface-dark ${
            rowStyle ? rowStyle(a, index) : ''
          }`}
          {...rowProps}
        >
          {cols?.map((c) => createCell(c, a, index))}
        </tr>
        <tr>
          <td colSpan={cols.length}>{rowChild?.(a, index)}</td>
        </tr>
      </>
    );
  };
  const tableBody = () => {
    if (!data) return null;
    return sortedData()?.map((a, i) => createRow(a, i));
  };

  const loadingComponent = () => {
    return (
      <div className="flex items-center justify-center mt-2 space-y-1">
        {loading && <Loader size={'sm'} />}
        {error && (
          <div className="bg-error dark:bg-errorDark text-white py-2 px-4 rounded">
            {error?.message}
          </div>
        )}
        {!loading && !error && (
          <p className={`text-sm dark:text-primaryDark text-primary`}>
            {noDataMessage ?? 'No data available'}
          </p>
        )}
      </div>
    );
  };
  const renderSortIcon = (c: DataTableColumnType<T>) => {
    if (c?.sortKey !== sortingConfig?.sortKey) {
      return <Icon icon={faSort} size="sm" />;
    }
    switch (sortingConfig?.direction) {
      case 'default':
        return <Icon icon={faSort} size="sm" />;
      case 'asc':
        return <Icon icon={faSortUp} size="sm" />;

      default:
        return <Icon icon={faSortDown} size="sm" />;
    }
  };
  const renderHeader = (c: DataTableColumnType<T>) => {
    const text = c?.hint ? (
      <div className="space-x-1 flex items-center">
        <Typography text={c?.title} variant="subtitle2" />
        <Tooltip text={c?.hint}>
          <div className="text-typography dark:text-typographyDark">
            <Icon icon={faInfoCircle} size="md" color={palette.surface.muted} />
          </div>
        </Tooltip>
      </div>
    ) : (
      <Typography text={c?.title} variant="subtitle2" />
    );
    return c?.cellHeaderRender ? c?.cellHeaderRender() : text;
  };
  const roundedBorder = rounded ? 'rounded-sm' : '';
  const roundedFirstCell = (i: number) => {
    return rounded && i === 0 ? 'rounded-tl-sm rounded-bl-sm' : '';
  };
  const roundedLastCell = (i: number) => {
    return rounded && i === cols?.length - 1
      ? 'rounded-tr-sm rounded-br-sm'
      : '';
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className={roundedBorder}>
          <tr className={`dark:bg-surfaceDark bg-surface ${roundedBorder}`}>
            {cols?.map((c, i) => (
              <th
                key={(c?.key ?? i) as string}
                onClick={() => handleHeaderClick(c?.sortKey ?? '')}
                className={`${roundedFirstCell(i)} ${roundedLastCell(
                  i,
                )} px-4 py-2 text-sm font-semibold text-left dark:text-primaryDark text-primary`}
              >
                <Stack
                  isRow
                  className={`space-x-1.5 items-center ${
                    c?.sortKey && 'cursor-pointer'
                  }`}
                >
                  <>{renderHeader(c)}</>
                  {c?.sortKey && (
                    <span key={c?.sortKey}> {renderSortIcon(c)}</span>
                  )}
                </Stack>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{!loading && !error && data ? tableBody() : null}</tbody>
      </table>
      {(!data?.length || loading || error) && loadingComponent()}
    </div>
  );
};
export default DataTable;
