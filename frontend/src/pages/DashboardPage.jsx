import React from 'react';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">District Overview</h1>
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
