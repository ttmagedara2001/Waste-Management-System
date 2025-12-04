import React, { useState } from 'react';
import { X, MapPin, Thermometer, Clock, Trash2, TruckIcon, AlertTriangle } from 'lucide-react';

const BinDetailDrawer = ({ bin, onClose, onDispatchTruck }) => {
  if (!bin) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fillPercentage = bin.fillLevel;
  const isCritical = fillPercentage >= 80;
  const isWarning = fillPercentage >= 70 && fillPercentage < 80;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[1000] transform transition-transform duration-300 ease-in-out overflow-y-auto">
      {/* Header */}
      <div className={`p-6 ${isCritical ? 'bg-red-600' : isWarning ? 'bg-orange-600' : 'bg-blue-600'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{bin.id}</h2>
            <p className="text-white/90 text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {bin.address}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Fill Level Indicator */}
      <div className="p-6 border-b border-gray-200">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Fill Level</span>
          <span className="text-2xl font-bold text-gray-900">{fillPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCritical
                ? 'bg-red-600'
                : isWarning
                ? 'bg-orange-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${fillPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Capacity: {bin.capacity}L
        </div>
      </div>

      {/* Status Badge */}
      <div className="p-6 border-b border-gray-200">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            bin.status
          )}`}
        >
          {bin.status === 'critical' && <AlertTriangle className="w-4 h-4 mr-1" />}
          Status: {bin.status.charAt(0).toUpperCase() + bin.status.slice(1)}
        </span>
      </div>

      {/* Details Grid */}
      <div className="p-6 space-y-4 border-b border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Thermometer className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Temperature</p>
            <p className="text-lg font-semibold text-gray-700">
              {bin.temperature}°C
              {bin.temperature >= 35 && (
                <span className="ml-2 text-xs text-red-600 font-medium">
                  Fire Risk Warning
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Last Collection</p>
            <p className="text-sm text-gray-700">{formatTimestamp(bin.lastCollection)}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Zone</p>
            <p className="text-sm text-gray-700">{bin.zone}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div
              className={`w-3 h-3 rounded-full mt-1 ${
                bin.sensorHealth === 'online'
                  ? 'bg-green-500'
                  : bin.sensorHealth === 'warning'
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}
            ></div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Sensor Status</p>
            <p className="text-sm text-gray-700 capitalize">{bin.sensorHealth}</p>
          </div>
        </div>
      </div>

      {/* Coordinates */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Coordinates
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Latitude</p>
            <p className="text-sm font-mono font-medium text-gray-900">
              {bin.location.lat.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Longitude</p>
            <p className="text-sm font-mono font-medium text-gray-900">
              {bin.location.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <button
          onClick={() => onDispatchTruck(bin)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <TruckIcon className="w-5 h-5" />
          <span>Dispatch Truck</span>
        </button>

        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors">
          View History
        </button>
      </div>
    </div>
  );
};

export default BinDetailDrawer;
