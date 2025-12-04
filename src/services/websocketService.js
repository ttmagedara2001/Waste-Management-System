// WebSocket Service for Real-Time Updates
// This is a mock implementation that simulates WebSocket updates using intervals

class WebSocketService {
  constructor() {
    this.listeners = {
      binUpdate: [],
      truckUpdate: [],
      alert: [],
      activity: [],
    };
    this.isConnected = false;
    this.simulationInterval = null;
  }

  connect() {
    console.log("WebSocket: Connecting...");

    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      console.log("WebSocket: Connected");
      this.startSimulation();
    }, 1000);
  }

  disconnect() {
    console.log("WebSocket: Disconnecting...");
    this.isConnected = false;
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }

  // Subscribe to specific event types
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  // Unsubscribe from events
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  // Emit events to all listeners
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  // Simulate real-time updates
  startSimulation() {
    // Simulate updates every 10 seconds
    this.simulationInterval = setInterval(() => {
      this.simulateRandomUpdate();
    }, 10000);
  }

  simulateRandomUpdate() {
    const updateTypes = ["binUpdate", "truckUpdate", "alert", "activity"];
    const randomType =
      updateTypes[Math.floor(Math.random() * updateTypes.length)];

    switch (randomType) {
      case "binUpdate":
        this.emit("binUpdate", {
          binId: `BIN${String(Math.floor(Math.random() * 20) + 1).padStart(
            3,
            "0"
          )}`,
          fillLevel: Math.floor(Math.random() * 100),
          temperature: 25 + Math.floor(Math.random() * 15),
          timestamp: new Date().toISOString(),
        });
        break;

      case "truckUpdate":
        this.emit("truckUpdate", {
          truckId: `TRUCK${String(Math.floor(Math.random() * 5) + 1).padStart(
            3,
            "0"
          )}`,
          location: {
            lat: 6.9271 + (Math.random() - 0.5) * 0.1,
            lng: 79.8612 + (Math.random() - 0.5) * 0.1,
          },
          status: ["idle", "en-route", "collecting"][
            Math.floor(Math.random() * 3)
          ],
          timestamp: new Date().toISOString(),
        });
        break;

      case "alert":
        const isCritical = Math.random() > 0.5;
        const binId = `BIN${String(Math.floor(Math.random() * 20) + 1).padStart(
          3,
          "0"
        )}`;
        this.emit("alert", {
          type: isCritical ? "critical" : "warning",
          message: isCritical
            ? `Bin #${binId} critically full (${
                85 + Math.floor(Math.random() * 15)
              }%)`
            : `Bin #${binId} temperature warning (${
                35 + Math.floor(Math.random() * 5)
              }°C)`,
          binId: binId,
          timestamp: new Date().toISOString(),
        });
        break;

      case "activity":
        const activities = [
          { type: "collection", message: "collected successfully" },
          { type: "route", message: "started route" },
          { type: "maintenance", message: "requires inspection" },
        ];
        const activity =
          activities[Math.floor(Math.random() * activities.length)];
        const id =
          activity.type === "route"
            ? `TRUCK${String(Math.floor(Math.random() * 5) + 1).padStart(
                3,
                "0"
              )}`
            : `BIN${String(Math.floor(Math.random() * 20) + 1).padStart(
                3,
                "0"
              )}`;

        this.emit("activity", {
          type: activity.type,
          message: `${id} ${activity.message}`,
          [activity.type === "route" ? "truckId" : "binId"]: id,
          timestamp: new Date().toISOString(),
        });
        break;
    }
  }
}

// Export singleton instance
const wsService = new WebSocketService();
export default wsService;
