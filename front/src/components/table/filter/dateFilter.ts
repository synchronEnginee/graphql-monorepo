import { FilterFn, FilterFnOption, FilterMeta } from '@tanstack/react-table'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
/**
 * 日付のフィルタ用関数
 */
export const dateFilter: FilterFn<string> = (
  row,
  columnId,
  filterValue: [string | null, string | null],
  addMeta: (meta: FilterMeta) => void,
) => {
  const rowValue = row.getValue(columnId)
  const rowValueDate = dayjs(rowValue as string)

  const filterStartDate = filterValue[0] ? dayjs(filterValue[0]) : undefined
  const filterEndDate = filterValue[1] ? dayjs(filterValue[1]) : undefined

  if (filterStartDate && filterEndDate) {
    // 期間の開始・終了が指定されている場合(第4引数で[]を指定することで、開始日終了日もtrue判定)
    const isValid = rowValueDate.isBetween(
      filterStartDate,
      filterEndDate,
      null,
      '[]',
    )
    return isValid
  } else if (filterStartDate && !filterEndDate) {
    // 期間の開始が指定されている場合
    const isValid = rowValueDate.isSameOrAfter(filterStartDate)
    return isValid
  } else if (!filterStartDate && filterEndDate) {
    // 期間の終了が指定されている場合
    const isValid = rowValueDate.isSameOrBefore(filterEndDate)
    return isValid
  } else {
    // 期間が指定されていない場合
    return true
  }
}
