import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';

const DailyGrowth = () => {
  const [recordsToShow, setRecordsToShow] = useState(40);

  // Mock portfolio data
  const portfolios = [
    {
      id: 1,
      server: 1,
      stake: 1000,
      target: '2×',
      accruedToday: 12.50,
      accruedTotal: 250.75,
      daysPassed: 125,
      daysRemaining: 865,
      canClaim: true
    },
    {
      id: 2,
      server: 3,
      stake: 5000,
      target: '3×',
      accruedToday: 62.50,
      accruedTotal: 1875.50,
      daysPassed: 300,
      daysRemaining: 870,
      canClaim: false
    },
    {
      id: 3,
      server: 2,
      stake: 2000,
      target: '2×',
      accruedToday: 0,
      accruedTotal: 4000,
      daysPassed: 900,
      daysRemaining: 0,
      canClaim: false,
      capReached: true
    }
  ];

  // Mock daily records
  const dailyRecords = [
    {
      id: 1,
      date: '2024-01-15',
      portfolioServer: 'Portfolio 1 / Server 1',
      dailyPercent: '0.20%',
      amount: 12.50,
      status: 'Accrued',
      txHash: ''
    },
    {
      id: 2,
      date: '2024-01-15',
      portfolioServer: 'Portfolio 2 / Server 3',
      dailyPercent: '0.26%',
      amount: 62.50,
      status: 'Accrued',
      txHash: ''
    },
    {
      id: 3,
      date: '2024-01-14',
      portfolioServer: 'Portfolio 1 / Server 1',
      dailyPercent: '0.20%',
      amount: 12.50,
      status: 'Claimed',
      txHash: '0x1234567890abcdef1234567890abcdef12345678'
    },
    {
      id: 4,
      date: '2024-01-14',
      portfolioServer: 'Portfolio 2 / Server 3',
      dailyPercent: '0.26%',
      amount: 62.50,
      status: 'Claimed',
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12'
    }
  ];

  const todayAccrued = portfolios.reduce((sum, p) => sum + p.accruedToday, 0);
  const thisMonthAccrued = todayAccrued * 15; // Mock calculation
  const averageDailyPercent = portfolios.length > 0 
    ? (portfolios.reduce((sum, p) => sum + (p.accruedToday / p.stake * 100), 0) / portfolios.length).toFixed(3)
    : 0;

  const displayedRecords = dailyRecords.slice(0, recordsToShow);
  const hasCapReached = portfolios.some(p => p.capReached);

  const handleClaim = (portfolioId) => {
    alert(`Processing claim for portfolio ${portfolioId}...`);
  };

  const handleViewSlot = (portfolioId) => {
    alert(`Viewing details for portfolio ${portfolioId}...`);
  };

  const loadMoreRecords = () => {
    setRecordsToShow(prev => prev + 40);
  };

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">📈 Daily Growth</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Your daily ROI accrual across active servers.</p>
        </div>

        {/* At-a-Glance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard 
            label="Today's Accrued" 
            value={`${todayAccrued.toFixed(2)} RAMA / $${(todayAccrued * 0.1).toFixed(2)}`} 
          />
          <StatCard 
            label="This Month" 
            value={`${thisMonthAccrued.toFixed(2)} RAMA / $${(thisMonthAccrued * 0.1).toFixed(2)}`} 
          />
          <StatCard 
            label="Average Daily %" 
            value={`${averageDailyPercent}% (weighted by stake)`} 
          />
        </div>

        {/* Team Daily Growth Reminder */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            💡 <strong>Reminder:</strong> Team Daily Growth shares follow the Level table (Total 35%).
          </p>
        </div>

        {/* Cap Reached Banner */}
        {hasCapReached && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">3× Cap Reached</h3>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Some portfolios have reached their 3× cap. Re-topup is required to continue earning.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {portfolios.map((portfolio) => (
            <div 
              key={portfolio.id} 
              className={`bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border ${
                portfolio.capReached 
                  ? 'border-red-400/50' 
                  : 'border-admin-new-green/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-admin-cyan dark:text-admin-cyan-dark">
                    Portfolio {portfolio.id} - Server {portfolio.server}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Stake: {portfolio.stake} RAMA | Target: {portfolio.target}
                  </p>
                </div>
                {portfolio.capReached && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Cap Reached
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accrued Today</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {portfolio.accruedToday.toFixed(2)} RAMA
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Accrued</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {portfolio.accruedTotal.toFixed(2)} RAMA
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress to Target</span>
                  <span>{portfolio.daysPassed} / {portfolio.daysPassed + portfolio.daysRemaining} days</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      portfolio.capReached ? 'bg-red-500' : 'bg-admin-new-green'
                    }`}
                    style={{ 
                      width: `${portfolio.daysRemaining === 0 ? 100 : (portfolio.daysPassed / (portfolio.daysPassed + portfolio.daysRemaining)) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {portfolio.daysRemaining > 0 ? `${portfolio.daysRemaining} days remaining` : 'Target reached'}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleClaim(portfolio.id)}
                  disabled={!portfolio.canClaim}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm ${
                    portfolio.canClaim
                      ? 'bg-admin-new-green text-white hover:bg-admin-new-green/80'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {portfolio.canClaim ? 'Claim' : 'Not Eligible'}
                </button>
                <button
                  onClick={() => handleViewSlot(portfolio.id)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold text-sm"
                >
                  View Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Records */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">
            Daily Records (Last {recordsToShow} records)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white/70 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Portfolio/Server</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Daily %</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {record.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {record.portfolioServer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {record.dailyPercent}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {record.amount.toFixed(2)} RAMA
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'Claimed' 
                          ? 'bg-admin-new-green/20 text-admin-new-green'
                          : 'bg-blue-400/20 text-blue-700'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {record.txHash ? (
                        <AddressDisplay value={record.txHash} type="tx" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          {recordsToShow < dailyRecords.length && (
            <div className="mt-4 text-center">
              <button
                onClick={loadMoreRecords}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-semibold"
              >
                Show More (+40 records)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyGrowth;