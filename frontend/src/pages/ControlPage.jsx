import React, { useState ,useEffect} from "react";
import { useParams} from "react-router-dom";
import { useMqtt } from "../lib/MqttContext";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { Pencil } from "lucide-react";

const ControlPage = () => {
  const { deviceId } = useParams();
  const { mqttClient } = useMqtt();
  const { authUser,checkAuth } = useAuthStore();

  const selectedDevice = authUser.devices.find(device => device.deviceId === deviceId);
  const roomDevices = selectedDevice ? selectedDevice.switches : [];

  const [roomName, setRoomName] = useState(selectedDevice ? selectedDevice.name : "Loading...");
  const [editingRoomName, setEditingRoomName] = useState(false);
  const [editingSwitch, setEditingSwitch] = useState(null);

  useEffect(() => {
    if (selectedDevice) {
      setRoomName(selectedDevice.name); 
    }
  }, [selectedDevice]);

  const [deviceStates, setDeviceStates] = useState(
    roomDevices.reduce((acc, switchItem) => {
      acc[switchItem.id] = { isOn: false, speed: 50, name: switchItem.name };
      return acc;
    }, {})
  );

  const publishToMQTT = (switchId, message,type) => {
    if (mqttClient) {
      const topic = `${authUser._id}/${deviceId}/${switchId}/${type}`;
      mqttClient.publish(topic, message);
      console.log(`📢 Published to ${topic}: ${message}`);
    } else {
      console.log("⚠️ MQTT client is not connected.");
    }
  };

  const togglePower = (switchId) => {
    setDeviceStates(prev => {
      const newState = !prev[switchId].isOn;
      const updatedStates = { ...prev, [switchId]: { ...prev[switchId], isOn: newState } };

      publishToMQTT(switchId, newState ? "1" : "0","power");
      return updatedStates;
    });
  };

  const changeSpeed = (switchId, value) => {
    setDeviceStates(prev => {
      const updatedStates = { ...prev, [switchId]: { ...prev[switchId], speed: value } };

      if (updatedStates[switchId].isOn) {
        publishToMQTT(switchId, `${value}`,"speed");
      }
      return updatedStates;
    });
  };

  const updateRoomName = async () => {
    setEditingRoomName(false);
    try {
      await axiosInstance.put(`/devices/rename-room/${authUser._id}/${deviceId}`, { newName: roomName });
      await checkAuth(); 
    } catch (error) {
      console.error("Error updating room name:", error);
    }
  };

  const updateSwitchName = async (switchId) => {
    setEditingSwitch(null);
    try {
      await axiosInstance.put(`/devices/rename-switch/${authUser._id}/${deviceId}/${switchId}`, {
        newName: deviceStates[switchId].name
      });
      await checkAuth()
    } catch (error) {
      console.error("Error updating switch name:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        {editingRoomName ? (
          <div className="flex gap-2">
            <input
              type="text"
              className="text-2xl font-semibold border p-1 rounded"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateRoomName()}
              autoFocus
            />
            <button onClick={updateRoomName} className="btn btn-primary">Save</button>
          </div>
        ) : (
          <h2 className="text-2xl font-semibold">{roomName}</h2>
        )}
        <button onClick={() => setEditingRoomName(!editingRoomName)}>
          <Pencil size={20} />
        </button>
      </div>

      {roomDevices.map((switchItem) => (
        <div key={switchItem.id} className="p-4 border rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center mb-2">
            {editingSwitch === switchItem.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="text-lg font-medium border p-1 rounded"
                  value={deviceStates[switchItem.id].name}
                  onChange={(e) =>
                    setDeviceStates((prev) => ({
                      ...prev,
                      [switchItem.id]: { ...prev[switchItem.id], name: e.target.value }
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && updateSwitchName(switchItem.id)}
                  autoFocus
                />
                <button onClick={() => updateSwitchName(switchItem.id)} className="btn btn-primary">Save</button>
              </div>
            ) : (
              <h3 className="text-lg font-medium">{deviceStates[switchItem.id].name}</h3>
            )}
            <button onClick={() => setEditingSwitch(switchItem.id)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="flex justify-between items-center my-2">
            <span>Power</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={deviceStates[switchItem.id].isOn}
              onChange={() => togglePower(switchItem.id)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Speed:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={deviceStates[switchItem.id].speed}
              className="range range-primary w-full"
              onChange={(e) => changeSpeed(switchItem.id, Number(e.target.value))}
              disabled={!deviceStates[switchItem.id].isOn}
            />
            <span>{deviceStates[switchItem.id].speed}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ControlPage;
