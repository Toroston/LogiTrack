import LogiTrack from './components/LogiTrack.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes/Routes'

export const App = () => {
  return (
      <>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </>
    )
}
