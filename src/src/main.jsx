import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './App.css'
import GlobalState from './context/GlobalState.jsx'
import Version from './versioninfo.json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalState>
      <App />
      {
        console.log(`%cDelivery Version: ${Version.major}.${Version.minor}.${Version.build}`,
          'color: #f709bb;font-size: 0.8rem;')
      }
    </GlobalState>
  </React.StrictMode>,
)
