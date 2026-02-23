import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock Village Data for SIH Demo
const mockVillages = [
    { id: 1, name: "Khandala", lat: 18.0287, lng: 74.0089, wsi: 0.85, status: "Critical", pop: 4500 },
    { id: 2, name: "Bhavani Peth", lat: 18.2501, lng: 74.1500, wsi: 0.65, status: "High Stress", pop: 3200 },
    { id: 3, name: "Wai", lat: 17.9500, lng: 73.8800, wsi: 0.40, status: "Moderate", pop: 8500 },
    { id: 4, name: "Panchgani", lat: 17.9221, lng: 73.8058, wsi: 0.25, status: "Low Stress", pop: 6000 },
    { id: 5, name: "Shirwal", lat: 18.1333, lng: 73.9833, wsi: 0.72, status: "High Stress", pop: 5100 },
    { id: 6, name: "Lonand", lat: 18.0500, lng: 74.2000, wsi: 0.91, status: "Critical", pop: 7200 },
];

const getMarkerColor = (wsi) => {
    if (wsi >= 0.8) return '#ef4444'; // Red - Critical
    if (wsi >= 0.6) return '#f59e0b'; // Amber - High Stress
    if (wsi >= 0.4) return '#eab308'; // Yellow - Moderate
    return '#10b981'; // Green - Low Stress
};

export default function AIStressMapPage() {
    return (
        <div className="h-[80vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">AI Water Stress Map</h1>
                    <p className="text-sm text-slate-500 mt-1">Real-time geospatial visualization of village-level drought risk</p>
                </div>

                <div className="flex gap-2 text-xs font-medium">
                    <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded border border-slate-200"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical (&gt;0.8)</span>
                    <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded border border-slate-200"><span className="w-2 h-2 rounded-full bg-amber-500"></span> High (0.6-0.8)</span>
                    <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded border border-slate-200"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Normal (&lt;0.4)</span>
                </div>
            </div>

            <div className="flex-1 glass-panel relative z-0">
                <MapContainer
                    center={[18.05, 74.0]}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />

                    {mockVillages.map((village) => (
                        <CircleMarker
                            key={village.id}
                            center={[village.lat, village.lng]}
                            radius={8 + (village.pop / 1000)} // Size based on population
                            pathOptions={{
                                fillColor: getMarkerColor(village.wsi),
                                color: getMarkerColor(village.wsi),
                                weight: 1,
                                fillOpacity: 0.6
                            }}
                        >
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-slate-900">{village.name}</h3>
                                    <div className="mt-2 space-y-1 text-sm">
                                        <p><span className="text-slate-500">WSI Score:</span> <span className="font-semibold">{village.wsi}</span></p>
                                        <p><span className="text-slate-500">Status:</span> <span className={`font-semibold ${village.wsi >= 0.8 ? 'text-red-600' : 'text-amber-600'}`}>{village.status}</span></p>
                                        <p><span className="text-slate-500">Population:</span> {village.pop.toLocaleString()}</p>
                                        {village.wsi >= 0.6 && (
                                            <button className="mt-2 text-xs bg-primary-50 text-primary-700 w-full py-1 rounded font-medium hover:bg-primary-100 transition-colors">
                                                View AI Prescription
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
