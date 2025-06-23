import React, { createContext, useContext, useEffect, useState } from "react";
import mqtt from "mqtt";
import { useAuthStore } from "../store/useAuthStore"; 

const MQTT_BROKER_URL = "ws://192.168.1.8:8883"; 

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
  const { authUser } = useAuthStore();
  const [mqttClient, setMqttClient] = useState(null);

  useEffect(() => {
    if (authUser) {

      const clientId = authUser._id

      // Connect only after login
      const client = mqtt.connect(MQTT_BROKER_URL, {
        clientId, // ✅ Unique ID per user session
        clean: true, // Ensures a fresh session on reconnection
        reconnectPeriod: 5000, // Auto-reconnect every 5 seconds
      });

      client.on("connect", () => {
        console.log("✅ Connected to MQTT Broker");
      });

      setMqttClient(client);

      return () => {
        client.end(); // Disconnect when the app unmounts
      };
    }
  }, [authUser]);

  return (
    <MqttContext.Provider value={{ mqttClient }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
