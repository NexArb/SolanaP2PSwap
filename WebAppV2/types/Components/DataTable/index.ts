import { ReactElement } from 'react';

export type DataTableColumnType<T> = {
  /** Key in the data object representing this column's data */
  key?: keyof T;
  /** Title of the column shown in header */
  title: string;
  /** Styling to apply to this column
   * @param row Data of the row
   * @param index Index of the row
   */
  cellStyle?: (row: T, index: number) => string;
  /** Custom element to render for this column
   * @param row Data of the row
   * @param index Index of the row
   */
  cellRender?: (
    row: T,
    index: number,
  ) => ReactElement | ReactElement[] | string;
  /** Show tooltip along with header */
  hint?: string;
  /** Custom element to render header for this column */
  cellHeaderRender?: () => ReactElement | ReactElement[] | string;
  /** sort Key in the data object representing this column's data */
  sortKey?: string;
};

export type DataTablePropsType<T> = {
  /** List of Columns for the table */
  cols: DataTableColumnType<T>[];
  /** Data for the table */
  data?: T[];
  /** Indicator for loading */
  loading?: boolean;
  /** Error to show */
  error?: Error;
  /** Action performed on clicking a row
   * @param row Data of the row
   * @param index Index of the row
   */
  onRowClick?: (row: T, index: number) => void;
  /** Styling to apply to a row
   * @param row Data of the row
   * @param index Index of the row
   */
  rowStyle?: (row: T, index: number) => string;
  /** Message to show when there is no data */
  noDataMessage?: string;
  /** Variant for card container */
  elevated?: boolean;
  /** Appends another row below this row with given node as content
   * @param row Data of the row
   * @param index Index of the row
   */
  rowChild?: (row: T, index: number) => React.ReactNode;
  /** True if header is rounded */
  rounded?: boolean;
};
