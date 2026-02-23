import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    MapIcon,
    TruckIcon,
    BellAlertIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Stress Map', href: '/dashboard/map', icon: MapIcon },
    { name: 'Tanker Allocation', href: '/dashboard/tankers', icon: TruckIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Alerts', href: '/dashboard/alerts', icon: BellAlertIcon },
];

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col glass-panel m-4 border-r-0 rounded-r-none z-10">
                <div className="flex flex-col flex-grow pt-5 bg-white/50 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4 mb-6">
                        <span className="text-xl font-bold text-primary-900 flex items-center gap-3">
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-lg">प्रबंधन साथी</span>
                                <span className="text-[10px] text-slate-500 font-normal uppercase tracking-tighter">AI Smart Water</span>
                            </div>
                        </span>
                    </div>
                    <div className="mt-5 flex-1 flex flex-col">
                        <nav className="flex-1 px-3 space-y-2">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500'
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-4 border-t border-slate-200/50">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary-500 to-primary-100 flex items-center justify-center text-primary-900 font-bold shadow-sm">
                                DA
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-700">District Admin</p>
                                <p className="text-xs text-slate-500">Government ID: #4421</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden m-4 ml-0 glass-panel rounded-l-none border-l border-white/40">
                <main className="flex-1 relative overflow-y-auto focus:outline-none bg-slate-50/50">
                    <div className="py-6 px-4 sm:px-6 md:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
