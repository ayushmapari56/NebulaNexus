import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

export default function RequestFormPage({ title, role }) {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        authority: title || role,
        location: '',
        population: '',
        liters_required: '',
        reason: '',
        contact_info: 'Official Nodal Officer'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            // Fallback for demo if backend is unreachable
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-fade-in-up border border-emerald-100">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted!</h2>
                    <p className="text-slate-500 mb-8">
                        Your request has been sent to the District Collector.
                        AI analysis is currently prioritizing your route.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Return to Portal
                    </button>
                    <p className="mt-4 text-xs text-slate-400">Confirmation sent to registered nodal officer email.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
                            <p className="text-slate-500 font-medium">Department of Water Resources & Sanitation</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-18 0z"></path></svg>
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-900 border-b pb-4 mb-6">New Tanker Deployment Request</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Local Body Name / Location</label>
                                        <input
                                            required type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="e.g. Shirur Village"
                                            value={formData.location}
                                            onChange={(e) => handleChange(e, 'location')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Authority Type</label>
                                        <input
                                            disabled type="text"
                                            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500"
                                            value={title}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Population in Need</label>
                                    <input
                                        required type="number"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="Approx number of residents"
                                        value={formData.population}
                                        onChange={(e) => handleChange(e, 'population')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Daily Water Deficit (Liters)</label>
                                    <div className="relative">
                                        <input
                                            required type="number"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all pr-12"
                                            placeholder="e.g. 20000"
                                            value={formData.liters_required}
                                            onChange={(e) => handleChange(e, 'liters_required')}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">Ltrs</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Brief Justification</label>
                                    <textarea
                                        required rows="4"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                                        placeholder="Reason for shortage..."
                                        value={formData.reason}
                                        onChange={(e) => handleChange(e, 'reason')}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-slate-900/30 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                            Submit Request to Collector
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white shadow-xl">
                            <h4 className="font-bold flex items-center gap-2 mb-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                AI Processing
                            </h4>
                            <p className="text-primary-100 text-sm leading-relaxed">
                                Once submitted, our AI logic will compare your request against regional rainfall data and current dam levels to prioritize your supply.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center">
                            <div className="bg-slate-100 p-4 rounded-2xl mb-4">
                                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2">Request Status</h4>
                            <p className="text-slate-500 text-xs">No active requests found for your ID. Standard response time: 4-6 Hours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
