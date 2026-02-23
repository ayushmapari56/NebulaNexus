import React, { useState } from 'react';

const alertCategories = [
    { id: 'all', name: 'All Alerts', count: 12 },
    { id: 'drought', name: 'Drought Alerts (P1)', count: 4 },
    { id: 'warning', name: 'Warnings', count: 8 },
];

const mockAlerts = [
    { id: 1, type: 'Drought', source: 'BECO X Sensor', location: 'Panshet Dam', message: 'Water level dropped below 30% absolute threshold.', time: '10 mins ago', status: 'Active' },
    { id: 2, type: 'Warning', source: 'AI Engine', location: 'Shirur Cluster', message: 'WSI predicted to cross 0.8 in next 48 hours.', time: '1 hour ago', status: 'Sent' },
    { id: 3, type: 'Drought', source: 'Manual Request', location: 'Bhavani Peth', message: 'Urgent tanker request filed by Nagar Parishad.', time: '2 hours ago', status: 'Pending' },
    { id: 4, type: 'Warning', source: 'IoT Node', location: 'Varasgaon Sector 4', message: 'Sensor MH-04-A offline. Checked heartbeat failure.', time: '5 hours ago', status: 'Active' },
];

export default function AlertCenterPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="space-y-8 font-sans pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">District Alert Center</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage emergency notifications and official drought communications.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-rose-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-500/20 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Broadcast Emergency
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Filter Alerts</h3>
                        <div className="space-y-2">
                            {alertCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {cat.name}
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] ${selectedCategory === cat.id ? 'bg-primary-100' : 'bg-slate-100'}`}>{cat.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 text-white text-center space-y-4">
                        <div className="w-12 h-12 bg-primary-500/20 text-primary-400 rounded-2xl flex items-center justify-center mx-auto">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h4 className="font-bold text-sm">Official SMS Gateway</h4>
                        <p className="text-[10px] text-slate-400 font-medium">92% Delivery rate across village nodal officers.</p>
                        <button className="w-full bg-slate-800 text-xs font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors">Manage Gateway</button>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="lg:col-span-3 space-y-4">
                    {mockAlerts.map(alert => (
                        <div key={alert.id} className={`bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all group ${alert.type === 'Critical' ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-amber-400'}`}>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${alert.type === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                        {alert.type}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-800">{alert.location} - {alert.source}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{alert.message}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {alert.status === 'Active' ? (
                                    <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">Resolve</button>
                                ) : (
                                    <div className="px-6 py-2 rounded-xl text-xs font-bold text-slate-400 border border-slate-100">{alert.status}</div>
                                )}
                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency Protocols Footer */}
            <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8 mt-12">
                <div className="flex items-start gap-6">
                    <div className="bg-amber-100 p-4 rounded-3xl text-amber-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                    </div>
                    <div>
                        <h4 className="text-amber-900 font-bold mb-2">District Emergency Protocol v2</h4>
                        <p className="text-amber-800/70 text-sm leading-relaxed font-semibold">
                            Critical alerts automatically trigger WhatsApp notifications to Sarpanchs and Parishad heads. AI-detected level drops (e.g. BECO X 30% drops) escalate directly to the District Collector and Superintendent of Police.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
