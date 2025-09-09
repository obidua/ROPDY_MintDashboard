import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';

const ActivateServers = () => {
  const [selectedServer, setSelectedServer] = useState(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('2x');
  const [isActivating, setIsActivating] = useState(false);

  const servers = [
    {
      id: 1,
      minStake: 5.00,
      twoX: { horizon: 990, dailyROI: 0.20, monthlyROI: 6.06 },
      threeX: { horizon: 1350, dailyROI: 0.22, monthlyROI: 6.67 }
    },
    {
      id: 2,
      minStake: 10.00,
      twoX: { horizon: 900, dailyROI: 0.22, monthlyROI: 6.67 },
      threeX: { horizon: 1260, dailyROI: 0.24, monthlyROI: 7.14 }
    },
    {
      id: 3,
      minStake: 20.00,
      twoX: { horizon: 810, dailyROI: 0.25, monthlyROI: 7.41 },
      threeX: { horizon: 1170, dailyROI: 0.26, monthlyROI: 7.69 }
    },
    {
      id: 4,
      minStake: 40.00,
      twoX: { horizon: 720, dailyROI: 0.28, monthlyROI: 8.33 },
      threeX: { horizon: 1080, dailyROI: 0.28, monthlyROI: 8.33 }
    },
    {
      id: 5,
      minStake: 80.00,
      twoX: { horizon: 600, dailyROI: 0.33, monthlyROI: 10.00 },
      threeX: { horizon: 930, dailyROI: 0.32, monthlyROI: 9.68 }
    }
  ];

  const handleActivate = async () => {
    if (!selectedServer || !stakeAmount || parseFloat(stakeAmount) < selectedServer.minStake) {
      alert('Please select a server and enter a valid stake amount.');
      return;
    }

    setIsActivating(true);
    
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false);
      alert('Server activated successfully! Your circle has started.');
      // Reset form
      setSelectedServer(null);
      setStakeAmount('');
      setSelectedTarget('2x');
    }, 2000);
  };

  const getValidationMessage = () => {
    if (!selectedServer) return '';
    if (!stakeAmount) return '';
    if (parseFloat(stakeAmount) < selectedServer.minStake) {
      return `Amount must be at least $${selectedServer.minStake.toFixed(2)} (server minimum).`;
    }
    return '';
  };

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">🚀 Activate Servers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Choose a server, set stake amount (≥ minimum), and start your 2× or 3× journey.
          </p>
        </div>

        {/* ROPDY Joining Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">ROPDY Joining Amount</h3>
          <p className="text-blue-700 dark:text-blue-300">
            <strong>$20</strong> (by activating the 1st circle)
          </p>
        </div>

        {/* Server Plans Table */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Server Plans</h3>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-white/70 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Server</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Min Stake</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">2× Horizon (days)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">2× Daily ROI %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">2× Monthly ROI %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">3× Horizon (days)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">3× Daily ROI %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">3× Monthly ROI %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {servers.map((server) => (
                <tr 
                  key={server.id} 
                  className={`hover:bg-gray-100/50 dark:hover:bg-gray-800/30 ${
                    selectedServer?.id === server.id ? 'bg-admin-new-green/10' : ''
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${server.minStake.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.twoX.horizon}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.twoX.dailyROI.toFixed(2)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.twoX.monthlyROI.toFixed(2)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.threeX.horizon}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.threeX.dailyROI.toFixed(2)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{server.threeX.monthlyROI.toFixed(2)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedServer(server)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        selectedServer?.id === server.id
                          ? 'bg-admin-new-green text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {selectedServer?.id === server.id ? 'Selected' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activation Form */}
        {selectedServer && (
          <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
            <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">
              Activate Server {selectedServer.id}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stake Amount (USD)
                </label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder={`Enter stake amount (min: $${selectedServer.minStake.toFixed(2)})`}
                  className="w-full px-3 py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                  min={selectedServer.minStake}
                  step="0.01"
                />
                {getValidationMessage() && (
                  <p className="text-red-600 text-sm mt-1">{getValidationMessage()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Target
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="2x"
                      checked={selectedTarget === '2x'}
                      onChange={(e) => setSelectedTarget(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-gray-100">
                      2× Target ({selectedServer.twoX.horizon} days, {selectedServer.twoX.dailyROI}% daily)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="3x"
                      checked={selectedTarget === '3x'}
                      onChange={(e) => setSelectedTarget(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-gray-100">
                      3× Target ({selectedServer.threeX.horizon} days, {selectedServer.threeX.dailyROI}% daily)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleActivate}
              disabled={isActivating || getValidationMessage() !== ''}
              className="mt-6 w-full bg-admin-new-green text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-admin-new-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isActivating ? 'Activating...' : 'Activate Now'}
            </button>
          </div>
        )}

        {/* Info Notes */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Important Information</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">1.</span>
              <p><strong>Inclusive ROI:</strong> 2×/3× daily ROI % includes principal + reward.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">2.</span>
              <p><strong>Capping:</strong> 3× capping applies across Spot, Daily Growth, Self Stake, Global Turnover (excludes one-time cash rewards like $100 / $300).</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">3.</span>
              <p><strong>Deduction:</strong> 5% is deducted on every claim (rewards & income).</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">4.</span>
              <p><strong>Re-topup:</strong> After hitting the 3× cap, re-topup is required to continue receiving incomes.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">5.</span>
              <p><strong>Multi-Portfolio:</strong> You can create multiple portfolios on any server.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateServers;