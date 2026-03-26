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
