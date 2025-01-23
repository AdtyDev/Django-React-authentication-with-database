import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/Notfound"
import ProtectedRoute from "./components/ProtectedRoutes"

function Logout(){
  // when log out it clears access and refresh token
  localStorage.clear()
  return <Navigate to="/login" /> 
}

function RegisterAndLogout(){
  // making sure to not error when registering so we
  // do not get submitting our tokens to it that can lead to error
  localStorage.clear()
  return <Register/>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path ="/"
          element ={
            <ProtectedRoute>
              {/* the idea is you do not acces the home until you re authorized */}
              <Home/>
            </ProtectedRoute>
          }
          />
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        {/* if it is anything else "*" beside home,login,register it redirects to notfound page */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
