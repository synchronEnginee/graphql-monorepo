import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import {
  Grid,
  IconButton,
  styled,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'

type Pagination = {
  toFirstIndex: () => void
  toPreviousPage: () => void
  toNextPage: () => void
  toLastIndex: () => void
  disabledPrevious: boolean
  disabledNext: boolean
  pageIndex: number
  pageCount: number
  setPageIndex: (num: number) => void
  pageSizeNow: number
  setPageSize: (num: number) => void
  paginationOnePageRecordSize?: number[]
}

const PaginationRowTypography = styled(Typography)`
  margin: auto 0;
` as typeof Typography

const paginationRowStyle = { container: true, justifyContent: 'center' }

/**
 * テーブルのページネーションのUI
 * @param Props {@link Pagination}
 * @returns
 */
const Pagination = ({
  toFirstIndex,
  toPreviousPage,
  toNextPage,
  toLastIndex,
  disabledPrevious,
  disabledNext,
  pageIndex,
  pageCount,
  setPageIndex,
  pageSizeNow,
  setPageSize,
  paginationOnePageRecordSize = [10, 20, 30, 40, 50],
}: Pagination) => (
  <Grid
    height={'8rem'}
    margin={'2rem'}
    alignItems={'center'}
    {...paginationRowStyle}
  >
    <IconButton
      color="primary"
      aria-label="to-first-index"
      component="label"
      onClick={toFirstIndex}
      disabled={disabledPrevious}
    >
      <KeyboardDoubleArrowLeftIcon />
    </IconButton>
    <IconButton
      color="primary"
      aria-label="to-previous-page"
      component="label"
      onClick={toPreviousPage}
      disabled={disabledPrevious}
    >
      <KeyboardArrowLeftIcon />
    </IconButton>
    <IconButton
      color="primary"
      aria-label="to-next-page"
      component="label"
      onClick={toNextPage}
      disabled={disabledNext}
    >
      <KeyboardArrowRightIcon />
    </IconButton>
    <IconButton
      color="primary"
      aria-label="to-last-index"
      component="label"
      onClick={toLastIndex}
      disabled={disabledNext}
    >
      <KeyboardDoubleArrowRightIcon />
    </IconButton>

    <Grid {...paginationRowStyle}>
      <PaginationRowTypography>ページ</PaginationRowTypography>
      <PaginationRowTypography>
        {pageIndex + 1} / {pageCount}
      </PaginationRowTypography>
      <PaginationRowTypography>| ページジャンプ:</PaginationRowTypography>
      <TextField
        type="number"
        size="small"
        defaultValue={pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value !== '' ? Number(e.target.value) - 1 : 0
          setPageIndex(page)
        }}
        disabled={disabledPrevious && disabledNext}
        sx={{ width: '4rem', margin: '0 0.5rem' }}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: '5rem' }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={pageSizeNow}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
          label="Age"
        >
          {paginationOnePageRecordSize.map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              Show {pageSize}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
)

export default Pagination
