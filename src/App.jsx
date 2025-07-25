import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import Profile from './pages/Profile'
import DataProvider from './GlobalStates'



function App() {

  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path='/' element={<Dashbord />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/home' element={<Home />}>
              <Route path='chatpage' element={<ChatPage />}></Route>
              <Route path='profile' element={<Profile />}></Route>
            </Route>
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </>
  )
}

export default App
