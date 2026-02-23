import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import PortalSelectionPage from './pages/PortalSelectionPage';

import RequestFormPage from './pages/RequestFormPage';

import AllocationEnginePage from './pages/AllocationEnginePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AlertCenterPage from './pages/AlertCenterPage';

// Placeholder components for routing before full implementation
const PlaceholderPage = ({ title }) => (
  <div className="flex h-[80vh] items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
      <p className="mt-2 text-slate-500">This module is under development for SIH.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalSelectionPage />} />

        {/* Role-specific Logins */}
        <Route path="/login/:role" element={<LoginPage />} />

        {/* Admin Portal */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="tankers" element={<AllocationEnginePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="alerts" element={<AlertCenterPage />} />
        </Route>

        {/* Local Body Portals */}
        <Route path="/portal/nagar-parishad" element={<RequestFormPage title="Nagar Parishad Portal" role="nagar-parishad" />} />
        <Route path="/portal/gram-panchayat" element={<RequestFormPage title="Gram Panchayat Portal" role="gram-panchayat" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
