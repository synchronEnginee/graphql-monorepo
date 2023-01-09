import { Suspense, useState } from 'react'
import { Skeleton, Typography } from '@mui/material'
import UserInfo from '../components/UserInfo'
import CreateUserForm from '../components/CreateUserForm'

const UserPage = () => {
  const [userId, setUserId] = useState(1)
  return (
    <>
      <Typography mt={2}>ユーザページ</Typography>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <UserInfo userId={userId} />
      </Suspense>
      <CreateUserForm />
    </>
  )
}

export default UserPage
