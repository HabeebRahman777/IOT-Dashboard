import React from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Home } from "lucide-react"; 

const Navbar = () => {
  const { authUser,clearAuthUser } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      clearAuthUser();
      navigate("/")
      console.log("Logged out successfully");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <nav className="navbar bg-base-100 shadow-md px-6 py-4">
      <div className="flex-1">
        <button 
          className="text-xl font-bold text-primary hover:text-secondary transition-all flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6" /> eAsY HoMe
        </button>
      </div>
      <div className="flex gap-4">
        {authUser?
        <button className="btn btn-error flex items-center gap-2" onClick={logout}>
            <LogOut className="w-5 h-5" />
            Logout
        </button>
        :""}
      </div>
    </nav>
  );
};

export default Navbar;
