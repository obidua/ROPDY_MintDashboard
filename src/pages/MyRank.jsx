import React from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';

const MyRank = () => {
  // Mock user data
  const currentRank = "Silver Achiever";
  const nextRank = "Gold Achiever";
  
  // Mock progress data
  const progress = {
    directTeam: { current: 8, required: 15, total: 15 },
    directUSDStaked: { current: 2500, required: 5000, total: 5000 },
    totalTeamSize: { current: 45, required: 100, total: 100 },
    selfBusiness: { current: 1200, required: 2000, total: 2000 },
    totalTeamBusiness: { current: 15000, required: 30000, total: 30000 }
  };

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: "User #1234", teamBusiness: 150000, rewardsClaimed: 25000 },
    { rank: 2, name: "User #5678", teamBusiness: 125000, rewardsClaimed: 18500 },
    { rank: 3, name: "User #9012", teamBusiness: 98000, rewardsClaimed: 15200 },
    { rank: 4, name: "User #3456", teamBusiness: 87500, rewardsClaimed: 12800 },
    { rank: 5, name: "User #7890", teamBusiness: 76200, rewardsClaimed: 11400 },
    { rank: 6, name: "User #2345", teamBusiness: 65800, rewardsClaimed: 9800 },
    { rank: 7, name: "User #6789", teamBusiness: 58900, rewardsClaimed: 8600 },
    { rank: 8, name: "User #0123", teamBusiness: 52400, rewardsClaimed: 7900 },
    { rank: 9, name: "User #4567", teamBusiness: 47300, rewardsClaimed: 7200 },
    { rank: 10, name: "User #8901", teamBusiness: 42100, rewardsClaimed: 6500 }
  ];

  const getProgressPercentage = (current, required) => {
    return Math.min((current / required) * 100, 100);
  };

  const ProgressBar = ({ label, current, required, total, unit = "" }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current.toLocaleString()}{unit} / {required.toLocaleString()}{unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div 
          className="bg-admin-new-green h-3 rounded-full transition-all duration-300"
          style={{ width: `${getProgressPercentage(current, required)}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>{getProgressPercentage(current, required).toFixed(1)}% Complete</span>
        <span>Target: {total.toLocaleString()}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">🏅 My Rank & Progress</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Hit milestones to unlock deeper level benefits and GTO eligibility.
          </p>
        </div>

        {/* Current Rank Header */}
        <div className="bg-gradient-to-r from-admin-new-green/20 to-admin-cyan/20 dark:from-admin-new-green/10 dark:to-admin-cyan-dark/10 rounded-lg p-6 mb-8 border border-admin-new-green/30">
          <div className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-2">
              You Are: {currentRank}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Next Rank: <span className="font-semibold text-admin-new-green">{nextRank}</span>
              <span className="ml-2 cursor-help" title="Complete all progress bars below to achieve next rank">
                ℹ️
              </span>
            </p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 mb-8">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-6">
            Progress to {nextRank}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ProgressBar
                label="Direct Team (count)"
                current={progress.directTeam.current}
                required={progress.directTeam.required}
                total={progress.directTeam.total}
              />
              
              <ProgressBar
                label="Direct USD Staked"
                current={progress.directUSDStaked.current}
                required={progress.directUSDStaked.required}
                total={progress.directUSDStaked.total}
                unit="$"
              />
              
              <ProgressBar
                label="Total Team Size"
                current={progress.totalTeamSize.current}
                required={progress.totalTeamSize.required}
                total={progress.totalTeamSize.total}
              />
            </div>
            
            <div>
              <ProgressBar
                label="Self Business"
                current={progress.selfBusiness.current}
                required={progress.selfBusiness.required}
                total={progress.selfBusiness.total}
                unit="$"
              />
              
              <ProgressBar
                label="Total Team Business"
                current={progress.totalTeamBusiness.current}
                required={progress.totalTeamBusiness.required}
                total={progress.totalTeamBusiness.total}
                unit="$"
              />
            </div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Direct Team" value={progress.directTeam.current} />
          <StatCard label="Direct USD Staked" value={`$${progress.directUSDStaked.current.toLocaleString()}`} />
          <StatCard label="Total Team Size" value={progress.totalTeamSize.current} />
          <StatCard label="Self Business" value={`$${progress.selfBusiness.current.toLocaleString()}`} />
          <StatCard label="Team Business" value={`$${progress.totalTeamBusiness.current.toLocaleString()}`} />
        </div>

        {/* Leaderboard */}
        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
          <h3 className="text-lg font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">
            Leaderboard (Top 10)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white/70 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Team Business</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rewards Claimed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {leaderboard.map((user) => (
                  <tr key={user.rank} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      <div className="flex items-center">
                        {user.rank <= 3 && (
                          <span className="mr-2">
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                        #{user.rank}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${user.teamBusiness.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${user.rewardsClaimed.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            💡 <strong>Note:</strong> Rank updates every 24h or after major milestones. 
            GTO eligibility and level benefits unlock automatically upon rank achievement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyRank;