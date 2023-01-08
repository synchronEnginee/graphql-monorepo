import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import QueryProvider from './provider/query/QueryProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
)
