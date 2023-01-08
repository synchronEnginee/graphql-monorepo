import { Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { GetUserByIdDocument } from '../../../gql/graphql'

type UserInfoProps = {
  userId: number
}

const UserInfo = (props: UserInfoProps) => {
  const { userId } = props
  const { data } = useQuery(
    ['userInfo'],
    async () =>
      await request('http://localhost:5000/graphql', GetUserByIdDocument, {
        id: userId,
      }),
  )
  return (
    <>
      <Typography>ユーザ情報</Typography>
      {data?.getUserById != null ? (
        <>
          <Typography>{`あなたのIDは${data.getUserById.id}です`}</Typography>
          <Typography>{`${data.getUserById.name}さん、ようこそ`}</Typography>
        </>
      ) : null}
    </>
  )
}

export default UserInfo
