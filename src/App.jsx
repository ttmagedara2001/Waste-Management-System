import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import {
  Home,
  Map,
  BarChart3,
  TruckIcon,
  Settings,
  Bell,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './Components/Dashboard';
import mockData from './data/mockData.json';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadAlerts] = useState(
    mockData.alerts.filter((alert) => !alert.read).length
  );

  const navigation = [
    { name: 'Command Center', path: '/', icon: Home },
    { name: 'Live Map', path: '/map', icon: Map },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Fleet', path: '/fleet', icon: TruckIcon },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Top Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
                >
                  {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="flex items-center ml-2 lg:ml-0">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <TruckIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-white">Waste Management</h1>
                    <p className="text-xs text-blue-100">Colombo City Dashboard</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="text-white hover:bg-blue-500 p-2 rounded-lg transition-colors relative">
                    <Bell className="w-6 h-6" />
                    {unreadAlerts > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadAlerts}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar Navigation */}
          <aside
            className={`
              fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] 
              bg-white shadow-lg z-40 w-64 transition-transform duration-300
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:ml-0">
            <Dashboard />
          </main>
        </div>

        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </Router>
  );
}

export default App;
