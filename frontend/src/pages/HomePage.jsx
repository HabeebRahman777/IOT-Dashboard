import React from "react";
import { Home } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
      <div className="space-y-3">
        {authUser?.devices?.length > 0 ?(
          authUser.devices.map((device, index)=>(
            <button
            key={device.deviceId || index} 
            className="btn btn-primary flex items-center gap-2 w-full"
            onClick={() => navigate(`/control/${device.deviceId}`)}
            >
          <Home size={20} />
          {device.name}
        </button>
          ))
        ):(
          <p className="text-gray-500">No devices found.</p>
        )}
        
      </div>
    </div>
  );
};

export default HomePage;
