import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import API_BASE_URL from '../apiConfig';
import 'leaflet/dist/leaflet.css';

const getMarkerColor = (wsi) => {
    if (wsi >= 0.8) return '#ef4444'; // Red - Critical
    if (wsi >= 0.6) return '#f59e0b'; // Amber - High Stress
    if (wsi >= 0.4) return '#eab308'; // Yellow - Moderate
    return '#10b981'; // Green - Low Stress
};

export default function AIStressMapPage() {
    const [villages, setVillages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // The map page uses a slightly different non-v1 path in current code, 
                // but let's point it to the dynamic base.
                const response = await fetch(`${API_BASE_URL.replace('/v1', '')}/drought/data`);
                const result = await response.json();

                if (result.status === 'success') {
                    // Provide some mock coordinates around Pune for the SIH demo since the dataset 
                    // only provides District names, not Lat/Long coordinates.
                    const demoCoordinates = [
                        { lat: 18.5204, lng: 73.8567 }, // Pune center
                        { lat: 18.0287, lng: 74.0089 },
                        { lat: 18.2501, lng: 74.1500 },
                        { lat: 17.9500, lng: 73.8800 },
                        { lat: 18.1333, lng: 73.9833 },
                        { lat: 18.0500, lng: 74.2000 },
                        { lat: 18.6161, lng: 73.7981 }, // Pimpri
                        { lat: 18.7282, lng: 73.4913 }, // Lonavala
                        { lat: 18.3315, lng: 73.8963 }, // Purandar
                        { lat: 18.4416, lng: 74.5772 }, // Shirur
                    ];

                    const mappedData = result.data.districts.map((district, index) => {
                        // Spread out the coordinates safely
                        const coords = demoCoordinates[index % demoCoordinates.length];

                        return {
                            ...district,
                            // Add a slight randomization to coordinate to prevent overlapping if array loops
                            lat: coords.lat + (Math.random() * 0.2 - 0.1),
                            lng: coords.lng + (Math.random() * 0.2 - 0.1),
                        };
                    });

                    setVillages(mappedData);
                }
            } catch (error) {
                console.error("Error fetching drought data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-[80vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        AI Water Stress Map
                        {loading && <span className="text-xs font-normal text-slate-500 animate-pulse">(Connecting to AI Engine...)</span>}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Real-time geospatial visualization powered by IMD datasets</p>
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
                    zoom={8}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />

                    {villages.map((village) => (
                        <CircleMarker
                            key={village.id}
                            center={[village.lat, village.lng]}
                            radius={8 + (village.population / 1500)} // Size dynamically mapped from backend pop data
                            pathOptions={{
                                fillColor: getMarkerColor(village.wsi),
                                color: getMarkerColor(village.wsi),
                                weight: 1,
                                fillOpacity: 0.6
                            }}
                        >
                            <Popup>
                                <div className="p-1 min-w-[150px]">
                                    <h3 className="font-bold text-slate-900 border-b pb-1 mb-2">{village.district} District</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="flex justify-between"><span className="text-slate-500">WSI Score:</span> <span className="font-bold">{village.wsi}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Status:</span> <span className={`font-semibold ${village.wsi >= 0.8 ? 'text-red-600' : 'text-amber-600'}`}>{village.status}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Rainfall Dep:</span> <span className={village.rainfall_departure < 0 ? 'text-red-600 font-medium' : 'text-emerald-600 font-medium'}>{village.rainfall_departure}%</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Est. Pop:</span> <span>{village.population.toLocaleString()}</span></p>

                                        {village.wsi >= 0.6 && (
                                            <button className="mt-3 text-xs bg-primary-50 text-primary-700 w-full py-1.5 rounded font-medium hover:bg-primary-100 transition-colors border border-primary-200">
                                                View Tanker Schedule
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
