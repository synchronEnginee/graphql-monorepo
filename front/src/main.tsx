import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import QueryProvider from './provider/query/QueryProvider'

import './index.css'
import MUIStyleProvider from './provider/ui/MUIStyleProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MUIStyleProvider>
      <Router>
        <QueryProvider>
          <App />
        </QueryProvider>
      </Router>
    </MUIStyleProvider>
  </React.StrictMode>,
)
