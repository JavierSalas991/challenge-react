import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/login/main/Main';
import Login from './components/login/Login';
import AuthState from './context/authContext/AuthState';

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/main' element={<Main></Main>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
