/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable react/jsx-key */
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { SxProps, Theme } from '@mui/material'
import { grey } from '@mui/material/colors'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingFn,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { arrayFilter } from './filter/arrayFilter'
import { dateFilter } from './filter/dateFilter'
import PaginationParts from './parts/PaginationParts'
import TableFilter, { filterDictionary } from './parts/TableFilter'

declare module '@tanstack/table-core' {
  interface FilterFns {
    date: FilterFn<any>
    array: FilterFn<any>
  }
  interface SortingFns {
    japanese: SortingFn<any>
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    // どんなフィルターを出せばよいか判別するためのメタデータ
    typeForFilter?: keyof typeof filterDictionary
  }
}

// 日本語ソート
const JapaneseSort: SortingFn<any> = (rowA: any, rowB: any, columnId) => {
  return rowA.getValue(columnId).localeCompare(rowB.getValue(columnId), 'ja')
}

type Props<D extends Object> = {
  columns: Array<ColumnDef<D>>
  data: D[]
  headerRowStyle?: SxProps<Theme>
  columnRowStyle?: SxProps<Theme>
  columnCellStyle?: SxProps<Theme>
  filterRowStyle?: SxProps<Theme>
  filterCellStyle?: SxProps<Theme>
  dataCellStyle?: SxProps<Theme>
  stickyHeader?: boolean
  paginationOnePageRecordSize?: number[]
  disablePaging?: boolean
}

/**
 * 基本のテーブル
 * react-table + MUI
 * @param columns {@link Column}カラム
 * @param data テーブルのデータ
 * @params {@link Props}
 * @returns
 */
const TanstackTable = <D extends Object>({
  columns,
  data,
  headerRowStyle,
  columnRowStyle,
  columnCellStyle,
  filterRowStyle,
  filterCellStyle,
  dataCellStyle,
  stickyHeader,
  paginationOnePageRecordSize,
  disablePaging,
}: Props<D>) => {
  // const rerender = useReducer(() => ({}), {})[1]

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    // カスタムフィルター
    filterFns: {
      date: dateFilter,
      array: arrayFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: disablePaging ? undefined : getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
    sortingFns: {
      japanese: JapaneseSort,
    },
  })

  // Render the UI for your table
  return (
    <>
      <MuiTable>
        <TableHead
          sx={
            stickyHeader
              ? {
                  position: 'sticky',
                  top: 0,
                  zIndex: 2,
                  ...headerRowStyle,
                }
              : { ...headerRowStyle }
          }
        >
          {table.getHeaderGroups().map((headerGroup, i) => (
            <>
              {/* フィルターのINPUT行 */}
              <TableRow key={`filterrow-${i}`} sx={filterRowStyle}>
                {headerGroup.headers.map((header, i) => (
                  <TableCell
                    key={`filter-${header.id}-${i}`}
                    sx={filterCellStyle}
                  >
                    {header.column.getCanFilter() ? (
                      <TableFilter column={header.column} table={table} />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
              {/* カラム名とソート */}
              <TableRow key={`columnrow-${i}`} sx={columnRowStyle}>
                {headerGroup.headers.map((header, i) => (
                  <TableCell
                    key={`column-${header.id}-${i}`}
                    onClick={header.column.getToggleSortingHandler()}
                    sx={columnCellStyle}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                    {{ asc: <ArrowUpwardIcon />, desc: <ArrowDownwardIcon /> }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={`row-${row.id}`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={`cell-${cell.id}`} sx={dataCellStyle}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MuiTable>
      {/* ページネーション部分 */}
      {!disablePaging && (
        <PaginationParts
          toFirstIndex={() => table.setPageIndex(0)}
          toPreviousPage={() => table.previousPage()}
          toNextPage={() => table.nextPage()}
          toLastIndex={() => table.setPageIndex(table.getPageCount() - 1)}
          disabledPrevious={!table.getCanPreviousPage()}
          disabledNext={!table.getCanNextPage()}
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          setPageIndex={(num: number) => table.setPageIndex(num)}
          pageSizeNow={table.getState().pagination.pageSize}
          setPageSize={(num: number) => table.setPageSize(num)}
          paginationOnePageRecordSize={paginationOnePageRecordSize}
        />
      )}
    </>
  )
}

export default TanstackTable
