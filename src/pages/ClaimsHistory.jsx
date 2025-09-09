import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';

const ClaimsHistory = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Mock claims data
  const claims = [
    {
      id: 1,
      date: '2024-01-15 14:30:00',
      type: 'Daily Growth',
      grossAmount: 125.50,
      deduction: 6.28,
      netPaid: 119.22,
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      status: 'Success'
    },
    {
      id: 2,
      date: '2024-01-14 09:15:00',
      type: 'Spot Commission',
      grossAmount: 75.25,
      deduction: 3.76,
      netPaid: 71.49,
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      status: 'Success'
    },
    {
      id: 3,
      date: '2024-01-13 16:45:00',
      type: 'Global Turnover',
      grossAmount: 200.00,
      deduction: 10.00,
      netPaid: 190.00,
      txHash: '0x9876543210fedcba9876543210fedcba98765432',
      status: 'Pending'
    },
    {
      id: 4,
      date: '2024-01-12 11:20:00',
      type: 'GTO Rewards',
      grossAmount: 500.00,
      deduction: 25.00,
      netPaid: 475.00,
      txHash: '0xfedcba9876543210fedcba9876543210fedcba98',
      status: 'Success'
    },
    {
      id: 5,
      date: '2024-01-11 13:10:00',
      type: 'One-time Rewards',
      grossAmount: 100.00,
      deduction: 5.00,
      netPaid: 95.00,
      txHash: '',
      status: 'Failed'
    }
  ];

  const pendingClaims = claims.filter(claim => claim.status === 'Pending');
  const totalGross = claims.reduce((sum, claim) => sum + claim.grossAmount, 0);
  const totalDeductions = claims.reduce((sum, claim) => sum + claim.deduction, 0);
  const totalNet = claims.reduce((sum, claim) => sum + claim.netPaid, 0);

  const filteredClaims = claims.filter(claim => {
    if (filters.type !== 'all' && claim.type !== filters.type) return false;
    if (filters.status !== 'all' && claim.status.toLowerCase() !== filters.status) return false;
    if (filters.minAmount && claim.grossAmount < parseFloat(filters.minAmount)) return false;
    if (filters.maxAmount && claim.grossAmount > parseFloat(filters.maxAmount)) return false;
    // Date filtering would be implemented here
    return true;
  });

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClaimAll = () => {
    alert('Processing bulk claim...');
  };

  const handleIndividualClaim = (claimId) => {
    alert(`Processing claim ${claimId}...`);
  };

  const exportData = (format) => {
    alert(`Exporting data as ${format}...`);
  };

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">🧾 Claims & History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">All claims, payouts, and on-chain receipts.</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Claims" value={claims.length} />
          <StatCard label="Total Gross" value={`${totalGross.toFixed(2)} RAMA`} />
          <StatCard label="Total Deductions" value={`${totalDeductions.toFixed(2)} RAMA`} />
          <StatCard label="Total Net Paid" value={`${totalNet.toFixed(2)} RAMA`} />
        </div>

        {/* Pending Claims Block */}
        {pendingClaims.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  You have {pendingClaims.length} pending claim(s).
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Total pending: {pendingClaims.reduce((sum, claim) => sum + claim.netPaid, 0).toFixed(2)} RAMA
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

        {/* Filters */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-admin-new-green/30 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Types</option>
                <option value="Daily Growth">Daily Growth</option>
                <option value="Spot Commission">Spot Commission</option>
                <option value="Global Turnover">Global Turnover</option>
                <option value="GTO Rewards">GTO Rewards</option>
                <option value="One-time Rewards">One-time Rewards</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Amount</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Amount</label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                placeholder="1000.00"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => exportData('CSV')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportData('PDF')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
          >
            Export PDF
          </button>
        </div>

        {/* Claims Table */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg border border-admin-new-green/30 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-white/70 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date / Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount (Gross)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Deduction (5%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Net Paid</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tx Hash</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedClaims.length > 0 ? (
                paginatedClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.type}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.grossAmount.toFixed(2)} RAMA
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.deduction.toFixed(2)} RAMA
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.netPaid.toFixed(2)} RAMA
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {claim.txHash ? (
                        <AddressDisplay value={claim.txHash} type="tx" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        claim.status === 'Success' 
                          ? 'bg-admin-new-green/20 text-admin-new-green'
                          : claim.status === 'Pending'
                          ? 'bg-yellow-400/20 text-yellow-700'
                          : 'bg-red-400/20 text-red-700'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {claim.status === 'Pending' && (
                        <button
                          onClick={() => handleIndividualClaim(claim.id)}
                          className="text-admin-new-green hover:text-admin-new-green/80 font-medium"
                        >
                          Claim
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No claims found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages} ({filteredClaims.length} total)
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Error Messages */}
        <div className="mt-6 space-y-2">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-red-800 dark:text-red-200 text-sm">
              ⚠️ If claim conditions are not met, check time window, cap limits, or minimum amount requirements.
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
            <p className="text-orange-800 dark:text-orange-200 text-sm">
              💡 If you've reached your 3× cap, re-topup is required to resume income claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsHistory;