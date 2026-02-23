import React from 'react';
import { useNavigate } from 'react-router-dom';

const PortalCard = ({ title, subtext, icon, type, colorClass, onClick }) => (
    <div
        onClick={() => onClick(type)}
        className={`group relative overflow-hidden glass-panel p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 border-transparent hover:border-${colorClass}-500/30`}
    >
        <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-${colorClass}-500 opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`}></div>

        <div className={`w-16 h-16 rounded-2xl bg-${colorClass}-500/10 text-${colorClass}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
            {icon}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-2 truncate">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{subtext}</p>

        <div className="mt-8 flex items-center text-sm font-semibold text-slate-700 group-hover:translate-x-2 transition-transform">
            Enter Portal
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </div>
    </div>
);

export default function PortalSelectionPage() {
    const navigate = useNavigate();

    const handlePortalSelect = (type) => {
        if (type === 'admin') navigate('/login/admin');
        else if (type === 'nagar') navigate('/login/nagar-parishad');
        else if (type === 'gram') navigate('/login/gram-panchayat');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Accents */}
            <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-primary-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>

            <div className="z-10 w-full max-w-6xl text-center mb-16 animate-fade-in-up">
                <img src="/logo.png" alt="Logo" className="h-28 mx-auto mb-6 drop-shadow-lg" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    जल-प्रबंधन साथी <br />
                    <span className="text-primary-600">SMART WATER PORTAL</span>
                </h1>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                    Centralized digital infrastructure for drought mitigation and efficient water tanker deployment across the district.
                </p>
            </div>

            <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl animate-fade-in-up delay-300">
                <PortalCard
                    title="District Admin"
                    subtext="Collector & District Water Authority Portal for strategic planning, AI analytics, and final approvals."
                    type="admin"
                    colorClass="primary"
                    onClick={handlePortalSelect}
                    icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>}
                />

                <PortalCard
                    title="Nagar Parishad"
                    subtext="Urban Local Body (ULB) portal for managing city water clusters and filing bulk tanker requests."
                    type="nagar"
                    colorClass="emerald"
                    onClick={handlePortalSelect}
                    icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
                />

                <PortalCard
                    title="Gram Panchayat"
                    subtext="Village Level Empowerment portal for Sarpanch and VDO to report local water stress and request supply."
                    type="gram"
                    colorClass="amber"
                    onClick={handlePortalSelect}
                    icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>}
                />
            </div>

            <div className="mt-16 text-slate-400 text-sm font-medium tracking-widest uppercase">
                AI Driven • Secure Login • G2G Infrastructure
            </div>
        </div>
    );
}
