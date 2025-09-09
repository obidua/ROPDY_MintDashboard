import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileHeader from './MobileHeader';
import AddressDisplay from './AddressDisplay';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useStore } from "../Store/UserStore";

const Sidebar = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [walletPrompted, setWalletPrompted] = useState(false);
  const [userDisconnected, setUserDisconnected] = useState(false);
  const [openGroup, setOpenGroup] = useState('circle'); // 'circle' or 'mint'

  const { address, isConnected } = useAppKitAccount();
  const userAddress = JSON.parse(localStorage.getItem("UserData"))?.address;


  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      setIsActive(true);
    }
  }, [address, isConnected])

  useEffect(() => {
    if (userAddress) {
      setWalletAddress(userAddress);
    }
  }, [userAddress])


  // useEffect(() => {
  //   const checkUserAfterConnect = async () => {
  //     if (walletPrompted && isConnected && address) {
  //       try {
  //         const userData = {
  //           address: address,
  //           data: {}
  //         };

  //         localStorage.setItem("UserData", JSON.stringify(userData));

  //         navigate("/dashboard");
  //       } catch (err) {
  //         console.error("Error checking user:", err);
  //         toast.error("Failed to verify user.");
  //       }
  //     }
  //   };
  //   checkUserAfterConnect();
  // }, [walletPrompted, isConnected, address])


  const isUserExist = useStore((state) => state.isUserExist)

  useEffect(() => {
    const checkUserAfterConnect = async () => {
      if (walletPrompted && isConnected && address) {
        try {

          const isExist = await isUserExist(address);

          if (isExist) {

            console.log("isExist", isExist)
            const userData = {
              address: address,
              data: {}
            };

            localStorage.setItem("UserData", JSON.stringify(userData));
            navigate("/dashboard");
          } else {
            navigate("/register");
          }

        } catch (err) {
          console.error("Error checking user:", err);
          toast.error("Failed to verify user.");
        }
      }
    };
    checkUserAfterConnect();
  }, [walletPrompted, isConnected, address])

  const handleConnect = async () => {
    try {
      await open(); // Always call open first
      setWalletPrompted(true); // Trigger effect to navigate
    } catch (err) {
      console.error("Wallet connect error:", err);
      Swal.fire("Connection Failed", "Could not connect to wallet", "error");
    }
  };


  useEffect(() => {
    if (userDisconnected) {
      setUserDisconnected(false);
      navigate("/");
    }
  }, [userDisconnected, navigate]);

  const handleDisconnect = async () => {
    setIsActive(false);
    localStorage.removeItem("UserData");
    await disconnect();

    setUserDisconnected(true);

  };
  const handleViewLogout = async () => {
    localStorage.removeItem("UserData");

    setUserDisconnected(true);
  }

  const menuGroups = [
    {
      id: 'circle',
      title: "ROPDY Circle Program",
      icon: "🔄",
      sections: [
        {
          title: "Main",
          items: [
            { label: "Dashboard", icon: "⚡", path: "/dashboard" },
            { label: "Overview / Tree", icon: "📈", path: "/overview" },
            { label: "My Direct", icon: "👥", path: "/my-direct" },
          ]
        },
        {
          title: "Circles",
          items: [
            { label: "My Circles", icon: "🔄", path: "/circles" },
            { label: "Purchase Circle", icon: "🛒", path: "/purchase" },
          ]
        },
        {
          title: "Finance",
          items: [
            { label: "Settlements", icon: "📥", path: "/settlements" },
            { label: "Earnings", icon: "💰", path: "/earnings" },
            { label: "CP1 (Direct)", icon: "🧾", path: "/direct-payment" },
            { label: "CP2 (Random)", icon: "🎲", path: "/random-payment" },
            { label: "Missed Payments", icon: "🚫", path: "/missed" },
          ]
        },
        {
          title: "Account",
          items: [
            { label: "Profile", icon: "👤", path: "/profile" },
            { label: "Settings", icon: "⚙️", path: "/settings" },
          ]
        },
      ]
    },
    {
      id: 'mint',
      title: "ROPDY Mint Program",
      icon: "🏭",
      sections: [
        {
          title: "Mint Operations",
          items: [
            { label: "Mint Dashboard", icon: "🏭", path: "/mint-dashboard" },
            { label: "Activate Servers", icon: "🚀", path: "/activate-servers" },
            { label: "Portfolios (All Slots)", icon: "💼", path: "/portfolios" },
            { label: "Claims & History", icon: "🗓️", path: "/claims-history" },
            { label: "Top-up", icon: "⬆️", path: "/top-up" },
          ]
        },
        {
          title: "Rewards & Growth",
          items: [
            { label: "Spot Commission", icon: "💰", path: "/spot-commission" },
            { label: "Daily Growth", icon: "📈", path: "/daily-growth" },
            { label: "My Rank & Progress", icon: "🏆", path: "/my-rank" },
            { label: "GTO Rewards (Claim)", icon: "🎁", path: "/gto-rewards" },
          ]
        },
      ]
    },
  ];

  // useEffect(() => {
  //   if (userAddress && address && userAddress !== address) {
  //     handleDisconnect();
  //   }
  // }, [isConnected])

  return (
    <>
      <MobileHeader
        isConnected={isActive}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <aside className={`w-64 h-screen bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 shadow-lg fixed border-r border-admin-gold-900/50 transition-transform duration-300 z-50 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className="p-4 border-b border-admin-gold-900/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold tracking-wide text-admin-cyan dark:text-admin-cyan-dark">
              ⚡ ROPDY
            </span>
            {isActive && (address == userAddress) ? (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-admin-new-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-admin-new-green"></span>
                </span>
                <button
                  onClick={handleDisconnect}
                  className="text-lg text-red-500 hover:text-red-400 transition-colors"
                >
                  ⏻
                </button>
              </div>
            ) : userAddress ? (
              (
                <button
                  onClick={handleViewLogout}
                  className="bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg font-semibold shadow-md hover:bg-red-800/80 transition-colors border border-red-900/30"
                >
                  Logout
                </button>
              )
            ) : (
              (
                <button
                  onClick={handleConnect}
                  className="bg-admin-new-green text-white px-3 py-1.5 text-sm rounded-lg font-semibold shadow-md hover:bg-admin-new-green/80 transition-colors border border-admin-new-green/30"
                >
                  Connect
                </button>
              )
            )}
          </div>

          <div className="mt-2 text-sm">
            <AddressDisplay value={walletAddress} type="address" />
          </div>

        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4">
            {menuGroups.map((group) => (
              <div key={group.id} className="mb-4">
                <button
                  onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-bold text-admin-cyan dark:text-admin-cyan-dark hover:bg-admin-gold-900/20 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">{group.icon}</span>
                    <span>{group.title}</span>
                  </div>
                  <span className={`transform transition-transform ${openGroup === group.id ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                </button>
                
                {openGroup === group.id && (
                  <div className="mt-2 ml-4">
                    {group.sections.map((section) => (
                      <div key={section.title} className="mb-3">
                        <div className="px-4 py-2 text-xs font-semibold text-admin-cyan dark:text-admin-cyan-dark opacity-70">
                          {section.title}
                        </div>
                        {section.items.map(({ label, icon, path }) => (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center px-4 py-2 rounded-lg mb-1 transition-colors ${pathname === path
                              ? "bg-admin-gold-900/50 backdrop-blur-sm text-admin-cyan dark:text-admin-cyan-dark border border-admin-gold-700/50"
                              : "hover:bg-admin-gold-900/30 text-gray-700 dark:text-gray-300 hover:text-admin-cyan dark:hover:text-admin-cyan-dark"
                              }`}
                          >
                            <span className="mr-3 text-lg">{icon}</span>
                            <span className="text-sm">{label}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-admin-gold-900/50 text-center text-sm text-admin-cyan dark:text-admin-cyan-dark flex-shrink-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="mb-3">
            {(isActive && address == userAddress) || userAddress ? (
              <button
                onClick={isActive && address == userAddress ? handleDisconnect : handleViewLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors border border-red-700/30"
              >
                {isActive && address == userAddress ? '⏻ Disconnect' : '🚪 Exit View'}
              </button>
            ) : null}
          </div>
          <div>
            <p>Powered by RAMA</p>
            <p>v1.0 Beta</p>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-200 dark:bg-black bg-opacity-50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
                </div>
                {section.items.map(({ label, icon, path }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-2 rounded-lg mb-1 transition-colors ${pathname === path
                      ? "bg-admin-gold-900/50 backdrop-blur-sm text-admin-cyan dark:text-admin-cyan-dark border border-admin-gold-700/50"
                      : "hover:bg-admin-gold-900/30 text-gray-700 dark:text-gray-300 hover:text-admin-cyan dark:hover:text-admin-cyan-dark"
                      }`}
                  >
                    <span className="mr-3 text-lg">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-admin-gold-900/50 text-center text-sm text-admin-cyan dark:text-admin-cyan-dark flex-shrink-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <p>Powered by RAMA</p>
          <p>v1.0 Beta</p>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-200 dark:bg-black bg-opacity-50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;