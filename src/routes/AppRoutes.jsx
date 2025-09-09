import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Circles from '../pages/Circles';
import Purchase from '../pages/Purchase';
import Settlements from '../pages/Settlements';
import Earnings from '../pages/Earnings';
import Missed from '../pages/Missed';
import Overview from '../pages/Overview';
import Support from '../pages/Support';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Register from '../pages/Register';
import ClaimOwnership from '../pages/ClaimOwnership';
import Home from '../pages/Home';
import Cp1 from '../pages/Cp1';
import Cp2 from '../pages/Cp2';
import MyDirect from '../pages/MyDirect';
import Referral from '../pages/Referral'
import MintDashboard from '../pages/MintDashboard';
import ActivateServers from '../pages/ActivateServers';
import Portfolios from '../pages/Portfolios';
import ClaimsHistory from '../pages/ClaimsHistory';
import TopUp from '../pages/TopUp';
import SpotCommission from '../pages/SpotCommission';
import DailyGrowth from '../pages/DailyGrowth';
import MyRank from '../pages/MyRank';
import GtoRewards from '../pages/GtoRewards';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/circles" element={<Circles />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/settlements" element={<Settlements />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/direct-payment" element={<Cp1 />} />
      <Route path="/random-payment" element={<Cp2 />} />
      <Route path="/my-direct" element={<MyDirect />} />
      <Route path="/missed" element={<Missed />} />
      <Route path="/overview" element={<Overview />} />
      {/* <Route path="/support" element={<Support />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/register" element={<Register />} />
      <Route path="/claim-ownership" element={<ClaimOwnership />} />
      <Route path="/claim-ownership-newUser" element={<ClaimOwnership />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/referral" element={<Referral />} />
      
      {/* ROPDY Mint Program Routes */}
      <Route path="/mint-dashboard" element={<MintDashboard />} />
      <Route path="/activate-servers" element={<ActivateServers />} />
      <Route path="/portfolios" element={<Portfolios />} />
      <Route path="/claims-history" element={<ClaimsHistory />} />
      <Route path="/top-up" element={<TopUp />} />
      <Route path="/spot-commission" element={<SpotCommission />} />
      <Route path="/daily-growth" element={<DailyGrowth />} />
      <Route path="/my-rank" element={<MyRank />} />
      <Route path="/gto-rewards" element={<GtoRewards />} />
    </Routes>
  );
}

export default AppRoutes;