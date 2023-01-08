import { Suspense, useState } from 'react'
import { Skeleton, Typography } from '@mui/material'
import UserInfo from '../components/UserInfo'

const UserPage = () => {
  const [userId, setUserId] = useState(1)
  return (
    <>
      <Typography mt={2}>ユーザページ</Typography>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <UserInfo userId={userId} />
      </Suspense>
    </>
  )
}

export default UserPage
