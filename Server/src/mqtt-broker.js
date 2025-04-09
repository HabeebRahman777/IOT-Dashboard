import Aedes from "aedes";
import net from "net";
import { WebSocketServer } from "ws";
import http from "http";
import websocketStream from "websocket-stream";

// Initialize Aedes Broker
const aedes = Aedes(); // ✅ Properly instantiate Aedes

// Define Ports
const MQTT_PORT = 1883;  // MQTT (TCP) Port
const WS_PORT = 8883;    // MQTT over WebSockets Port

// TCP Server (MQTT Broker)
const server = net.createServer(aedes.handle);
server.listen(MQTT_PORT, () => {
  console.log(`🚀 Private MQTT Broker running on port ${MQTT_PORT}`);
});

// WebSocket Server for MQTT over WebSockets
const httpServer = http.createServer();
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
  const stream = websocketStream(ws);
  aedes.handle(stream);
});

httpServer.listen(WS_PORT, () => {
  console.log(`🌐 MQTT WebSocket running on ws://localhost:${WS_PORT}`);
});

// Event Handlers
aedes.on("client", (client) => {
  console.log(`✅ Client Connected: ${client.id}`);
});

aedes.on("clientDisconnect", (client) => {
  console.log(`❌ Client Disconnected: ${client.id}`);
});

aedes.on("publish", (packet, client) => {
  if (client) {
    console.log(`📢 Message from ${client.id} on ${packet.topic}: ${packet.payload.toString()}`);
  }
});

aedes.on("subscribe", (subscriptions, client) => {
  console.log(`📌 Client ${client.id} subscribed to ${subscriptions.map(s => s.topic).join(", ")}`);
});
