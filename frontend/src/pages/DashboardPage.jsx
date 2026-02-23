import React, { useState, useEffect, useRef } from 'react';

export default function DashboardPage() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [damLevels, setDamLevels] = useState({
        panshet: 42.8,
        khadakwasla: 34.2,
        varasgaon: 28.5
    });
    const audioRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const triggerEmergencyAlert = () => {
        setIsAlertActive(true);
        // Simulate a 30% absolute drop for demonstration
        setDamLevels(prev => ({
            ...prev,
            panshet: Math.max(0, prev.panshet - 15),
            khadakwasla: Math.max(0, prev.khadakwasla - 12),
            varasgaon: Math.max(0, prev.varasgaon - 10)
        }));

        // 1. Hindi Voice Alert (Web Speech API)
        const speech = new SpeechSynthesisUtterance("सूखा अलर्ट। जल स्तर में तीस प्रतिशत की गिरावट आई है। तत्काल कार्रवाई आवश्यक है।");
        speech.lang = 'hi-IN'; // Set language to Hindi (India)
        speech.rate = 0.85;
        speech.pitch = 1.1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);

        // 2. Alarm Sound (MP3 Beep)
        if (!audioRef.current) {
            audioRef.current = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
            audioRef.current.loop = true;
        }
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser policy"));

        // Auto-stop after 20 seconds (User requested)
        setTimeout(() => {
            setIsAlertActive(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }, 20000);
    };

    return (
        <div className={`space-y-6 transition-all duration-300 ${isAlertActive ? 'ring-8 ring-rose-500 ring-inset' : ''}`}>

            {/* Global Emergency Flash Overlay */}
            {isAlertActive && (
                <div className="fixed inset-0 z-[100] pointer-events-none animate-emergency-flash">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-4xl animate-danger-pulse flex items-center gap-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        DROUGHT ALERT: 30% DROP
                    </div>
                </div>
            )}

            {/* Animated Welcome Header */}
            <div className={`transition-all duration-1000 ease-in-out ${showWelcome ? 'opacity-100 transform translate-y-0' : 'opacity-100'} bg-gradient-to-r from-primary-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl animate-pulse"></div>
                <h1 className="text-3xl font-bold mb-1 animate-fade-in-up delay-100">Welcome Back, Collector Sahib</h1>
                <p className="text-primary-100 text-sm animate-fade-in-up delay-300">The AI has analyzed 12,000+ data points since your last login. Here is your district's water status.</p>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">District Overview</h2>
                <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-600">Live AI Forecast Active</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { name: 'Critical Villages', stat: '12', trend: '+2 this week', critical: true },
                    { name: 'Active Tankers', stat: '45', trend: 'Optimal', critical: false },
                    { name: 'Total WSI Avg', stat: '0.64', trend: 'Alert Level', critical: true },
                    { name: 'Est. Daily Cost', stat: '₹1.2L', trend: '-15% vs last month', critical: false },
                ].map((item) => (
                    <div key={item.name} className="glass-panel p-6 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-1 h-full ${item.critical ? 'bg-rose-500' : 'bg-primary-500'}`}></div>
                        <dt className="truncate text-sm font-medium text-slate-500">{item.name}</dt>
                        <dd className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{item.stat}</dd>
                        <p className={`mt-2 text-sm ${item.critical ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {item.trend}
                        </p>
                    </div>
                ))}
            </div>

            {/* BECO X Dam Monitoring */}
            <div className={`mt-8 glass-panel p-6 transition-colors duration-500 ${isAlertActive ? 'bg-rose-50' : ''}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        BECO X Ultrasonic Dam Monitoring
                    </h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={triggerEmergencyAlert}
                            className="text-xs font-bold bg-rose-600 text-white px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-rose-500/30 flex items-center gap-1"
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                            Simulate Crisis
                        </button>
                        <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Sensor Feed
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Dam 1 */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm transition hover:shadow-md">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">Panshet Dam</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-extrabold text-slate-900">{damLevels.panshet.toFixed(1)}%</span>
                            <span className={`text-sm mb-1 font-medium ${isAlertActive ? 'text-rose-600 animate-bounce' : 'text-amber-500'}`}>
                                ↓ {isAlertActive ? '15.0' : '0.5'}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4 overflow-hidden">
                            <div className={`${damLevels.panshet < 30 ? 'bg-rose-500' : 'bg-yellow-500'} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${damLevels.panshet}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                            AI Drought Forecast: <span className="text-emerald-600 font-semibold">Stable (30 days)</span>
                        </p>
                    </div>

                    {/* Dam 2 */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm transition hover:shadow-md">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">Khadakwasla Dam</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-extrabold text-slate-900">{damLevels.khadakwasla.toFixed(1)}%</span>
                            <span className={`text-sm mb-1 font-medium ${isAlertActive ? 'text-rose-600 animate-bounce' : 'text-rose-500'}`}>
                                ↓ {isAlertActive ? '12.0' : '1.2'}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4 overflow-hidden">
                            <div className={`${damLevels.khadakwasla < 30 ? 'bg-rose-500' : 'bg-amber-500'} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${damLevels.khadakwasla}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                            AI Drought Forecast: <span className="text-amber-600 font-semibold">High Warning</span>
                        </p>
                    </div>

                    {/* Dam 3 */}
                    <div className={`bg-white rounded-xl p-5 border shadow-sm transition hover:shadow-md relative overflow-hidden ${damLevels.varasgaon < 20 ? 'border-rose-300' : 'border-slate-200'}`}>
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">Varasgaon Dam</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-extrabold text-slate-900">{damLevels.varasgaon.toFixed(1)}%</span>
                            <span className={`text-sm mb-1 font-medium ${isAlertActive ? 'text-rose-600 animate-bounce' : 'text-rose-500'}`}>
                                ↓ {isAlertActive ? '10.0' : '2.1'}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4 overflow-hidden">
                            <div className="bg-rose-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${damLevels.varasgaon}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                            AI Drought Forecast: <span className="text-rose-600 font-bold">Critical Risk (Action Needed)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Alerts Panel */}
                <div className="glass-panel p-6 lg:col-span-1">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">AI Early Warnings</h2>
                    <div className="space-y-4">
                        {/* Mock Alert 1 */}
                        <div className="p-4 rounded-lg bg-rose-50 border border-rose-100 flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="h-5 w-5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-rose-800">Critical Escallation</p>
                                <p className="mt-1 text-xs text-rose-600">Village 'Shirshi' forecasted to cross Critical WSI threshold in 5 days due to rapid groundwater decline.</p>
                            </div>
                        </div>

                        {/* Mock Alert 2 */}
                        <div className="p-4 rounded-lg bg-amber-50 border border-amber-100 flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-amber-800">Tanker Route Deviation</p>
                                <p className="mt-1 text-xs text-amber-600">Tanker MH-12-AB-1234 spending 45 mins longer than optimized route on Sector 4.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Required Panel */}
                <div className="glass-panel p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">Pending Approvals (AI Recommended)</h2>
                        <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All Setup</button>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Village</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Forecasted Need</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">AI Priority</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Khandala</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2 Tankers/day (Next 7 days)</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High (P1)</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-primary-600 hover:text-primary-900 bg-primary-50 px-3 py-1 rounded-md transition-colors">Approve</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Bhavani Peth</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">1 Tanker/day (Current week)</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium (P2)</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-primary-600 hover:text-primary-900 bg-primary-50 px-3 py-1 rounded-md transition-colors">Approve</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
