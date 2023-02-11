import { Grid } from '@mui/material'
import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import UserPage from './features/user/layout/UserPage'
import { rootPath } from './provider/react-router/public'
// import reactLogo from './assets/react.svg'
// import './App.css'

const App = () => {
  const [count, setCount] = useState(0)
  const element = useRoutes(rootPath)

  return (
    <Grid margin={'0 1rem'}>
      {element}     
    </Grid>
  )
}

export default App
