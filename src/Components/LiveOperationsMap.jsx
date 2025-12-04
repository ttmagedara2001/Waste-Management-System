import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import BinDetailDrawer from './BinDetailDrawer';
import MapControls from './MapControls';
import { MapPin } from 'lucide-react';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bin icons based on status
const createBinIcon = (fillLevel, sensorHealth) => {
  let color = '#10B981'; // green for normal
  if (fillLevel >= 80) color = '#EF4444'; // red for critical
  else if (fillLevel >= 70) color = '#F59E0B'; // orange for warning
  
  if (sensorHealth !== 'online') color = '#9CA3AF'; // gray for offline

  return L.divIcon({
    className: 'custom-bin-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
        ${fillLevel >= 80 ? `
          <div style="
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #DC2626;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            color: white;
          ">!</div>
        ` : ''}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

const LiveOperationsMap = ({ bins = [], trucks = [] }) => {
  const [selectedBin, setSelectedBin] = useState(null);
  const [filters, setFilters] = useState({
    showCritical: true,
    showNormal: true,
    showMaintenance: true
  });
  const [mapView, setMapView] = useState('street');

  const colomboCenter = [6.9271, 79.8612];

  // Filter bins based on current filters
  const filteredBins = bins.filter(bin => {
    if (bin.sensorHealth !== 'online' && !filters.showMaintenance) return false;
    if (bin.fillLevel >= 80 && !filters.showCritical) return false;
    if (bin.fillLevel < 80 && !filters.showNormal) return false;
    return true;
  });

  const handleDispatchTruck = (bin) => {
    console.log('Dispatching truck to bin:', bin.id);
    // This would create a job ticket in a real application
    alert(`Dispatching nearest truck to ${bin.id} at ${bin.address}`);
  };

  // Map tile layers
  const tileLayerUrl = mapView === 'satellite'
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileLayerAttribution = mapView === 'satellite'
    ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            Live Operations Map
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Showing {filteredBins.length} of {bins.length} bins
          </p>
        </div>

        {/* Map Container */}
        <div className="relative h-[600px]">
          <MapContainer
            center={colomboCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url={tileLayerUrl}
              attribution={tileLayerAttribution}
            />

            {/* Clustered Bin Markers */}
            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={50}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={false}
              zoomToBoundsOnClick={true}
              iconCreateFunction={(cluster) => {
                const count = cluster.getChildCount();
                let size = 'small';
                let bgColor = 'bg-blue-500';
                
                if (count > 10) {
                  size = 'large';
                  bgColor = 'bg-blue-700';
                } else if (count > 5) {
                  size = 'medium';
                  bgColor = 'bg-blue-600';
                }

                const sizeClass = size === 'large' ? 'w-14 h-14 text-lg' : size === 'medium' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm';

                return L.divIcon({
                  html: `
                    <div class="${bgColor} ${sizeClass} rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-lg">
                      ${count}
                    </div>
                  `,
                  className: 'custom-cluster-icon',
                  iconSize: L.point(40, 40, true)
                });
              }}
            >
              {filteredBins.map((bin) => (
                <Marker
                  key={bin.id}
                  position={[bin.location.lat, bin.location.lng]}
                  icon={createBinIcon(bin.fillLevel, bin.sensorHealth)}
                  eventHandlers={{
                    click: () => setSelectedBin(bin)
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold text-gray-900">{bin.id}</p>
                      <p className="text-gray-600 text-xs mb-2">{bin.address}</p>
                      <div className="space-y-1">
                        <p className="text-xs">
                          <span className="font-medium">Fill Level:</span>{' '}
                          <span className={`font-bold ${bin.fillLevel >= 80 ? 'text-red-600' : 'text-green-600'}`}>
                            {bin.fillLevel}%
                          </span>
                        </p>
                        <p className="text-xs">
                          <span className="font-medium">Temperature:</span> {bin.temperature}°C
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBin(bin)}
                        className="mt-2 w-full bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>

            {/* Truck Markers */}
            {trucks.map((truck) => (
              <Marker
                key={truck.id}
                position={[truck.location.lat, truck.location.lng]}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold">{truck.id}</p>
                    <p className="text-gray-600">{truck.driver}</p>
                    <p className="text-xs mt-1">
                      Status: <span className="font-medium capitalize">{truck.status}</span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Controls Overlay */}
          <MapControls
            filters={filters}
            onFilterChange={setFilters}
            mapView={mapView}
            onMapViewChange={setMapView}
          />
        </div>
      </div>

      {/* Bin Detail Drawer */}
      {selectedBin && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
            onClick={() => setSelectedBin(null)}
          ></div>
          <BinDetailDrawer
            bin={selectedBin}
            onClose={() => setSelectedBin(null)}
            onDispatchTruck={handleDispatchTruck}
          />
        </>
      )}
    </div>
  );
};

export default LiveOperationsMap;
