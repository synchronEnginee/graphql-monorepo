import { Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

type Props = {}

const MockPage = (props: Props) => {
    const location = useLocation()
    const state = location.state as {id : number}
    console.log(window.history)
    console.log(window.location)
  return (
    <>
    <Typography>MockPage</Typography>
    <Typography>{state.id}</Typography>
    </>
  )
}

export default MockPage