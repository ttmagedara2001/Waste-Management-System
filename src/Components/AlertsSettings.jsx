import React, { useState } from 'react';
import {
  Settings,
  Bell,
  AlertTriangle,
  CheckCircle,
  Mail,
  Smartphone,
  Save,
  X
} from 'lucide-react';

const AlertsSettings = ({ alerts = [], settings = {} }) => {
  const [thresholds, setThresholds] = useState(settings.thresholds || {
    criticalFillLevel: 80,
    warningFillLevel: 70,
    temperatureWarning: 35,
    temperatureCritical: 40
  });

  const [notifications, setNotifications] = useState(settings.notifications || {
    email: true,
    sms: false,
    push: true
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleThresholdChange = (key, value) => {
    setThresholds({ ...thresholds, [key]: parseInt(value) });
    setHasChanges(true);
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', { thresholds, notifications });
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setThresholds(settings.thresholds);
    setNotifications(settings.notifications);
    setHasChanges(false);
  };

  const getAlertIcon = (type) => {
    return type === 'critical' ? (
      <AlertTriangle className="w-5 h-5 text-red-600" />
    ) : (
      <Bell className="w-5 h-5 text-orange-600" />
    );
  };

  const getAlertColor = (type) => {
    return type === 'critical'
      ? 'bg-red-50 border-red-200'
      : 'bg-orange-50 border-orange-200';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const unreadAlerts = alerts.filter((alert) => !alert.read);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Settings className="w-7 h-7 mr-2 text-blue-600" />
          Alerts & Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Configure notification preferences and threshold values
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Center */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Center
            </h3>
            {unreadAlerts.length > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {unreadAlerts.length} new
              </span>
            )}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {alerts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-3" />
                <p className="text-gray-500">No alerts at this time</p>
                <p className="text-sm text-gray-400 mt-1">All systems operational</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    alert.read
                      ? 'border-gray-200 bg-white opacity-60'
                      : `border-2 ${getAlertColor(alert.type)}`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimestamp(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    {!alert.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Alert Summary</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-900">Critical</span>
                </div>
                <span className="text-lg font-bold text-red-900">
                  {alerts.filter((a) => a.type === 'critical').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Warning</span>
                </div>
                <span className="text-lg font-bold text-orange-900">
                  {alerts.filter((a) => a.type === 'warning').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Unread</span>
                </div>
                <span className="text-lg font-bold text-blue-900">
                  {unreadAlerts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Threshold Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Threshold Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fill Level Thresholds */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Fill Level Alerts
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Critical Fill Level (%)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={thresholds.criticalFillLevel}
                  onChange={(e) =>
                    handleThresholdChange('criticalFillLevel', e.target.value)
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <span className="text-2xl font-bold text-red-600 w-16 text-right">
                  {thresholds.criticalFillLevel}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Bins above this level trigger critical alerts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warning Fill Level (%)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={thresholds.warningFillLevel}
                  onChange={(e) =>
                    handleThresholdChange('warningFillLevel', e.target.value)
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <span className="text-2xl font-bold text-orange-600 w-16 text-right">
                  {thresholds.warningFillLevel}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Bins above this level trigger warning alerts
              </p>
            </div>
          </div>

          {/* Temperature Thresholds */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Temperature Alerts
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Critical Temperature (°C)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="30"
                  max="50"
                  value={thresholds.temperatureCritical}
                  onChange={(e) =>
                    handleThresholdChange('temperatureCritical', e.target.value)
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <span className="text-2xl font-bold text-red-600 w-16 text-right">
                  {thresholds.temperatureCritical}°C
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Fire risk - immediate action required</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warning Temperature (°C)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="25"
                  max="45"
                  value={thresholds.temperatureWarning}
                  onChange={(e) =>
                    handleThresholdChange('temperatureWarning', e.target.value)
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <span className="text-2xl font-bold text-orange-600 w-16 text-right">
                  {thresholds.temperatureWarning}°C
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Elevated temperature - monitor closely
              </p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Notification Channels
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-500">Receive email alerts</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS</p>
                  <p className="text-xs text-gray-500">Receive SMS alerts</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => handleNotificationChange('sms')}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Push</p>
                  <p className="text-xs text-gray-500">Browser notifications</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="mt-6 flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsSettings;
