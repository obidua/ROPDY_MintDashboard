import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';

const Portfolios = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    server: 'all',
    target: 'all',
    search: ''
  });
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Mock portfolio data
  const portfolios = [
    {
      slotId: 'SLOT001',
      server: 1,
      stakeUSD: 100,
      stakeRAMA: 1000,
      target: '2×',
      startDate: '2024-01-15',
      targetEndDate: '2026-11-01',
      accruedRAMA: 250.75,
      accruedUSD: 25.08,
      progressToCap: 25.1,
      status: 'Active',
      txHash: '0x1234...5678'
    },
    {
      slotId: 'SLOT002',
      server: 3,
      stakeUSD: 500,
      stakeRAMA: 5000,
      target: '3×',
      startDate: '2024-02-01',
      targetEndDate: '2027-03-15',
      accruedRAMA: 1875.50,
      accruedUSD: 187.55,
      progressToCap: 62.5,
      status: 'Active',
      txHash: '0xabcd...efgh'
    },
    {
      slotId: 'SLOT003',
      server: 2,
      stakeUSD: 200,
      stakeRAMA: 2000,
      target: '2×',
      startDate: '2023-12-01',
      targetEndDate: '2026-05-15',
      accruedRAMA: 4000,
      accruedUSD: 400,
      progressToCap: 100,
      status: 'Completed',
      txHash: '0x9876...5432'
    }
  ];

  const filteredPortfolios = portfolios.filter(portfolio => {
    if (filters.status !== 'all' && portfolio.status.toLowerCase() !== filters.status) return false;
    if (filters.server !== 'all' && portfolio.server.toString() !== filters.server) return false;
    if (filters.target !== 'all' && portfolio.target !== filters.target) return false;
    if (filters.search && !portfolio.slotId.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const paginatedPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const PortfolioDrawer = ({ portfolio, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark">
            Portfolio Details - {portfolio.slotId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Circle Timeline */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Circle Timeline</h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-admin-new-green rounded-full"></div>
              <span className="text-sm">Started</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded">
              <div 
                className="h-1 bg-admin-new-green rounded" 
                style={{ width: `${portfolio.progressToCap}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${portfolio.status === 'Completed' ? 'bg-admin-new-green' : 'bg-gray-300'}`}></div>
              <span className="text-sm">Target ({portfolio.target})</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Progress: {portfolio.progressToCap}% to {portfolio.target} cap
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard label="Daily Growth" value={`${(portfolio.accruedRAMA * 0.6).toFixed(2)} RAMA`} />
          <StatCard label="Spot Commission" value={`${(portfolio.accruedRAMA * 0.3).toFixed(2)} RAMA`} />
          <StatCard label="Global Turnover" value={`${(portfolio.accruedRAMA * 0.1).toFixed(2)} RAMA`} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="bg-admin-new-green text-white px-4 py-2 rounded-lg hover:bg-admin-new-green/80">
            Claim
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Top-up this Server
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            View Rules
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">💼 Portfolios (All Slots)</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track every slot, stake, and earning in one place.</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Portfolios" value={portfolios.length} />
          <StatCard label="Active Portfolios" value={portfolios.filter(p => p.status === 'Active').length} />
          <StatCard label="Completed Portfolios" value={portfolios.filter(p => p.status === 'Completed').length} />
          <StatCard label="Total Staked" value={`$${portfolios.reduce((sum, p) => sum + p.stakeUSD, 0).toLocaleString()}`} />
        </div>

        {/* Filters */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-admin-new-green/30 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Server</label>
              <select
                value={filters.server}
                onChange={(e) => handleFilterChange('server', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Servers</option>
                {[1, 2, 3, 4, 5].map(server => (
                  <option key={server} value={server.toString()}>Server {server}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target</label>
              <select
                value={filters.target}
                onChange={(e) => handleFilterChange('target', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Targets</option>
                <option value="2×">2×</option>
                <option value="3×">3×</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search Slot ID"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ status: 'all', server: 'all', target: 'all', search: '' })}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg border border-admin-new-green/30 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-white/70 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Slot ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Server</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Stake</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Target</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Timeline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Accrued</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedPortfolios.length > 0 ? (
                paginatedPortfolios.map((portfolio) => (
                  <tr key={portfolio.slotId} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {portfolio.slotId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      Server {portfolio.server}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${portfolio.stakeUSD} / {portfolio.stakeRAMA} RAMA
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {portfolio.target}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {portfolio.startDate} → {portfolio.targetEndDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {portfolio.accruedRAMA} RAMA / ${portfolio.accruedUSD}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {portfolio.progressToCap}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        portfolio.status === 'Active' 
                          ? 'bg-admin-new-green/20 text-admin-new-green' 
                          : 'bg-gray-200 text-gray-700 dark:text-gray-900'
                      }`}>
                        {portfolio.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedPortfolio(portfolio)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View
                        </button>
                        <button className="text-admin-new-green hover:text-admin-new-green/80 font-medium">
                          Claim
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No portfolios yet. Activate a server to create your first portfolio.
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
              Page {currentPage} of {totalPages} ({filteredPortfolios.length} total)
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

        {/* Portfolio Drawer */}
        {selectedPortfolio && (
          <PortfolioDrawer
            portfolio={selectedPortfolio}
            onClose={() => setSelectedPortfolio(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Portfolios;