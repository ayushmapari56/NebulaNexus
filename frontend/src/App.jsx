import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="tankers" element={<PlaceholderPage title="Tanker Allocation Engine" />} />
          <Route path="analytics" element={<PlaceholderPage title="Drought Forecasting & Analytics" />} />
          <Route path="alerts" element={<PlaceholderPage title="District Alert Center" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
