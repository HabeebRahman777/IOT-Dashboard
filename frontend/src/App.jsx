import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react"
import Navbar from "./components/Navbar";
import { Navigate } from 'react-router-dom';
import ControlPage from "./pages/ControlPage";
import { MqttProvider } from "./lib/MqttContext";
import SignupPage from "./pages/SignupPage"
import AdminPage from "./pages/AdminPage"
import AddDevicePage from "./pages/AddDevicePage";
import Entry from "./pages/Entry";

function App() {
  const {authUser,checkAuth,loading} =useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if (loading) return <div className="text-center mt-10">Loading...</div>;


  return (
    <div>
      <MqttProvider>
        <Navbar/>
        <Routes>
          {authUser?.email === "admin@gmail.com" ? (
            <>
            <Route path='/admin' element={authUser ? <AdminPage/> : <Navigate to="/login" />} />
            <Route path='/admin/signup' element={authUser ? <SignupPage/> : <Navigate to="/login" />} />
            <Route path='/admin/add-device' element={authUser ? <AddDevicePage/> : <Navigate to="/login" />} />
            </>
          ):(
            <>
            <Route path="/home" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
            <Route path="/control/:deviceId" element={authUser ?<ControlPage />: <Navigate to="/login" />} /> 
            </>
          )}
          <Route path="/" element={<Entry/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </MqttProvider>
    </div>
  )
}

export default App
