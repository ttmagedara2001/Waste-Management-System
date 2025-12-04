import React from 'react';
import KPICard from './KPICard';
import ActivityFeed from './ActivityFeed';
import MiniMap from './MiniMap';
import { Trash2, TruckIcon, Clock, Activity } from 'lucide-react';

const CommandCenter = ({ data }) => {
  // Calculate KPIs
  const criticalBins = data.bins.filter(bin => bin.fillLevel >= 80).length;
  const activeTrucks = data.trucks.filter(
    truck => truck.status === 'collecting' || truck.status === 'en-route'
  ).length;
  
  // Calculate average collection time (mock for now)
  const avgCollectionTime = '24 min';
  
  // Calculate sensor health
  const onlineSensors = data.bins.filter(bin => bin.sensorHealth === 'online').length;
  const sensorHealth = Math.round((onlineSensors / data.bins.length) * 100);

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Critical Bins"
          value={criticalBins}
          icon={Trash2}
          trend="up"
          trendValue="+3"
          color="red"
        />
        <KPICard
          title="Active Trucks"
          value={activeTrucks}
          icon={TruckIcon}
          trend="neutral"
          trendValue="0"
          color="green"
        />
        <KPICard
          title="Avg. Collection Time"
          value={avgCollectionTime}
          icon={Clock}
          trend="down"
          trendValue="-5 min"
          color="blue"
        />
        <KPICard
          title="Sensor Health"
          value={`${sensorHealth}%`}
          icon={Activity}
          trend="up"
          trendValue="+2%"
          color="purple"
        />
      </div>

      {/* Activity Feed and Mini Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed activities={data.recentActivities} />
        </div>
        <div className="lg:col-span-1">
          <MiniMap trucks={data.trucks} />
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
