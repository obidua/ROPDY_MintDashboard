import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';

const SpotCommission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsToShow, setRecordsToShow] = useState(40);

  // Mock commission distribution data
  const distributionData = [
    { level: 'L1', spotCommission: '5%', dailyGrowthShare: '10%' },
    { level: 'L2', spotCommission: '0.50%', dailyGrowthShare: '5%' },
    { level: 'L3', spotCommission: '0.50%', dailyGrowthShare: '3%' },
    { level: 'L4', spotCommission: '0.50%', dailyGrowthShare: '2%' },
    { level: 'L5', spotCommission: '0.50%', dailyGrowthShare: '2%' },
    { level: 'L6', spotCommission: '0.50%', dailyGrowthShare: '2%' },
    { level: 'L7', spotCommission: '0.50%', dailyGrowthShare: '2%' },
    { level: 'L8', spotCommission: '0.50%', dailyGrowthShare: '2%' },
    { level: 'L9', spotCommission: '0.50%', dailyGrowthShare: '2%' },
    { level: 'L10', spotCommission: '1%', dailyGrowthShare: '5%' }
  ];

  // Mock earnings data
  const mockEarnings = [
    {
      id: 1,
      dateTime: '2024-01-15 14:30:00',
      fromUser: '0x1234567890abcdef1234567890abcdef12345678',
      level: 'L1',
      commissionPercent: '5%',
      grossAmount: 125.50,
      netAmount: 119.22,
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      status: 'Claimed'
    },
    {
      id: 2,
      dateTime: '2024-01-14 09:15:00',
      fromUser: '0xabcdef1234567890abcdef1234567890abcdef12',
      level: 'L2',
      commissionPercent: '0.50%',
      grossAmount: 25.75,
      netAmount: 24.46,
      txHash: '',
      status: 'Eligible'
    },
    {
      id: 3,
      dateTime: '2024-01-13 16:45:00',
      fromUser: '0x9876543210fedcba9876543210fedcba98765432',
      level: 'L3',
      commissionPercent: '0.50%',
      grossAmount: 15.25,
      netAmount: 14.49,
      txHash: '0x9876543210fedcba9876543210fedcba98765432',
      status: 'Claimed'
    },
    {
      id: 4,
      dateTime: '2024-01-12 11:20:00',
      fromUser: '0xfedcba9876543210fedcba9876543210fedcba98',
      level: 'L1',
      commissionPercent: '5%',
      grossAmount: 200.00,
      netAmount: 190.00,
      txHash: '',
      status: 'Locked'
    }
  ];

  const totalSpotEarned = mockEarnings.reduce((sum, earning) => sum + earning.grossAmount, 0);
  const thisMonthEarnings = mockEarnings
    .filter(earning => new Date(earning.dateTime).getMonth() === new Date().getMonth())
    .reduce((sum, earning) => sum + earning.grossAmount, 0);
  const eligibleToClaim = mockEarnings
    .filter(earning => earning.status === 'Eligible')
    .reduce((sum, earning) => sum + earning.netAmount, 0);

  const displayedEarnings = mockEarnings.slice(0, recordsToShow);
  const eligibleEarnings = mockEarnings.filter(earning => earning.status === 'Eligible');

  const handleClaimIndividual = (earningId) => {
    alert(`Processing claim for earning ${earningId}...`);
  };

  const handleClaimAll = () => {
    if (eligibleEarnings.length === 0) {
      alert('No eligible earnings to claim.');
      return;
    }
    alert(`Processing claim for ${eligibleEarnings.length} eligible earnings...`);
  };

  const loadMoreRecords = () => {
    setRecordsToShow(prev => prev + 40);
  };

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">💸 Spot Commission</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Instant referral commissions by level.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Spot Earned" value={`${totalSpotEarned.toFixed(2)} RAMA`} />
          <StatCard label="This Month" value={`${thisMonthEarnings.toFixed(2)} RAMA`} />
          <StatCard label="Eligible to Claim (Net)" value={`${eligibleToClaim.toFixed(2)} RAMA`} />
        </div>

        {/* Distribution Table */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Commission Distribution</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white/70 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Spot Commission</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Daily Growth Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {distributionData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {row.level}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {row.spotCommission}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {row.dailyGrowthShare}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-800 font-semibold">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    Totals
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    10%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    35%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Claim Actions */}
        {eligibleEarnings.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  You have {eligibleEarnings.length} eligible commission(s) to claim.
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Total eligible: {eligibleToClaim.toFixed(2)} RAMA (net after 5% deduction)
                </p>
              </div>
              <button
                onClick={handleClaimAll}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-semibold"
              >
                Claim All
              </button>
            </div>
          </div>
        )}

        {/* Daily Earnings Table */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">
            Daily Earnings (Last {recordsToShow} records)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white/70 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date/Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">From (User/Level)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Commission %</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount (Gross/Net)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tx Hash</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {earning.dateTime}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div>
                        <AddressDisplay value={earning.fromUser} type="address" />
                        <div className="text-xs text-gray-500 dark:text-gray-400">{earning.level}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {earning.commissionPercent}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <div>
                        <div>{earning.grossAmount.toFixed(2)} RAMA</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Net: {earning.netAmount.toFixed(2)} RAMA
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {earning.txHash ? (
                        <AddressDisplay value={earning.txHash} type="tx" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        earning.status === 'Claimed' 
                          ? 'bg-admin-new-green/20 text-admin-new-green'
                          : earning.status === 'Eligible'
                          ? 'bg-yellow-400/20 text-yellow-700'
                          : 'bg-gray-400/20 text-gray-700'
                      }`}>
                        {earning.status}
                        {earning.status === 'Locked' && (
                          <span className="ml-1" title="Unlock by achieving required rank">🔒</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {earning.status === 'Eligible' && (
                        <button
                          onClick={() => handleClaimIndividual(earning.id)}
                          className="text-admin-new-green hover:text-admin-new-green/80 font-medium"
                        >
                          Claim
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          {recordsToShow < mockEarnings.length && (
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

        {/* Footnote */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            💡 <strong>Note:</strong> All claims are subject to 5% deduction. Level eligibility follows system rank rules.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotCommission;