import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';

const GtoRewards = () => {
  const [claimHistory, setClaimHistory] = useState([
    {
      id: 1,
      reward: 'Reward 1',
      cashAmount: 100,
      percentageShare: 2.5,
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      date: '2024-01-15',
      daysRemaining: 650
    },
    {
      id: 2,
      reward: 'Reward 2',
      cashAmount: 300,
      percentageShare: 2.0,
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      date: '2024-01-10',
      daysRemaining: 645
    }
  ]);

  // Mock user progress data
  const userProgress = {
    selfBusiness: 250,
    directTeam: 2,
    directUSDStaked: 400,
    totalTeamSize: 8,
    totalTeamBusiness: 3500,
    reward4Achievers: 0,
    reward5Achievers: 0,
    reward6Achievers: 0,
    reward7Achievers: 0
  };

  // Reward definitions
  const rewards = [
    {
      id: 1,
      title: "$100 USD + 2.5% of Global T.O (730 days)",
      cashReward: 100,
      percentage: 2.5,
      requirements: {
        selfBusiness: { next: 300, total: 300 },
        directTeam: { next: 1, total: 3 },
        directUSDStaked: { next: 100, total: 500 },
        totalTeamSize: { next: 2, total: 10 },
        totalTeamBusiness: { next: 1500, total: 5000 }
      }
    },
    {
      id: 2,
      title: "$300 USD + 2% of Global T.O (730 days)",
      cashReward: 300,
      percentage: 2.0,
      requirements: {
        selfBusiness: { next: 250, total: 500 },
        directTeam: { next: 3, total: 5 },
        directUSDStaked: { next: 600, total: 1000 },
        totalTeamSize: { next: 12, total: 20 },
        totalTeamBusiness: { next: 6500, total: 10000 }
      }
    },
    {
      id: 3,
      title: "$500 USD + 1.5% of Global T.O (730 days)",
      cashReward: 500,
      percentage: 1.5,
      requirements: {
        selfBusiness: { next: 500, total: 1000 },
        directTeam: { next: 5, total: 7 },
        directUSDStaked: { next: 1000, total: 2000 },
        totalTeamSize: { next: 32, total: 40 },
        totalTeamBusiness: { next: 26500, total: 30000 }
      }
    },
    {
      id: 4,
      title: "$3,500 USD + 1% of Global T.O (730 days)",
      cashReward: 3500,
      percentage: 1.0,
      requirements: {
        selfBusiness: { next: 1000, total: 2000 },
        directTeam: { next: 8, total: 10 },
        directUSDStaked: { next: 2000, total: 3000 },
        totalTeamSize: { next: 92, total: 100 },
        totalTeamBusiness: { next: 96500, total: 100000 }
      }
    },
    {
      id: 5,
      title: "$11,000 USD + 0.75% of Global T.O (730 days)",
      cashReward: 11000,
      percentage: 0.75,
      requirements: {
        selfBusiness: { next: 1000, total: 3000 },
        directTeam: { next: 13, total: 15 },
        directUSDStaked: { next: 3000, total: 5000 },
        totalTeamSize: { next: 142, total: 150 },
        specialRequirement: "Help 4 people achieve Reward 4"
      }
    },
    {
      id: 6,
      title: "$41,000 USD + International Trip + 0.5% of Global T.O (730 days)",
      cashReward: 41000,
      percentage: 0.5,
      requirements: {
        selfBusiness: { next: 1000, total: 4000 },
        directTeam: { next: 18, total: 20 },
        directUSDStaked: { next: 5000, total: 7000 },
        totalTeamSize: { next: 192, total: 200 },
        specialRequirement: "Help 4 people achieve Reward 5"
      }
    },
    {
      id: 7,
      title: "$500,000 USD + 0.25% of Global T.O (730 days)",
      cashReward: 500000,
      percentage: 0.25,
      requirements: {
        selfBusiness: { next: 1000, total: 5000 },
        directTeam: { next: 23, total: 25 },
        directUSDStaked: { next: 7000, total: 10000 },
        totalTeamSize: { next: 292, total: 300 },
        specialRequirement: "Help 3 people achieve Reward 6"
      }
    },
    {
      id: 8,
      title: "$700,000 USD + 0.25% of Global T.O (730 days)",
      cashReward: 700000,
      percentage: 0.25,
      requirements: {
        selfBusiness: { next: 5000, total: 10000 },
        directTeam: { next: 33, total: 35 },
        directUSDStaked: { next: 15000, total: 25000 },
        totalTeamSize: { next: 392, total: 400 },
        specialRequirement: "Help 5 people achieve Reward 7"
      }
    }
  ];

  const checkEligibility = (reward) => {
    const req = reward.requirements;
    
    if (req.specialRequirement) {
      // For rewards 5-8, check special requirements
      const achieversNeeded = reward.id === 5 ? userProgress.reward4Achievers :
                             reward.id === 6 ? userProgress.reward5Achievers :
                             reward.id === 7 ? userProgress.reward6Achievers :
                             userProgress.reward7Achievers;
      return achieversNeeded >= (reward.id === 8 ? 5 : reward.id === 7 ? 3 : 4);
    }
    
    return (
      userProgress.selfBusiness >= req.selfBusiness.total &&
      userProgress.directTeam >= req.directTeam.total &&
      userProgress.directUSDStaked >= req.directUSDStaked.total &&
      userProgress.totalTeamSize >= req.totalTeamSize.total &&
      userProgress.totalTeamBusiness >= req.totalTeamBusiness.total
    );
  };

  const getProgressPercentage = (current, required) => {
    return Math.min((current / required) * 100, 100);
  };

  const handleClaim = (rewardId) => {
    alert(`Processing claim for Reward ${rewardId}...`);
  };

  const eligibleRewards = rewards.filter(reward => checkEligibility(reward));
  const activePercentage = claimHistory.reduce((sum, claim) => sum + claim.percentageShare, 0);

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">🎁 GTO Rewards (Claim)</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Fixed cash rewards + % of global turnover for up to 730 days.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Eligible Rewards" value={eligibleRewards.length} />
          <StatCard label="Active % of Global T.O" value={`${activePercentage}%`} />
          <StatCard label="Total Cash Claimed" value={`$${claimHistory.reduce((sum, claim) => sum + claim.cashAmount, 0).toLocaleString()}`} />
          <StatCard label="Claims History" value={claimHistory.length} />
        </div>

        {/* Reward Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {rewards.map((reward) => {
            const isEligible = checkEligibility(reward);
            const req = reward.requirements;
            
            return (
              <div 
                key={reward.id} 
                className={`bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border ${
                  isEligible ? 'border-admin-new-green' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark">
                    Reward {reward.id}
                  </h3>
                  {isEligible && (
                    <span className="px-2 py-1 bg-admin-new-green/20 text-admin-new-green text-xs rounded-full">
                      Eligible
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {reward.title}
                  </h4>
                </div>

                <div className="space-y-3 mb-4">
                  <h5 className="font-medium text-gray-700 dark:text-gray-300">Requirements (Next → Total)</h5>
                  
                  {req.specialRequirement ? (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Special:</strong> {req.specialRequirement}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Self Business:</span>
                        <span>${req.selfBusiness.next.toLocaleString()} → ${req.selfBusiness.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Direct Team:</span>
                        <span>{req.directTeam.next} → {req.directTeam.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Direct USD Staked:</span>
                        <span>${req.directUSDStaked.next.toLocaleString()} → ${req.directUSDStaked.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Team Size:</span>
                        <span>{req.totalTeamSize.next} → {req.totalTeamSize.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Team Business:</span>
                        <span>${req.totalTeamBusiness.next.toLocaleString()} → ${req.totalTeamBusiness.total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {!req.specialRequirement && (
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Your Progress</h5>
                    <div className="space-y-2">
                      {Object.entries(req).map(([key, value]) => {
                        const current = userProgress[key] || 0;
                        const percentage = getProgressPercentage(current, value.total);
                        
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-admin-new-green h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400 w-12">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleClaim(reward.id)}
                  disabled={!isEligible}
                  className={`w-full px-4 py-2 rounded-lg font-semibold ${
                    isEligible
                      ? 'bg-admin-new-green text-white hover:bg-admin-new-green/80'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isEligible ? 'Claim' : 'Not Eligible'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Claim Section */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Active Global Turnover Share</h3>
          
          {claimHistory.length > 0 ? (
            <div className="space-y-4">
              {claimHistory.map((claim) => (
                <div key={claim.id} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{claim.reward}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {claim.percentageShare}% of Global T.O | {claim.daysRemaining} days remaining
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-admin-new-green">${claim.cashAmount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Claimed: {claim.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No active global turnover shares.</p>
          )}
        </div>

        {/* Claim History */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Claim History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white/70 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Reward</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Cash</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">% T.O Share</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tx Hash</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {claimHistory.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.reward}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${claim.cashAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.percentageShare}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <AddressDisplay value={claim.txHash} type="tx" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {claim.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GTO Rules */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">GTO Rules</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">•</span>
              <p>Global Turnover share runs <strong>up to 730 days</strong> from achievement date.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">•</span>
              <p><strong>3× capping</strong> applies across all incomes <strong>except</strong> one-time cash rewards.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">•</span>
              <p><strong>5% deduction</strong> applies on every claim.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">•</span>
              <p><strong>KYC/Compliance and active-stake conditions may be required</strong> to receive % T.O.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-admin-new-green font-bold">•</span>
              <p>If cap is reached, <strong>re-topup</strong> is required to continue receiving incomes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GtoRewards;