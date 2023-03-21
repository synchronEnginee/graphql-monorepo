/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Column, Table } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'

// Render Propsです
type DebouncedInputProps = {
  render: (
    value: string | number | string[],
    onChange: (value: string | number | string[]) => void,
  ) => JSX.Element
  onChange: (value: string | number | string[]) => void
  initialValue: string | number | string[]
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

/**
 * フィルタコンポーネント用のINPUTラッパー
 * Render Propsパターン
 * @param param0
 * @returns
 */
const DebouncedInputWrapper = ({
  render,
  initialValue,
  debounce = 500,
  onChange,
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return render(value, onChange)
}

/**
 * 数字系のフィルターコンポーネント
 * minとmaxの２つを入力
 * @param column
 * @returns
 */
const NumberFilterInput = ({ column }: { column: Column<any, unknown> }) => {
  const inputStyle = { width: '8rem' }
  return (
    <>
      <DebouncedInputWrapper
        initialValue={(column.getFilterValue() as [number, number])?.[0] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        render={(value, onChange) => (
          <TextField
            inputProps={{
              min: Number(column.getFacetedMinMaxValues()?.[0] ?? ''),
              max: Number(column.getFacetedMinMaxValues()?.[1] ?? ''),
            }}
            type="number"
            // size={'small'}
            sx={inputStyle}
            label={'min'}
            value={value as number}
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <DebouncedInputWrapper
        initialValue={(column.getFilterValue() as [number, number])?.[1] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        render={(value, onChange) => (
          <TextField
            inputProps={{
              min: Number(column.getFacetedMinMaxValues()?.[0] ?? ''),
              max: Number(column.getFacetedMinMaxValues()?.[1] ?? ''),
            }}
            type="number"
            // size={'small'}
            sx={inputStyle}
            label={'max'}
            value={value as number}
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
    </>
  )
}
/**
 * テキストフィルターコンポーネント
 * @param column カラム
 * @param sortedUniqueValues 一意な値リスト
 * @returns
 */
const StringFilterInput = ({
  column,
  sortedUniqueValues,
}: {
  column: Column<any, unknown>
  sortedUniqueValues: any[]
}) => (
  <>
    <DebouncedInputWrapper
      onChange={(value) => column.setFilterValue(value)}
      initialValue={(column.getFilterValue() as string) ?? ''}
      render={(value, onChange) => (
        <Autocomplete
          id={`${column.columnDef.header as string}-filter`}
          options={Array.from(
            new Set(['', ...sortedUniqueValues.slice(0, 5000)]),
          )}
          multiple={false}
          value={value as string}
          onInputChange={(event, v, reason) => onChange(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={column.columnDef.header as string}
              placeholder={`Search... (${
                column.getFacetedUniqueValues().size
              })`}
            />
          )}
        />
      )}
    />
  </>
)

/**
 * 日付のフィルターコンポーネント
 * 開始日と終了日の２つを入力
 * @param column カラム
 * @returns
 */
const DateFilterInput = ({ column }: { column: Column<any, unknown> }) => {
  const inputStyle = { width: '8rem' }
  return (
    <>
      <DebouncedInputWrapper
        initialValue={(column.getFilterValue() as [string, string])?.[0] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        render={(value, onChange) => (
          <TextField
            type={'date'}
            // size={'small'}
            sx={inputStyle}
            // label={}
            value={value as string}
            placeholder={'開始日'}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <DebouncedInputWrapper
        initialValue={(column.getFilterValue() as [string, string])?.[1] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        render={(value, onChange) => (
          <TextField
            type={'date'}
            // size={'small'}
            sx={inputStyle}
            // label={}
            value={value as string}
            placeholder={'終了日'}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
    </>
  )
}

/**
 * テキストフィルターコンポーネント
 * @param column カラム
 * @param sortedUniqueValues 一意な値リスト
 * @returns
 */
const ArrayFilterInput = ({
  column,
  sortedUniqueValues,
}: {
  column: Column<any, unknown>
  sortedUniqueValues: string[][]
}) => {
  // 二次元配列になっているので、一次元へ戻す
  const uniqueOptions = useMemo(
    () => [
      ...new Set(sortedUniqueValues.reduce((acc, val) => acc.concat(val), [])),
    ], // 一次元配列から重複を除いたSetを作成し、再び配列に変換して返す
    [sortedUniqueValues],
  )
  return (
    <>
      <DebouncedInputWrapper
        onChange={(value) => column.setFilterValue(value)}
        initialValue={[...new Set(column.getFilterValue() as string[])] ?? []}
        render={(value, onChange) => (
          <Autocomplete
            disablePortal
            multiple
            id={`${column.columnDef.header as string}-filter`}
            options={uniqueOptions}
            defaultValue={value as string[]}
            onChange={(event, v) => onChange(v)}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            renderInput={(params) => (
              <TextField
                {...params}
                label={column.columnDef.header as string}
                placeholder={`Search... (${
                  column.getFacetedUniqueValues().size
                })`}
              />
            )}
          />
        )}
      />
    </>
  )
}
// カラム定義で指定できるフィルターの種類
export const filterDictionary = {
  string: StringFilterInput,
  number: NumberFilterInput,
  date: DateFilterInput,
  array: ArrayFilterInput,
}

/**
 * テーブルで扱うフィルターコンポーネント
 * カラム定義のmetaデータを基に判別し、metaで指定されたフィルターを出力
 * @param column {@link Column}
 * @param Table {@link Table}
 * @returns
 */
const TableFilter = ({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) => {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id)

  // columnで定義したmetaデータからフィルターで利用する型を取得(デフォルトはstring)
  const typeForFilter = column.columnDef.meta?.typeForFilter ?? 'string'

  const sortedUniqueValues = useMemo(
    () =>
      typeForFilter === 'number'
        ? []
        : // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
          Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  )

  return filterDictionary[typeForFilter]({ column, sortedUniqueValues })
}

export default TableFilter
