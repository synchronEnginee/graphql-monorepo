import { Button, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {}

const MockPage2 = (props: Props) => {
    const navigate = useNavigate()
    const navigateWithState = () => navigate('/mock', {state: {id : 99}})
  return (
    <>
    <Typography>MockPage2</Typography>
    <Button onClick={navigateWithState}>react-routerでstateを渡して遷移</Button>
    </>
  )
}

export default MockPage2