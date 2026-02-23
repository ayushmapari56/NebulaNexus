import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const { role } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Role-based redirection logic
        setTimeout(() => {
            if (role === 'admin') navigate('/dashboard');
            else if (role === 'nagar-parishad') navigate('/portal/nagar-parishad');
            else if (role === 'gram-panchayat') navigate('/portal/gram-panchayat');
            else navigate('/dashboard'); // Fallback
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative z-10 animate-fade-in-up">
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="Jal-Pravandhan Saathi Logo" className="mx-auto h-24 mb-4 drop-shadow-[0_0_10px_rgba(14,165,233,0.3)] animate-pulse" />
                    <h1 className="text-3xl font-bold text-white tracking-tight">जल-प्रबंधन साथी</h1>
                    <p className="text-slate-300 mt-2 text-sm tracking-wide">AI आधारित स्मार्ट जल प्रबंधन</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Official ID / Email</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-500"
                            placeholder="collector@district.gov.in"
                            defaultValue="admin@sih.gov.in"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-500"
                            placeholder="••••••••"
                            defaultValue="password123"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-slate-300 cursor-pointer hover:text-white transition-colors">
                            <input type="checkbox" className="mr-2 rounded border-slate-600 bg-slate-800 text-primary-500 focus:ring-primary-500" />
                            Remember device
                        </label>
                        <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary-600 hover:bg-primary-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg hover:shadow-primary-500/25 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Secure Login'}
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                        Authorized District Personnel Only
                    </p>
                </form>
            </div>
        </div>
    );
}
