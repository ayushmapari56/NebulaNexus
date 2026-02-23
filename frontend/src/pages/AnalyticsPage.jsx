import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, Cell
} from 'recharts';

const droughtTrendData = [
    { month: 'Jan', wsi: 0.32, prediction: 0.32 },
    { month: 'Feb', wsi: 0.38, prediction: 0.38 },
    { month: 'Mar', wsi: 0.52, prediction: 0.52 },
    { month: 'Apr', wsi: 0.64, prediction: 0.68 },
    { month: 'May', wsi: null, prediction: 0.75 },
    { month: 'Jun', wsi: null, prediction: 0.82 },
];

const rainfallData = [
    { district: 'Pune', actual: 450, normal: 720, departure: -37.5 },
    { district: 'Solapur', actual: 210, normal: 540, departure: -61.1 },
    { district: 'Satara', actual: 380, normal: 610, departure: -37.7 },
    { district: 'Sangli', actual: 290, normal: 580, departure: -50.0 },
    { district: 'Ahmednagar', actual: 180, normal: 520, departure: -65.4 },
];

const PerformanceMetric = ({ label, value, trend, isNegative }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-slate-900">{value}</p>
            <span className={`text-xs font-bold mb-1 ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                {trend}
            </span>
        </div>
    </div>
);

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 font-sans pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Forecasting & Analytics</h1>
                <p className="text-slate-500 text-sm mt-1 font-medium">Predictive modeling for district-wide drought mitigation.</p>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <PerformanceMetric label="Prediction Accuracy" value="94.2%" trend="+2.1%" />
                <PerformanceMetric label="Avg Water Deficit" value="4.2M" trend="↑ 12%" isNegative={true} />
                <PerformanceMetric label="Groundwater Index" value="0.45" trend="↓ 5%" isNegative={true} />
                <PerformanceMetric label="Estimated Risks" value="18" trend="+3 New" isNegative={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Drought Trend Forecast */}
                <div className="glass-panel p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Water Stress Index (WSI) Forecast</h3>
                            <p className="text-xs text-slate-500 font-medium">Historical vs AI Predicted (ARIMA/LSTM)</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                                <span className="text-[10px] font-bold text-slate-400">ACTUAL</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                                <span className="text-[10px] font-bold text-slate-400">PREDICTED</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={droughtTrendData}>
                                <defs>
                                    <linearGradient id="colorWsi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="wsi" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorWsi)" />
                                <Area type="monotone" dataKey="prediction" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPred)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Rainfall Departure Analysis */}
                <div className="glass-panel p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Rainfall Departure Analysis</h3>
                    <p className="text-xs text-slate-500 font-medium mb-8">Meteorological drought indicator across clusters.</p>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rainfallData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="district" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} width={80} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="departure" radius={[0, 4, 4, 0]}>
                                    {rainfallData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.departure < -50 ? '#f43f5e' : '#fbbf24'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severe Deficit (&gt;50%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Moderate Deficit</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Insights Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-10 blur-[100px]"></div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-10">
                        <div className="space-y-6 flex-1">
                            <div className="inline-block bg-primary-500 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Strategy Recommendation</div>
                            <h2 className="text-3xl font-bold leading-tight">AI recommends immediate inter-cluster water diversion.</h2>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                Cross-referencing current Panshet Dam levels (42%) with Solapur's severe rainfall deficit (-61%), the engine suggests re-routing 15% of surplus tankers from Western clusters to Southeastern borders.
                            </p>
                            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-slate-100 transition-all shadow-xl shadow-white/5">
                                Generate Full Report
                            </button>
                        </div>
                        <div className="w-full md:w-48 flex flex-col justify-center">
                            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl text-center space-y-2">
                                <p className="text-4xl font-black text-primary-400">86</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Drought Score</p>
                                <div className="pt-2">
                                    <span className="bg-rose-500/20 text-rose-400 px-2 py-1 rounded-lg text-[10px] font-black uppercase">Alarming</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Historical Accuracy</h4>
                        <div className="space-y-6">
                            {[
                                { year: '2023', score: 98 },
                                { year: '2022', score: 92 },
                                { year: '2021', score: 95 },
                            ].map(item => (
                                <div key={item.year} className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                                        <span>Year {item.year}</span>
                                        <span>{item.score}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-xs text-slate-400 font-medium">Model: <span className="text-slate-800 font-bold">Neural-Ensemble v4.2</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
