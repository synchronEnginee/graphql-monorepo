import { Navigate } from 'react-router-dom'
import UserPage from '../../features/user/layout/UserPage'
import MockPage from '../../features/mock/MockPage'
import MockPage2 from '../../features/mock/MockPage2'

export const rootPath = [
  { path: '/mock', element: <MockPage /> },
  { path: '/mock2', element: <MockPage2 /> },
  {
    path: '/*',
    element: <UserPage />,
  },
]
