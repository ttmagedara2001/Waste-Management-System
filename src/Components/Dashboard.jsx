import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CommandCenter from './CommandCenter';
import LiveOperationsMap from './LiveOperationsMap';
import Analytics from './Analytics';
import FleetManagement from './FleetManagement';
import AlertsSettings from './AlertsSettings';
import ToastContainer from './ToastContainer';
import wsService from '../services/websocketService';
import mockData from '../data/mockData.json';

function Dashboard() {
  const [data, setData] = useState(mockData);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Connect to WebSocket service
    wsService.connect();

    // Subscribe to real-time updates
    wsService.on('binUpdate', handleBinUpdate);
    wsService.on('truckUpdate', handleTruckUpdate);
    wsService.on('alert', handleAlert);
    wsService.on('activity', handleActivity);

    // Cleanup on unmount
    return () => {
      wsService.disconnect();
      wsService.off('binUpdate', handleBinUpdate);
      wsService.off('truckUpdate', handleTruckUpdate);
      wsService.off('alert', handleAlert);
      wsService.off('activity', handleActivity);
    };
  }, []);

  const handleBinUpdate = (update) => {
    console.log('Bin update received:', update);
    
    setData((prevData) => ({
      ...prevData,
      bins: prevData.bins.map((bin) =>
        bin.id === update.binId
          ? {
              ...bin,
              fillLevel: update.fillLevel,
              temperature: update.temperature,
              status: update.fillLevel >= 80 ? 'critical' : 'normal'
            }
          : bin
      )
    }));

    // Show toast notification for critical bins
    if (update.fillLevel >= 80) {
      addToast({
        type: 'warning',
        title: 'Critical Bin Alert',
        message: `Bin #${update.binId} is ${update.fillLevel}% full`,
        duration: 5000
      });
    }
  };

  const handleTruckUpdate = (update) => {
    console.log('Truck update received:', update);
    
    setData((prevData) => ({
      ...prevData,
      trucks: prevData.trucks.map((truck) =>
        truck.id === update.truckId
          ? {
              ...truck,
              location: update.location,
              status: update.status,
              lastUpdate: update.timestamp
            }
          : truck
      )
    }));
  };

  const handleAlert = (alert) => {
    console.log('Alert received:', alert);
    
    const newAlert = {
      id: Date.now(),
      type: alert.type,
      message: alert.message,
      binId: alert.binId,
      timestamp: alert.timestamp,
      read: false
    };

    setData((prevData) => ({
      ...prevData,
      alerts: [newAlert, ...prevData.alerts]
    }));

    // Show toast notification
    addToast({
      type: alert.type === 'critical' ? 'error' : 'warning',
      title: alert.type === 'critical' ? 'Critical Alert' : 'Warning',
      message: alert.message,
      duration: 5000
    });
  };

  const handleActivity = (activity) => {
    console.log('Activity received:', activity);
    
    const newActivity = {
      id: Date.now(),
      type: activity.type,
      message: activity.message,
      binId: activity.binId,
      truckId: activity.truckId,
      timestamp: activity.timestamp
    };

    setData((prevData) => ({
      ...prevData,
      recentActivities: [newActivity, ...prevData.recentActivities].slice(0, 10)
    }));
  };

  const addToast = (toast) => {
    const newToast = {
      id: Date.now(),
      ...toast
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<CommandCenter data={data} />} />
        <Route
          path="/map"
          element={<LiveOperationsMap bins={data.bins} trucks={data.trucks} />}
        />
        <Route path="/analytics" element={<Analytics data={data} />} />
        <Route
          path="/fleet"
          element={<FleetManagement trucks={data.trucks} bins={data.bins} />}
        />
        <Route
          path="/settings"
          element={<AlertsSettings alerts={data.alerts} settings={data.settings} />}
        />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
}

export default Dashboard;