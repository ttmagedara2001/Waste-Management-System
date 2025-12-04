import React from 'react';
import { Filter, Eye, EyeOff, Layers, Map as MapIcon } from 'lucide-react';

const MapControls = ({ filters, onFilterChange, mapView, onMapViewChange }) => {
  const toggleFilter = (filterKey) => {
    onFilterChange({
      ...filters,
      [filterKey]: !filters[filterKey]
    });
  };

  return (
    <div className="absolute top-4 left-4 z-[400] bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Map Controls
        </h3>
      </div>

      {/* Bin Visibility Filters */}
      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Bin Visibility
        </p>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            Critical Bins (&gt;80%)
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.showCritical}
              onChange={() => toggleFilter('showCritical')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            Normal Bins (&lt;80%)
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.showNormal}
              onChange={() => toggleFilter('showNormal')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            Maintenance Required
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.showMaintenance}
              onChange={() => toggleFilter('showMaintenance')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </div>
        </label>
      </div>

      {/* Map View Toggle */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Map View
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onMapViewChange('street')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 ${
              mapView === 'street'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Street</span>
          </button>
          
          <button
            onClick={() => onMapViewChange('satellite')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 ${
              mapView === 'satellite'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Satellite</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Critical</p>
            <p className="text-lg font-bold text-red-600">
              {filters.showCritical ? '✓' : '✗'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Normal</p>
            <p className="text-lg font-bold text-green-600">
              {filters.showNormal ? '✓' : '✗'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Maintenance</p>
            <p className="text-lg font-bold text-orange-600">
              {filters.showMaintenance ? '✓' : '✗'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapControls;
