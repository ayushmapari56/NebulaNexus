import React, { useState, useEffect } from 'react';

const StatusBadge = ({ status }) => {
    const styles = {
        'Pending': 'bg-amber-100 text-amber-800 border-amber-200',
        'Approved': 'bg-emerald-100 text-emerald-800 border-emerald-200',
        'Rejected': 'bg-rose-100 text-rose-800 border-rose-200',
        'In Transit': 'bg-primary-100 text-primary-800 border-primary-200',
        'Delivered': 'bg-slate-100 text-slate-800 border-slate-200'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${styles[status] || styles['Pending']}`}>
            {status}
        </span>
    );
};

export default function AllocationEnginePage() {
    const [allocations, setAllocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [stats, setStats] = useState({ total_ready: 0, pending: 0, critical_count: 0 });

    useEffect(() => {
        fetchAllocations();
    }, []);

    const fetchAllocations = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/v1/requests');
            const data = await response.json();

            if (data && data.length > 0) {
                // Map backend data to UI format
                const mappedData = data.map(req => ({
                    id: req.id,
                    source: req.authority,
                    location: req.location,
                    population: req.population,
                    water_gap: req.liters_required,
                    priority_score: req.priority_score,
                    ai_verification: req.ai_verification,
                    status: req.status,
                    recommended_tankers: Math.ceil(req.liters_required / 10000),
                    driver: `Driver assigned on approval`
                }));
                setAllocations(mappedData);
                calculateStats(mappedData);
            } else {
                simulateAIData();
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            simulateAIData();
        } finally {
            setLoading(false);
        }
    };

    const simulateAIData = () => {
        const mockData = [
            { id: 101, source: 'Gram Panchayat', location: 'Shirur Village', population: 4500, water_gap: 45000, priority_score: 0.92, ai_verification: 'genuine', recommended_tankers: 3, status: 'Pending', driver: 'Sandeep R. (Driver ID: #4401)' },
            { id: 102, source: 'Nagar Parishad', location: 'Bhavani Peth Center', population: 12000, water_gap: 12000, priority_score: 0.85, ai_verification: 'genuine', recommended_tankers: 1, status: 'Pending', driver: 'Rahul M. (Driver ID: #4402)' },
        ];
        setAllocations(mockData);
        calculateStats(mockData);
    };

    const calculateStats = (data) => {
        setStats({
            total_ready: data.length,
            pending: data.filter(a => a.status === 'Pending').length,
            critical_count: data.filter(a => a.priority_score > 0.8).length
        });
    };

    const handleAction = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/requests/${id}/action?status=${newStatus}`, {
                method: 'POST'
            });

            if (response.ok) {
                setAllocations(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
                if (newStatus === 'Approved') {
                    showNotification(`✅ Dispatched! Notification sent to Driver's App!`);

                    // Trigger Mobile Notification via API
                    try {
                        await fetch('http://localhost:8000/api/v1/mobile/notifications', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                title: "New Dispatch! 🚛",
                                message: `You have been assigned to ${allocations.find(a => a.id === id).location}. Start immediately!`
                            })
                        });
                    } catch (e) {
                        console.error("Mobile notification trigger failed", e);
                    }
                } else {
                    showNotification(`❌ Request rejected.`);
                }
            }
        } catch (error) {
            console.error("Action failed:", error);
            // Fallback for UI responsiveness
            setAllocations(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        }
    };

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <div className="space-y-6 font-sans relative">
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-primary-500/30 flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center animate-pulse">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-bold text-sm tracking-tight">{notification}</span>
                    </div>
                </div>
            )}

            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span className="bg-primary-500 p-2 rounded-xl text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </span>
                        AI Tanker Allocation Engine
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Review, Verify, and Dispatch tankers based on AI priority ranking.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchAllocations} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                        <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        Refresh Requests
                    </button>
                    <button className="bg-primary-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all">
                        Bulk Dispatch
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 border-l-4 border-primary-500">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Requests</p>
                    <p className="text-3xl font-black text-slate-900">{stats.total_ready}</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-amber-500">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Awaiting Approval</p>
                    <p className="text-3xl font-black text-slate-900">{stats.pending}</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-rose-500">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI Verified Phony</p>
                    <p className="text-3xl font-black text-slate-900">{allocations.filter(a => a.ai_verification === 'suspicious').length}</p>
                </div>
            </div>

            {/* Main Allocation Table */}
            <div className="glass-panel overflow-hidden border-slate-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 tracking-tight">Pending Tanker Requests (AI Audited)</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">AI Genuine</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">AI Suspicious</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Requester Entity</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">AI Audit</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Rank</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Recommended Units</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Collector's Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {allocations.map((a) => (
                                <tr key={a.id} className={`hover:bg-slate-50 transition-colors group ${a.ai_verification === 'suspicious' ? 'bg-rose-50/30' : ''}`}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${a.source === 'Gram Panchayat' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {a.source === 'Gram Panchayat' ?
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                                }
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{a.location}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{a.source}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        {a.ai_verification === 'genuine' ? (
                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200" title="Genuine Request">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600 border border-rose-200 animate-pulse" title="Suspicious / Phony Data Detected">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`text-xs font-black ${a.priority_score > 0.8 ? 'text-rose-600' : 'text-primary-600'}`}>
                                            P{(a.priority_score > 0.8 ? 1 : 2)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700">{a.recommended_tankers} x 10k Ltr Tankers</span>
                                            <span className="text-[10px] text-slate-400 font-medium">Assigned to: {a.driver.split('(')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={a.status} />
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {a.status === 'Pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(a.id, 'Rejected')}
                                                    className="bg-slate-100 text-slate-600 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleAction(a.id, 'Approved')}
                                                    className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-primary-500/20"
                                                >
                                                    Approve & Dispatch
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-slate-400 text-xs font-bold italic">
                                                Finalized
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Insight Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary-500 opacity-10 blur-3xl animate-pulse"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-primary-500/30">
                            AI Anti-Fraud Logic
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">How AI detects "Phony" requests?</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The engine cross-verifies request data with **Satellite Ground Moisture Maps** and **Population Census**.
                            If a Gram Panchayat requests 5 tankers but their population is only 200, the AI flags it with a <span className="text-rose-400 font-bold">Red Mark</span> for manual audit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
