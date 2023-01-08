import { useState } from 'react'
import UserPage from './features/user/layout/UserPage'
// import reactLogo from './assets/react.svg'
// import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>Homeページ</div>
      <UserPage />
    </div>
  )
}

export default App
