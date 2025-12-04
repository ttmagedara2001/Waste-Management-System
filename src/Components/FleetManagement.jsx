import React, { useState } from 'react';
import {
  TruckIcon,
  User,
  MapPin,
  Package,
  Clock,
  PlayCircle,
  PauseCircle,
  Activity
} from 'lucide-react';

const FleetManagement = ({ trucks = [], bins = [] }) => {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [replaySpeed, setReplaySpeed] = useState(1);

  const getStatusColor = (status) => {
    switch (status) {
      case 'collecting':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'en-route':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'idle':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'collecting':
        return <Activity className="w-4 h-4" />;
      case 'en-route':
        return <MapPin className="w-4 h-4" />;
      case 'idle':
        return <PauseCircle className="w-4 h-4" />;
      default:
        return <TruckIcon className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <TruckIcon className="w-7 h-7 mr-2 text-blue-600" />
          Fleet Management
        </h2>
        <p className="text-gray-600 mt-1">
          Monitor and manage your waste collection fleet
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Roster */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Driver Roster
          </h3>

          <div className="space-y-3">
            {trucks.map((truck) => {
              const loadPercentage = Math.round((truck.currentLoad / truck.capacity) * 100);
              const isSelected = selectedTruck?.id === truck.id;

              return (
                <div
                  key={truck.id}
                  onClick={() => setSelectedTruck(truck)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TruckIcon className="w-6 h-6 text-blue-600" />
                        <div>
                          <h4 className="font-bold text-gray-900">{truck.id}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {truck.driver}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Route</p>
                          <p className="text-sm font-medium text-gray-900">{truck.route}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Update</p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatTimestamp(truck.lastUpdate)}
                          </p>
                        </div>
                      </div>

                      {/* Load Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">Load</span>
                          <span className="text-xs font-semibold text-gray-900">
                            {truck.currentLoad}/{truck.capacity} kg ({loadPercentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              loadPercentage >= 80
                                ? 'bg-red-600'
                                : loadPercentage >= 60
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${loadPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Assigned Bins */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Assigned Bins</p>
                        <div className="flex flex-wrap gap-1">
                          {truck.assignedBins.map((binId) => (
                            <span
                              key={binId}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {binId}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          truck.status
                        )}`}
                      >
                        {getStatusIcon(truck.status)}
                        <span className="ml-1 capitalize">{truck.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Route Replay */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <PlayCircle className="w-5 h-5 mr-2" />
            Route Replay
          </h3>

          {selectedTruck ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  {selectedTruck.id}
                </p>
                <p className="text-xs text-blue-700">{selectedTruck.driver}</p>
              </div>

              {/* Timeline Slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Replay Timeline
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6:00 AM</span>
                  <span>12:00 PM</span>
                  <span>6:00 PM</span>
                </div>
              </div>

              {/* Speed Control */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Playback Speed
                </label>
                <div className="flex gap-2">
                  {[0.5, 1, 2, 4].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setReplaySpeed(speed)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        replaySpeed === speed
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  <PlayCircle className="w-4 h-4" />
                  <span>Play</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  <PauseCircle className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              </div>

              {/* Route Stats */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Route Statistics</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Stops Made</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedTruck.assignedBins.length}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Current Load</p>
                    <p className="text-lg font-bold text-gray-900">
                      {Math.round((selectedTruck.currentLoad / selectedTruck.capacity) * 100)}%
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-800">
                      Route Completion
                    </span>
                    <span className="text-xs font-bold text-green-900">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <TruckIcon className="w-16 h-16 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">
                Select a truck from the roster to view route replay
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fleet Summary */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Fleet Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-green-200 text-sm">Total Trucks</p>
            <p className="text-3xl font-bold mt-1">{trucks.length}</p>
          </div>
          <div>
            <p className="text-green-200 text-sm">Active</p>
            <p className="text-3xl font-bold mt-1">
              {trucks.filter((t) => t.status !== 'idle').length}
            </p>
          </div>
          <div>
            <p className="text-green-200 text-sm">Idle</p>
            <p className="text-3xl font-bold mt-1">
              {trucks.filter((t) => t.status === 'idle').length}
            </p>
          </div>
          <div>
            <p className="text-green-200 text-sm">Avg. Load</p>
            <p className="text-3xl font-bold mt-1">
              {Math.round(
                trucks.reduce((acc, t) => acc + (t.currentLoad / t.capacity) * 100, 0) /
                  trucks.length
              )}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetManagement;
