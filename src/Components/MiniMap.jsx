import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { TruckIcon } from 'lucide-react';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom truck icon
const createTruckIcon = (status) => {
  const colors = {
    idle: '#6B7280',
    'en-route': '#3B82F6',
    collecting: '#10B981'
  };
  
  return L.divIcon({
    className: 'custom-truck-icon',
    html: `
      <div style="
        background-color: ${colors[status] || '#6B7280'};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
          <path d="M15 18H9"></path>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
          <circle cx="17" cy="18" r="2"></circle>
          <circle cx="7" cy="18" r="2"></circle>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const MiniMap = ({ trucks = [], className = '' }) => {
  const colomboCenter = [6.9271, 79.8612];

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
        <h2 className="text-lg font-bold text-white flex items-center">
          <TruckIcon className="w-5 h-5 mr-2" />
          Active Fleet Overview
        </h2>
      </div>
      
      <div className="h-64 relative">
        <MapContainer
          center={colomboCenter}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {trucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.location.lat, truck.location.lng]}
              icon={createTruckIcon(truck.status)}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{truck.id}</p>
                  <p className="text-gray-600">{truck.driver}</p>
                  <p className="text-xs mt-1">
                    Status: <span className="font-medium capitalize">{truck.status}</span>
                  </p>
                  <p className="text-xs">
                    Load: {truck.currentLoad}/{truck.capacity} kg
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-around text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
            <span className="text-gray-600">Idle</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-gray-600">En Route</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-gray-600">Collecting</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
