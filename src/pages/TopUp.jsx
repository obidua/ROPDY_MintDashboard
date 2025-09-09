import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';

const TopUp = () => {
  const [selectedServer, setSelectedServer] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for servers
  const servers = [
    { id: 1, name: 'Server 1', currentStake: 100, status: 'Active' },
    { id: 2, name: 'Server 2', currentStake: 250, status: 'Active' },
    { id: 3, name: 'Server 3', currentStake: 500, status: 'Inactive' },
    { id: 4, name: 'Server 4', currentStake: 0, status: 'Not Started' },
    { id: 5, name: 'Server 5', currentStake: 750, status: 'Active' }
  ];

  const eligibleServers = servers.filter(server => server.status === 'Active');

  // Mock RAMA conversion rate (1 USD = 10 RAMA)
  const usdToRamaRate = 10;
  const requiredRama = usdAmount ? (parseFloat(usdAmount) * usdToRamaRate).toFixed(2) : '0.00';

  const handleTopUp = async () => {
    if (!selectedServer || !usdAmount || parseFloat(usdAmount) <= 0) {
      alert('Please select a server and enter a valid amount.');
      return;
    }

    setIsProcessing(true);

    // Simulate top-up process
    setTimeout(() => {
      setIsProcessing(false);
      alert('Top-up received. Balance will reflect after confirmation.');
      // Reset form
      setSelectedServer('');
      setUsdAmount('');
    }, 2000);
  };

  const handleCancel = () => {
    setSelectedServer('');
    setUsdAmount('');
  };

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">⬆️ Top-up</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Select a server to credit your stake or fees.</p>
        </div>

        {/* Server Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {servers.map(server => (
            <StatCard
              key={server.id}
              label={server.name}
              value={`$${server.currentStake} (${server.status})`}
            />
          ))}
        </div>

        {eligibleServers.length > 0 ? (
          <>
            {/* Top-up Panel */}
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
              <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-6">Top-up Panel</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Server
                  </label>
                  <select
                    value={selectedServer}
                    onChange={(e) => setSelectedServer(e.target.value)}
                    className="w-full px-3 py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Choose a server...</option>
                    {eligibleServers.map(server => (
                      <option key={server.id} value={server.id}>
                        {server.name} (Current: ${server.currentStake})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter Amount (USD)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={usdAmount}
                      onChange={(e) => setUsdAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">
                      USD
                    </div>
                  </div>
                  {usdAmount && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      You need <strong>{requiredRama} RAMA</strong>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleTopUp}
                  disabled={isProcessing || !selectedServer || !usdAmount}
                  className="flex-1 bg-admin-new-green text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-admin-new-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Top-up Now'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Converter */}
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
              <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">USD → RAMA Converter</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1 USD</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">US Dollar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">=</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{usdToRamaRate} RAMA</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">RAMA Token</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 <strong>Note:</strong> Network fees may apply during the transaction.
                </p>
              </div>
            </div>

            {/* Recent Top-ups */}
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
              <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Recent Top-ups</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-white/70 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Server</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount (USD)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount (RAMA)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">2024-01-15</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Server 1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">$50.00</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">500.00 RAMA</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-admin-new-green/20 text-admin-new-green">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">2024-01-10</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Server 2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">$100.00</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">1000.00 RAMA</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-400/20 text-yellow-700">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⬆️</div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Eligible Servers</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No eligible servers found. Activate a server first to enable top-up functionality.
            </p>
            <button
              onClick={() => window.location.href = '/activate-servers'}
              className="bg-admin-new-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-admin-new-green/80 transition-colors"
            >
              Activate a Server
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUp;