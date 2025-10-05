import React from 'react'
import { Route, Routes } from 'react-router'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import AuthMiddlewares from './Middlewares/AuthMiddlewares'



function App() {


  return (
    <div>
       <Routes>
        <Route path='/' element={<LoginScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route element={<AuthMiddlewares/>}>
          <Route path='/home' element={<h1>Home</h1>} />
        </Route>
      </Routes> 
      <h1>Hola mundo</h1> 
    </div>

  )
}

export default App
