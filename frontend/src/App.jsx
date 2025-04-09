import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react"
import Navbar from "./components/Navbar";
import { Navigate } from 'react-router-dom';
import ControlPage from "./pages/ControlPage";
import { MqttProvider } from "./lib/MqttContext";

function App() {
  const {authUser,checkAuth} =useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  return (
    <div>
      <MqttProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
          <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />}/>
          <Route path="/control/:deviceId" element={authUser ?<ControlPage />: <Navigate to="/login" />} />
        </Routes>
      </MqttProvider>
    </div>
  )
}

export default App
