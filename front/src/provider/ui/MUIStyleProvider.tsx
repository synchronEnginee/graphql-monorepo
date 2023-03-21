import { blue, grey, red, green } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { jaJP } from '@mui/material/locale'
import { createTheme, ThemeProvider } from '@mui/material/styles'

type Props = {
  children: React.ReactNode
}
export const mainColorDepthList = blue
export const secondaryColorDepthList = red
export const infoColorDepthList = green

// font-familyとカラーを指定しています
export const theme = createTheme(
  {
    palette: {
      primary: {
        main: mainColorDepthList[500],
      },
      secondary: {
        main: secondaryColorDepthList[800],
      },
      info: {
        main: infoColorDepthList[100],
      },
      background: {
        paper: grey[50],
      },
    },
    typography: {
      fontFamily: [
        'Hiragino Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
  jaJP,
)

const MUIStyleProvider = ({ children }: Props) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

export default MUIStyleProvider
