# 🚛 Waste Management System

A comprehensive real-time waste management dashboard for Colombo City, built with React and modern web technologies. This system provides live monitoring of waste bins, fleet management, analytics, and intelligent route optimization.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Command Center
- Real-time KPI monitoring (collection efficiency, bin fill levels, fleet status)
- Live activity feed with system updates
- Interactive alerts and notifications
- Quick overview of operational metrics

### 🗺️ Live Operations Map
- Real-time bin location tracking with fill level indicators
- Live truck fleet monitoring and route visualization
- Zone-based bin management
- Interactive map controls with multiple view options
- Color-coded status indicators (Critical, Warning, Normal)
- Detailed bin information drawers

### 📊 Analytics Dashboard
- Collection efficiency trends and statistics
- Fill level analytics across zones
- Fleet performance metrics
- Temperature monitoring and alerts
- Historical data visualization
- Predictive analytics for route optimization

### 🚚 Fleet Management
- Real-time truck tracking and status monitoring
- Driver information and assignments
- Route optimization and planning
- Fuel efficiency tracking
- Maintenance scheduling

### ⚙️ Settings & Alerts
- Customizable alert thresholds
- Notification preferences
- System configuration options
- User management

## 🛠️ Technology Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS with PostCSS
- **Icons:** Lucide React
- **Real-time Updates:** WebSocket Service
- **Code Quality:** ESLint with React plugins
- **Data Visualization:** Custom components

## 📁 Project Structure

```
Waste-Management-System/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── Components/        # React components
│   │   ├── ActivityFeed.jsx
│   │   ├── AlertsSettings.jsx
│   │   ├── Analytics.jsx
│   │   ├── BinDetailDrawer.jsx
│   │   ├── CommandCenter.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FleetManagement.jsx
│   │   ├── KPICard.jsx
│   │   ├── LiveOperationsMap.jsx
│   │   ├── MapControls.jsx
│   │   ├── MiniMap.jsx
│   │   └── ToastContainer.jsx
│   ├── data/              # Mock data and configurations
│   │   └── mockData.json
│   ├── services/          # API and WebSocket services
│   │   └── websocketService.js
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── eslint.config.js       # ESLint configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ttmagedara2001/Waste-Management-System.git
   cd Waste-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Key Components

### Command Center
Central hub displaying critical KPIs, recent activities, and system alerts for quick operational overview.

### Live Operations Map
Interactive map showing real-time locations of waste bins and collection trucks with detailed information panels.

### Analytics
Comprehensive analytics dashboard with charts and metrics for data-driven decision making.

### Fleet Management
Track and manage your collection fleet with real-time status updates and route optimization.

## 📊 Data Structure

The system uses a comprehensive data model including:

- **Bins:** Location, fill level, temperature, status, sensor health
- **Trucks:** Position, route, status, driver info, fuel level
- **Zones:** Geographic divisions for efficient management
- **Alerts:** Real-time notifications for critical events
- **Activities:** System activity log and audit trail

## 🔄 Real-time Updates

The application leverages WebSocket connections for real-time data synchronization:

- Bin fill level updates
- Truck position tracking
- System alerts and notifications
- Activity feed updates

## 🎯 Future Enhancements

- [ ] Mobile application for drivers
- [ ] AI-powered route optimization
- [ ] Historical data analytics
- [ ] Integration with IoT sensors
- [ ] Multi-city support
- [ ] Advanced reporting features
- [ ] API integration for external systems

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Thulani Magedara** - [@ttmagedara2001](https://github.com/ttmagedara2001)

## 🙏 Acknowledgments

- Built with React and Vite
- Icons by Lucide
- Inspired by modern smart city initiatives
- Colombo City waste management operations

---

**Note:** This is a demonstration project showcasing modern web development practices for waste management systems. The data used is mock data for visualization purposes.
