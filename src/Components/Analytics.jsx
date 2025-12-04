import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, BarChart3, MapIcon, Calendar } from 'lucide-react';

const Analytics = ({ data }) => {
  const [timeframe, setTimeframe] = useState('24H');

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-7 h-7 mr-2 text-blue-600" />
              Analytics & Reports
            </h2>
            <p className="text-gray-600 mt-1">
              Historical data and performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            {['24H', '7D', '30D'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fill Rate Analysis Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Fill Rate Analysis</h3>
            <p className="text-sm text-gray-600">
              Average fill levels across zones over 24 hours
            </p>
          </div>
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.analytics.fillRateHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="time"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Fill Level (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="zoneA"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Zone A"
              dot={{ fill: '#3B82F6', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="zoneB"
              stroke="#10B981"
              strokeWidth={2}
              name="Zone B"
              dot={{ fill: '#10B981', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="zoneC"
              stroke="#F59E0B"
              strokeWidth={2}
              name="Zone C"
              dot={{ fill: '#F59E0B', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Zone A</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Peak: 12:00 PM (91%)</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Zone B</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Peak: 4:00 PM (94%)</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Zone C</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Peak: 4:00 PM (82%)</p>
          </div>
        </div>
      </div>

      {/* Route Efficiency and Zone Waste Production Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Efficiency Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Route Efficiency</h3>
          <p className="text-sm text-gray-600 mb-6">
            Distance traveled vs. waste collected per truck
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.analytics.routeEfficiency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="truck"
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="left"
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                label={{ value: 'Waste (kg)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="distance"
                fill="#3B82F6"
                name="Distance (km)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="waste"
                fill="#10B981"
                name="Waste (kg)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Best Performer:</span> TRUCK004 - 
              118kg/km efficiency
            </p>
          </div>
        </div>

        {/* Zone Waste Production */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Zone Waste Production</h3>
          <p className="text-sm text-gray-600 mb-6">
            Total waste by district
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.analytics.zoneWasteProduction}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ zone, production }) => `${zone}: ${production}kg`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="production"
              >
                {data.analytics.zoneWasteProduction.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            {data.analytics.zoneWasteProduction.map((zone, index) => (
              <div key={zone.zone} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{zone.zone}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {zone.production.toLocaleString()} kg
                  </p>
                  <p className="text-xs text-gray-500">{zone.bins} bins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Today's Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-blue-200 text-sm">Total Waste Collected</p>
            <p className="text-3xl font-bold mt-1">36,500 kg</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Collections Completed</p>
            <p className="text-3xl font-bold mt-1">142</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Total Distance</p>
            <p className="text-3xl font-bold mt-1">188 km</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Avg. Efficiency</p>
            <p className="text-3xl font-bold mt-1">194 kg/km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
