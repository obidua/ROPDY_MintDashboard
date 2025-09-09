import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import { Link } from 'react-router-dom';

const MintDashboard = () => {
  const [chartToggle, setChartToggle] = useState('RAMA'); // RAMA or USD

  // Mock data for demonstration
  const stats = {
    totalServersStarted: 5,
    inactiveServers: 1,
    activePortfolios: 8,
    totalStakedUSD: 2500,
    totalStakedRAMA: 25000,
    remainingCap: 15000,
    currentDailyGrowthRAMA: 125.50,
    currentDailyGrowthUSD: 12.55,
    totalSpotCommissionRAMA: 850.75,
    totalSpotCommissionUSD: 85.08
  };

  const quickActions = [
    { label: 'Start RAMA Minting', path: '/activate-servers', icon: '🚀', color: 'bg-green-600' },
    { label: 'Activate New Server', path: '/activate-servers', icon: '⚡', color: 'bg-blue-600' },
    { label: 'Top-up', path: '/top-up', icon: '⬆️', color: 'bg-purple-600' },
    { label: 'Go to Claims', path: '/claims-history', icon: '🧾', color: 'bg-orange-600' }
  ];

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">🏭 Mint Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Live ROPDY Minting summary across all servers and portfolios.</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/activate-servers">
            <StatCard label="Total Servers Started" value={stats.totalServersStarted} />
          </Link>
          <StatCard label="Inactive Servers" value={stats.inactiveServers} />
          <Link to="/portfolios">
            <StatCard label="Active Portfolios" value={stats.activePortfolios} />
          </Link>
          <StatCard 
            label="Total Staked" 
            value={`$${stats.totalStakedUSD.toLocaleString()} / ${stats.totalStakedRAMA.toLocaleString()} RAMA`} 
          />
          <StatCard label="Remaining Cap" value={`${stats.remainingCap.toLocaleString()} RAMA`} />
          <StatCard 
            label="Current Daily Growth" 
            value={`${stats.currentDailyGrowthRAMA} RAMA / $${stats.currentDailyGrowthUSD}`} 
          />
          <StatCard 
            label="Total Spot Commission" 
            value={`${stats.totalSpotCommissionRAMA} RAMA / $${stats.totalSpotCommissionUSD}`} 
          />
        </div>

        {/* Charts & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Growth Trend */}
          <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark">Daily Growth Trend (30 days)</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartToggle('RAMA')}
                  className={`px-3 py-1 rounded text-sm ${chartToggle === 'RAMA' ? 'bg-admin-new-green text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  RAMA
                </button>
                <button
                  onClick={() => setChartToggle('USD')}
                  className={`px-3 py-1 rounded text-sm ${chartToggle === 'USD' ? 'bg-admin-new-green text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  USD
                </button>
              </div>
            </div>
            <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
              📈 Chart showing {chartToggle} growth trend (Chart implementation needed)
            </div>
          </div>

          {/* Server Progress */}
          <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
            <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Server Progress</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(server => (
                <div key={server} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16">Server {server}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-admin-new-green h-2 rounded-full" 
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {server <= 3 ? '2×' : '3×'} Target
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Referral Funnel */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Referral Funnel</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Direct Referrals" value="12" />
            <StatCard label="Total Team" value="45" />
            <StatCard label="Growth (7 days)" value="+8%" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-80 transition-opacity text-center`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-semibold">{action.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            💡 <strong>Note:</strong> Earnings percentages for 2×/3× include principal + reward. See Notes for more details.
          </p>
        </div>

        {/* Empty States */}
        {stats.totalServersStarted === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏭</div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Servers Active</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't activated a server yet. Activate your first server to start minting.
            </p>
            <Link
              to="/activate-servers"
              className="bg-admin-new-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-admin-new-green/80 transition-colors"
            >
              Activate Your First Server
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintDashboard;