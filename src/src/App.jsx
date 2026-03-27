import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes/Routes'
import { useState } from 'react';
import Login from './components/Login/Login';

export const App = () => {

  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <BrowserRouter>
      <Routes user={user} setUser={setUser} />
    </BrowserRouter>
  );
};