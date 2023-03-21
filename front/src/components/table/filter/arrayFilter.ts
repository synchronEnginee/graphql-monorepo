import { FilterFn, FilterMeta } from '@tanstack/react-table'

/**
 * 配列のフィルター関数
 * @param row テーブルの一つのレコード
 * @param columnId レコードのどのカラムか
 * @param filterValue フィルターに入力された値
 * @param addMeta メタデータに追加する関数
 * @returns
 */
export const arrayFilter: FilterFn<string[]> = (
  row,
  columnId,
  filterValue: string[],
  addMeta: (meta: FilterMeta) => void,
) => {
  const rowValue: string[] = row.getValue(columnId)
  if (filterValue.length === 0) {
    return true
  }
  return filterValue.every((filterVal) => rowValue.includes(filterVal))
}
