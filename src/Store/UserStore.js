import { create } from "zustand";
import Web3, { errors } from "web3";
import Swal from "sweetalert2";

// const Contract = {
//     "ROPDY_VIEW": "0x158d0C166732557e9dBD9B272430e0bf158FcE95",
//     "ROPDY_ROOT": "0x67f395e14Ef05f3dD31A2936426035D867f82C33",
// }

// const fetchContractAbi = async (contractName) => {
//     try {
//         const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${Contract[contractName]}`);
//         const data = await response.json();
//         console.log("Contract ABI:", data.abi); // Log the ABI to the console
//         console.log("Contract Address:", Contract[contractName]); // Log the contract address to the console
//         return {
//             abi: data.abi,
//             contractAddress: Contract[contractName]
//         };
//     } catch (error) {
//         console.error("Error fetching contract ABI:", error);
//         throw error;
//     }
// }

const Contract = {
  ROPDY_VIEW: "0x6D126941B21cC0e32b8b128851a3Ef9A72587fC1",
  ROPDY_ROOT: "0x478F02521e5A86D4bFEbaF0730446E2B45b3e95d",
  ROPDY_PRICECONV: "0xA7ECB3E3f34108C4f8F729Af3e317Ba9a4B3fF6C",
};

const fetchContractAbi = async (contractName) => {
  try {
    const response = await fetch(
      `https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${Contract[contractName]}`
    );
    const data = await response.json();
    // console.log("proxy Address, contract Address", Contract[contractName], data?.implementations[0].address);

    const contractAdress = data?.implementations?.[0]?.address;

    if (contractAdress) {
      const res = await fetch(
        `https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${contractAdress}`
      );
      const data1 = await res.json();

      return {
        abi: data1.abi,
        contractAddress: Contract[contractName],
      };
    }
  } catch (error) {
    console.error("Error fetching contract ABI:", error);
    throw error;
  }
};

const INFURA_URL = "https://blockchain.ramestta.com";
const web3 = new Web3(INFURA_URL);

export const useStore = create((set, get) => ({
  getBalance: async (walletAdd) => {
    try {
      if (!walletAdd) {
        throw new Error("Wallet address is required.");
      }

      const balanceWei = await web3.eth.getBalance(walletAdd);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      return parseFloat(balanceEth).toFixed(4); // Optional: return balance with 4 decimal places
    } catch (error) {
      console.error("Failed to fetch balance:", error.message);
      return null; // Or throw error depending on use case
    }
  },

  isUserExist: async (userAddress) => {
    try {
      if (!userAddress) {
        throw new Error("Invalid userAddress");
      }
      // const { abi, contractAddress } = await fetchContractAbi("UserMang");

      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");

      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      const isExist = await contract.methods
        .isUserRegistered(userAddress)
        .call();

      return isExist;
    } catch (error) {
      console.log(error);
    }
  },

  // RegisterUser: async (userAddress, sponserAddress) => {
  //     try {
  //         if (!sponserAddress) {
  //             throw new Error("Invalid SponserAddress");
  //         }

  //         const balanceWei = await web3.eth.getBalance(userAddress);
  //         const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

  //         const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT")

  //         const contract = new web3.eth.Contract(ROPDY_ROOT.abi, ROPDY_ROOT.contractAddress);

  //         const packagePrice = await contract.methods.getPackagePriceInRAMA(0).call();

  //         const packagePriceEth = web3.utils.fromWei(packagePrice, 'ether');

  //         if (parseFloat(packagePriceEth) > parseFloat(balanceEth)) {
  //             alert("Insufficient Fund in yout Account");
  //             throw new Error("Insufficient funds in your wallet.");

  //             return;
  //         }

  //         const trxData = contract.methods.register(sponserAddress).encodeABI();
  //         const gasPrice = await web3.eth.getGasPrice();

  //         let gasLimit;
  //         try {
  //             gasLimit = await web3.eth.estimateGas({
  //                 from: userAddress,
  //                 to: ROPDY_ROOT.contractAddress,
  //                 value: packagePrice.toString(),
  //                 data: trxData,
  //             });
  //         } catch (error) {
  //             console.error("❌ Gas estimation failed:", error);
  //             alert("Gas estimation failed. Please check contract and inputs.");
  //             return;
  //         }

  //         console.log("Estimated Gas:", gasLimit);
  //         const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
  //         console.log("Estimated Gas Cost in ETH:", gasCost);

  //         const tx = {
  //             from: userAddress,
  //             to: ROPDY_ROOT.contractAddress,
  //             data: trxData,
  //             gas: gasLimit,
  //             gasPrice: gasPrice,
  //             value: packagePrice,

  //         };

  //         return tx

  //     } catch (error) {
  //         console.error("RegisterUser error:", error);
  //         alert(`Registration error: ${error.message}`);

  //     }

  // },

  RegisterUser: async (userAddress, spAddress) => {
    try {
      if (!spAddress) {
        throw new Error("Invalid Sponsor Address");
      }

      const balanceWei = await web3.eth.getBalance(userAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      let sponserAddress = spAddress;
      if (!spAddress.startsWith("0x")) {
        const address = await contract.methods.getUserById(spAddress).call(); // ✅ added .call()
        sponserAddress = address;
      }

      const packagePrice = await contract.methods
        .getPackagePriceInRAMA(0)
        .call(); // Starter package
      const packagePriceEth = web3.utils.fromWei(packagePrice, "ether");

      if (parseFloat(packagePriceEth) > parseFloat(balanceEth)) {
        alert("Insufficient funds in your account");
        throw new Error("Insufficient funds in your wallet.");
      }

      const trxData = contract.methods.register(sponserAddress).encodeABI();
      const gasPrice = await web3.eth.getGasPrice();

      // Use BigInt and add 1% buffer
      const priceWithBuffer =
        BigInt(packagePrice) + BigInt(packagePrice) / BigInt(100);

      let gasLimit;
      try {
        gasLimit = await web3.eth.estimateGas({
          from: userAddress,
          to: ROPDY_ROOT.contractAddress,
          value: priceWithBuffer,
          data: trxData,
        });
      } catch (error) {
        console.error("❌ Gas estimation failed:", error);
        alert("Gas estimation failed. Please check contract and inputs.");
        return;
      }

      console.log("Estimated Gas:", gasLimit);
      const gasCost = web3.utils.fromWei(
        (BigInt(gasLimit) * BigInt(gasPrice)).toString(),
        "ether"
      );
      console.log("Estimated Gas Cost in ETH:", gasCost);

      const tx = {
        from: userAddress,
        to: ROPDY_ROOT.contractAddress,
        data: trxData,
        gas: gasLimit,
        gasPrice: gasPrice,
        value: packagePrice, // original price for sending tx
      };

      return tx;
    } catch (error) {
      console.error("RegisterUser error:", error);
      alert(`Registration error: ${error.message}`);
      throw error;
    }
  },

  checkUserById: async (userId) => {
    try {
      // const walletAdd = "0x25fB86046a1ccfa490a21Dbb9BA08E2803a45B8b";
      if (!userId) {
        throw new Error("Invalid userId");
      }
      // const { abi, contractAddress } = await fetchContractAbi("UserMang");

      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");

      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      const userAddress = await contract.methods.getUserById(userId).call();

      return userAddress;
    } catch (error) {
      console.error("Error:", error);
      alert(`Error checking user: ${error.message}`);
      throw error;
    }
  },

  getActiveCircles: async (userAddress, SelectedPkg) => {
    try {
      const ROPDY_VIEW = await fetchContractAbi("ROPDY_VIEW");

      const contract = new web3.eth.Contract(
        ROPDY_VIEW.abi,
        ROPDY_VIEW.contractAddress
      );

      const selectedPkg = await contract.methods
        .getPaymentSettlement(userAddress, SelectedPkg)
        .call();

      return selectedPkg;
    } catch (error) {
      console.error("Error fetching active circles:", error);
      alert(`Error fetching active circles: ${error.message}`);
      throw error;
    }
  },

  ViewDetailedPartner: async (userAddress, SelectedPkg, selectedCircle) => {
    try {
      console.log(userAddress, SelectedPkg, selectedCircle);
      const ROPDY_VIEW = await fetchContractAbi("ROPDY_VIEW");

      const contract = new web3.eth.Contract(
        ROPDY_VIEW.abi,
        ROPDY_VIEW.contractAddress
      );

      const tableData = await contract.methods
        .getCircle(userAddress, SelectedPkg, selectedCircle)
        .call();

      const FilterdData = [];

      const len = tableData.partners.length;

      for (let i = 0; i < len; i++) {
        FilterdData.push({
          fromAddress: tableData.partners[i],
          userId: tableData.partnerUserIds[i].toString(),
          type: tableData.sources[i].toString(),
        });
      }

      console.log("Filtered Data:", FilterdData);

      return FilterdData;
    } catch (error) {
      console.error("Error fetching ViewDetailedPartner:", error);
      alert(`Error fetching ViewDetailedPartner: ${error.message}`);
      throw error;
    }
  },

  // purchaseInfo: async (userAddress) => {
  //     try {

  //         const balanceWei = await web3.eth.getBalance(userAddress);
  //         const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

  //         const currentBalance = parseFloat(balanceEth).toFixed(4);
  //         // Balance fetched successfully

  //         const ROPDY_VIEW = await fetchContractAbi("ROPDY_ROOT")

  //         const contract = new web3.eth.Contract(ROPDY_VIEW.abi, ROPDY_VIEW.contractAddress);

  //         const Package = ["Starter Package", "Silver Package", "Gold Package", "Diamond Package", "Platinum Package"]

  //         const AllData = [];

  //         for (let i = 0; i < 5; i++) {
  //             const priceInRAMA = await contract.methods.getPackagePriceInRAMA(i).call();
  //             const priceInUSD = await contract.methods.getPackagePriceInUSD(i).call();

  //             const formatRama = web3.utils.fromWei(priceInRAMA, 'ether'); // USD typically has 6 decimals
  //             const formatUSD = (Number(priceInUSD) / 1e6).toFixed(2); // Format to 2 decimal places

  //             const res = {
  //                 packageName: Package[i],
  //                 priceInRAMA: formatRama,
  //                 priceInUSD: formatUSD
  //             };

  //             AllData.push(res);

  //         }

  //         return {
  //             UserBalance: currentBalance,
  //             packages: AllData
  //         };

  //     } catch (error) {
  //         console.error("Error fetching purchaseInfo:", error);
  //         alert(`Error fetching purchaseInfo: ${error.message}`);
  //         throw error;

  //     }
  // },
  purchaseInfo: async (userAddress) => {
    try {
      // 1. Get wallet balance
      const balanceWei = await web3.eth.getBalance(userAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      const currentBalance = parseFloat(balanceEth).toFixed(4);

      // 2. Prepare package labels
      const Package = [
        "Starter Package",
        "Silver Package",
        "Gold Package",
        "Platinum Package",
        "Diamond Package",
      ];

      // 3. Load contract
      const [ROPDY_ROOT, ROPDY_VIEW] = await Promise.all([
        fetchContractAbi("ROPDY_ROOT"),
        fetchContractAbi("ROPDY_VIEW"),
      ]);
      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );
      const contract1 = new web3.eth.Contract(
        ROPDY_VIEW.abi,
        ROPDY_VIEW.contractAddress
      );

      // 4. Create all promises for RAMA & USD
      const ramaCalls = Array.from({ length: 5 }, (_, i) =>
        contract.methods.getPackagePriceInRAMA(i).call()
      );
      const usdCalls = Array.from({ length: 5 }, (_, i) =>
        contract.methods.getPackagePriceInUSD(i).call()
      );

      // 5. Fetch all prices in parallel
      const [ramaResults, usdResults] = await Promise.all([
        Promise.all(ramaCalls),
        Promise.all(usdCalls),
      ]);

      // 6. Format all package data
      const packages = Package.map((name, i) => ({
        packageName: name,
        priceInRAMA: web3.utils.fromWei(ramaResults[i], "ether"),
        priceInUSD: (Number(usdResults[i]) / 1e6).toFixed(2),
      }));

      const packageDetails = await contract1.methods
        ._getActivePackages(userAddress)
        .call();

      // console.log(packageDetails)
      const Package_Name = ["Starter", "Sliver", "Gold", "Diamond", "Platinum"];
      let activePackage = 0;
      for (let i = 0; i < packageDetails.length; i++) {
        if (packageDetails[i]) {
          activePackage = i;
        }
      }

      return {
        userPackage: Package_Name[activePackage],
        UserBalance: currentBalance,
        packages,
      };
    } catch (error) {
      console.error("Error fetching purchaseInfo:", error);
      alert(`Error fetching purchaseInfo: ${error.message}`);
      throw error;
    }
  },

  CircleCount: async (userAddress, selectedPkg) => {
    try {
      const ROPDY_VIEW = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(
        ROPDY_VIEW.abi,
        ROPDY_VIEW.contractAddress
      );
      const circleCount = await contract.methods
        .getUserCircleCount(userAddress, selectedPkg)
        .call();

      const circleArr = [];
      for (let i = 0; i < circleCount; i++) {
        circleArr.push(i);
      }

      return circleArr;
    } catch (error) {
      console.error("Error in settlement CircleCount:", error);
      alert(`Error in settlement CircleCount: ${error.message}`);
      throw error;
    }
  },

  getUsrSettlement: async (userAddress, selectedPkg, circleIndex) => {
    try {
      const ROPDY_VIEW = await fetchContractAbi("ROPDY_VIEW");
      const contract = new web3.eth.Contract(
        ROPDY_VIEW.abi,
        ROPDY_VIEW.contractAddress
      );

      const record = await contract.methods
        .getPaymentOutSettlement(userAddress, selectedPkg, circleIndex)
        .call();
      console.log("Settlement Data:", record);

      const paymentType = {
        0: "CP1",
        1: "CP2",
        2: "MOD1",
        3: "MOD2",
        4: "MOD3",
        5: "MOD4",
      };

      const formatSettlement = (data) => ({
        from: data.from,
        to: data.to,
        ramaAmount: parseFloat(
          web3.utils.fromWei(data.ramaAmount.toString(), "ether")
        ).toFixed(5),
        usdAmount: parseFloat(Number(data.usdAmount) / 1e6).toFixed(5),
        feeRama: parseFloat(
          web3.utils.fromWei(data.feeRama.toString(), "ether")
        ).toFixed(5),
        feeUSD: parseFloat(Number(data.feeUSD) / 1e6).toFixed(5),
        netRama: parseFloat(
          web3.utils.fromWei(data.netRama.toString(), "ether")
        ).toFixed(5),
        netUSD: parseFloat(Number(data.netUSD) / 1e6).toFixed(5),
        paymentType: paymentType[data.paymentType?.toString() || "0"],
        timestamp: Number(data.timestamp),
        circleIndex: Number(data.circleIndex),
      });

      return {
        cp1: formatSettlement(record.cp1),
        cp2: formatSettlement(record.cp2),
      };
    } catch (error) {
      console.error("Error in settlement CircleCount:", error);
      alert(`Error in settlement CircleCount: ${error.message}`);
      throw error;
    }
  },

  // PurchasePackage: async (userAddress, selectedPackageIndex) => {
  //     try {

  //         const balanceWei = await web3.eth.getBalance(userAddress);
  //         const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

  //         const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");

  //         const contract = new web3.eth.Contract(ROPDY_ROOT.abi, ROPDY_ROOT.contractAddress);

  //         const packagePrice = await contract.methods.getPackagePriceInRAMA(selectedPackageIndex).call();

  //         const packagePriceEth = web3.utils.fromWei(packagePrice, 'ether');

  //         if (packagePriceEth > balanceEth) {
  //             alert("Insufficient Fund in yout Account");
  //             return;
  //         }

  //         const trxData = contract.methods.buyPackage(selectedPackageIndex).encodeABI();
  //         const gasPrice = await web3.eth.getGasPrice();

  //         let gasLimit;
  //         try {
  //             gasLimit = await web3.eth.estimateGas({
  //                 from: userAddress,
  //                 to: ROPDY_ROOT.contractAddress,
  //                 value: BigInt(packagePrice * 1.01),
  //                 data: trxData,
  //             });
  //         } catch (error) {
  //             console.error("❌ Gas estimation failed:", error);
  //             alert("Gas estimation failed. Please check contract and inputs.");
  //             return;
  //         }

  //         console.log("Estimated Gas:", gasLimit);
  //         const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
  //         console.log("Estimated Gas Cost in ETH:", gasCost);

  //         const tx = {
  //             from: userAddress,
  //             to: ROPDY_ROOT.contractAddress,
  //             data: trxData,
  //             gas: gasLimit,
  //             gasPrice: gasPrice,
  //             value: packagePrice,

  //         };

  //         return tx

  //     } catch (error) {
  //         console.error("Error in :", error);
  //         alert(`Error in : ${error.message}`);
  //         throw error;
  //     }
  // },
  PurchasePackage: async (userAddress, selectedPackageIndex) => {
    try {
      const balanceWei = await web3.eth.getBalance(userAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      const { abi, contractAddress } = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(abi, contractAddress);

      const packagePrice = await contract.methods
        .getPackagePriceInRAMA(selectedPackageIndex)
        .call();
      const packagePriceEth = web3.utils.fromWei(packagePrice, "ether");

      if (parseFloat(packagePriceEth) > parseFloat(balanceEth)) {
        alert("Insufficient fund in your account");
        return;
      }

      const trxData = contract.methods
        .buyPackage(selectedPackageIndex)
        .encodeABI();
      const gasPrice = await web3.eth.getGasPrice();

      let gasLimit;
      try {
        // Apply 1% buffer using integer math
        const valueWithBuffer =
          BigInt(packagePrice) + BigInt(packagePrice) / BigInt(100);

        gasLimit = await web3.eth.estimateGas({
          from: userAddress,
          to: contractAddress,
          value: valueWithBuffer,
          data: trxData,
        });
      } catch (error) {
        console.error("❌ Gas estimation failed:", error);
        alert("Gas estimation failed. Please check contract and inputs.");
        return;
      }

      console.log("Estimated Gas:", gasLimit);
      const gasCost = web3.utils.fromWei(
        (BigInt(gasLimit) * BigInt(gasPrice)).toString(),
        "ether"
      );
      console.log("Estimated Gas Cost in ETH:", gasCost);

      const tx = {
        from: userAddress,
        to: contractAddress,
        data: trxData,
        gas: gasLimit,
        gasPrice: gasPrice,
        value: packagePrice, // original value, not the buffered one
      };

      return tx;
    } catch (error) {
      console.error("Error in PurchasePackage:", error);
      alert(`Error: ${error.message}`);
      throw error;
    }
  },

  Cp1Earning: async (userAddress) => {
    try {
      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");

      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      let Cp1DirectData = [];
      for (let i = 0; i < 5; i++) {
        const cp1Earn = await contract.methods
          .cp1Earnings(userAddress, i)
          .call();

        const cp1EarnEth = web3.utils.fromWei(cp1Earn, "ether");

        Cp1DirectData.push(cp1EarnEth);
      }

      return Cp1DirectData;
    } catch (error) {
      console.error("Error ", error);
      alert(`Error fetching: ${error.message}`);
      throw error;
    }
  },

  cp2Earning: async (userAddress) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(abi, contractAddress);

      const mod1Earning = [];
      const mod2Earning = [];
      const mod4Earning = [];
      const isMod4PoolData = [];

      // Prepare all contract calls
      const calls = Array.from({ length: 5 }, (_, i) => ({
        mod1: contract.methods.mod1Earnings(userAddress, i).call(),
        mod2: contract.methods.mod2Earnings(userAddress, i).call(),
        mod4: contract.methods.mod4Earnings(userAddress, i).call(),
        isMod4: contract.methods.userIsInMod4Pool(userAddress, i).call(),
      }));

      // Flatten all promises
      const allPromises = calls.flatMap((c) => [
        c.mod1,
        c.mod2,
        c.mod4,
        c.isMod4,
      ]);

      const results = await Promise.all(allPromises);

      // Group results
      for (let i = 0; i < 5; i++) {
        const mod1 = results[i * 4];
        const mod2 = results[i * 4 + 1];
        const mod4 = results[i * 4 + 2];
        const isMod4 = results[i * 4 + 3];

        mod1Earning.push(web3.utils.fromWei(mod1, "ether"));
        mod2Earning.push(web3.utils.fromWei(mod2, "ether"));
        mod4Earning.push(web3.utils.fromWei(mod4, "ether"));
        isMod4PoolData.push(isMod4);
      }

      return {
        isInMod4Pool: isMod4PoolData,
        data: {
          MOD1: mod1Earning,
          MOD2: mod2Earning,
          MOD4: mod4Earning,
        },
      };
    } catch (error) {
      console.error("Error in cp2Earning:", error);
      alert(`Error fetching CP2 earnings: ${error.message}`);
      throw error;
    }
  },

  MyRefferal: async (userAddress) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_ROOT"); // or use "ROPDY_VIEW" if intended
      const contract = new web3.eth.Contract(abi, contractAddress);

      const DirectRefferal = await contract.methods
        .getDirectReferrals(userAddress)
        .call();

      // Fetch all user data in parallel
      const info = await Promise.all(
        DirectRefferal.map((ref) => contract.methods.users(ref).call())
      );

      return info;
    } catch (error) {
      console.error("Error fetching MyRefferal:", error);
      alert(`Error fetching MyRefferal: ${error.message}`);
      throw error;
    }
  },

  getMissedPayments: async (userAddress) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_ROOT"); // or use "ROPDY_VIEW" if intended
      const contract = new web3.eth.Contract(abi, contractAddress);

      const MissedPayments = await contract.methods
        .getMissedPayments(userAddress)
        .call();

      return MissedPayments;
    } catch (error) {
      console.error("Error fetching MissedPayments:", error);
      alert(`Error fetching MissedPayments: ${error.message}`);
      throw error;
    }
  },

  getDashboardInfo: async (userAddress) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_VIEW"); // or use "ROPDY_VIEW" if intended
      const contract = new web3.eth.Contract(abi, contractAddress);

      const info = await contract.methods
        .getDashboardDataNew(userAddress)
        .call();

      return info;
    } catch (error) {
      console.error("Error fetching getDashboardInfo:", error);
      alert(`Error fetching getDashboardInfo: ${error.message}`);
      throw error;
    }
  },

  getOverView: async (address, level) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_VIEW");
      const contract = new web3.eth.Contract(abi, contractAddress);

      // Step 1: First fetch to get totalPages
      const initialRes = await contract.methods
        .getDownlinesWithBasicInfoAndPackagesAtLevel(address, level + 1)
        .call();

      console.log("initialRes", initialRes);

      if (initialRes.result.length == 0) {
        return {
          downlines: [],
          totalPages: 0,
        };
      }

      if (level == 0) {
        const parseLevel1 = initialRes.result[0].downlines.map((item, idx) => ({
          index: idx + 1,
          wallet: item.wallet,
          userId: Number(item.userId),
          level: Number(item.level),
          registrationTime: Number(item.registrationTime),
          earnings: 0,
        }));

        return {
          downlines: parseLevel1,
          totalPages: 0,
        };
      }

      // For only level one
      // Step 3: Format the full downline list

      const parsedDownlines = initialRes.result.flatMap((item, i) =>
        item.downlines.map((dl, j) => ({
          index: `${i + 1}.${j + 1}`,
          wallet: dl.wallet,
          userId: Number(dl.userId),
          level: Number(dl.level),
          registrationTime: Number(dl.registrationTime),
          earnings: 0,
        }))
      );
      return {
        downlines: parsedDownlines,
        totalPages: 0,
      };
    } catch (error) {
      console.error("Error fetching getOverView:", error);
      alert(`Error fetching getOverView: ${error.message}`);
      return { downlines: [], totalPages: 0 };
    }
  },

  getOverViewBasicInfo: async (address) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(abi, contractAddress);

      const totalDownline = await contract.methods
        ._countAllDownlines(address)
        .call();
      const directReferral = await contract.methods
        .getDirectReferrals(address)
        .call();

      return {
        totalDownline: totalDownline.toString(),
        directReferral: Array.isArray(directReferral)
          ? directReferral.length.toString()
          : "0",
      };
    } catch (error) {
      console.error("Error fetching getOverViewinfo:", error);
      alert(`Error fetching getOverViewinfo: ${error.message}`);
    }
  },

  getPackageWiseData: async (address, pkg) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_VIEW");
      const contract = new web3.eth.Contract(abi, contractAddress);

      const pkgData = await contract.methods
        .getDashboardDataNew(address, pkg)
        .call();

      console.log("pkgData", pkgData);

      const data = {
        currentPackage: pkgData.currentPackage.toString(),
        totalCirclesStarted: pkgData.totalCirclesStarted.toString(),
        circlesCompleted: pkgData.circlesCompleted.toString(),
        mod4PoolStatus: pkgData.mod4PoolStatus.toString(),
        cp1Earnings: web3.utils.fromWei(
          pkgData.cp1Earnings.toString(),
          "ether"
        ),
        cp2Earnings: web3.utils.fromWei(
          pkgData.cp2Earnings.toString(),
          "ether"
        ),
        modEarnings: pkgData.modEarnings.map((val) =>
          web3.utils.fromWei(val.toString(), "ether")
        ),
        totalRamaEarned: web3.utils.fromWei(
          pkgData.totalRamaEarned.toString(),
          "ether"
        ),
        totalUsdEquivalent: web3.utils.fromWei(
          pkgData.totalUsdEquivalent.toString(),
          "ether"
        ),
        directReferrals: pkgData.directReferrals.toString(),
        missedPayments: pkgData.missedPayments.toString(),
        heldFundsRama: web3.utils.fromWei(
          pkgData.heldFundsRama.toString(),
          "ether"
        ),
      };

      return data;
    } catch (error) {
      console.error("Error fetching getPackageWiseData:", error);
      alert(`Error fetching getPackageWiseData: ${error.message}`);
    }
  },

  getPurchaseHistory: async (address) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_VIEW");
      const contract = new web3.eth.Contract(abi, contractAddress);

      const packagesTag = [
        { name: "Starter", value: 0 },
        { name: "Silver", value: 1 },
        { name: "Gold", value: 2 },
        { name: "Platinum", value: 3 },
        { name: "Diamond", value: 4 },
      ];

      const pkgData = [];

      for (let i = 0; i < 5; i++) {
        const buyedPkg = await contract.methods
          .getAllCirclePurchaseHistory(address, i)
          .call();
        pkgData.push({
          pkgName: packagesTag[i].name,
          recievedPkg: buyedPkg,
        });
      }

      console.log(pkgData);

      return pkgData;
    } catch (error) {
      console.error("Error fetching getPackageWiseData:", error);
      alert(`Error fetching getPackageWiseData: ${error.message}`);
    }
  },

  getProfileDetails: async (userAddress) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_VIEW");

      const contract = new web3.eth.Contract(abi, contractAddress);

      // Fetch both calls in parallel
      const [info, packageDetails] = await Promise.all([
        contract.methods.getDashboardDataNew(userAddress).call(),
        contract.methods._getActivePackages(userAddress).call(),
      ]);

      console.log("packageDetails", packageDetails);

      // Efficiently find the highest active package
      const activePackageIndex = packageDetails.lastIndexOf(true);
      const Package_Name = ["Starter", "Sliver", "Gold", "Diamond", "Platinum"];
      const activePackage = Package_Name[activePackageIndex] || "Unknown";

      // Compose data
      return {
        userId: info.userId?.toString(),
        sponserAdd: info.sponsorAddress,
        memberTier: activePackage,
        TotalEarning: Number(
          web3.utils.fromWei(info.totalRamaEarned, "ether")
        ).toFixed(5),
        RefferalCount: info.directReferrals?.toString(),
      };
    } catch (error) {
      console.error("Error fetching getDashboardInfo:", error);
      // You may log to Sentry or a toast here
      throw new Error(`Unable to load profile data.`);
    }
  },

  CircleInfo: async (userAddress) => {
    try {
      const { abi, contractAddress } = await fetchContractAbi("ROPDY_VIEW");
      const contract = new web3.eth.Contract(abi, contractAddress);

      // Fetch history for all 5 packages
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(
          contract.methods.getAllCirclePurchaseHistory(userAddress, i).call()
        );
      }

      const results = await Promise.all(promises); // results is an array of arrays
      console.log("✅ Raw Circle Results:", results);

      let pendingCircle = 0;
      let completeCircle = 0;

      results.forEach((packageHistory) => {
        packageHistory.forEach((circle) => {
          if (circle?.isCompleted) {
            completeCircle++;
          } else {
            pendingCircle++;
          }
        });
      });

      const data = {
        pendingCircle,
        completeCircle,
        totalCircle: pendingCircle + completeCircle,
      };

      console.log("✅ Processed Circle Data:", data);
      return data;
    } catch (error) {
      console.error("❌ Error in CircleInfo:", error);
      throw new Error("Failed to fetch circle info");
    }
  },

  getReqRamaForReg: async (userAddress) => {
    try {
      const balanceWei = await web3.eth.getBalance(userAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      const packagePrice = await contract.methods
        .getPackagePriceInRAMA(0)
        .call(); // Starter package
      const packagePriceEth = web3.utils.fromWei(packagePrice, "ether");

      const value = parseFloat(packagePriceEth).toFixed(5).toString();

      console.log(value);

      const data = {
        packagePriceEth: value,
        currentBalanceRama: parseFloat(balanceEth).toFixed(5),
      };

      console.log("balance and requrired rama", data);

      return data;
    } catch (error) {
      console.error("❌ Error in getReqRamaForReg:", error);
      throw new Error("Failed to getReqRamaForReg circle info");
    }
  },

  getUserAddress: async (userId) => {
    try {
      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      const address = await contract.methods.userIdToAddress(userId).call(); // ✅ added .call()

      console.log("address", address);

      return address.toString();
    } catch (error) {
      console.error(
        `❌ Error in getUserAddress(${userId}):`,
        error?.message || error
      );
      return null;
    }
  },

  CondUserIdAddres: async (data) => {
    try {
      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      if (data.startsWith("0x")) {
        const userID = await contract.methods.addressToUserId(data).call(); // ✅ added .call()

        console.log("userID", userID);

        return {
          tagName: "user Id",
          data: userID.toString(),
        };
      } else {
        const address = await contract.methods.getUserById(data).call(); // ✅ added .call()

        console.log("address", address);

        return {
          tagName: "Address",
          data:
            address.toString().slice(0, 10) +
            ".........." +
            address.toString().slice(-10),
          sponserAdd: address.toString(),
        };
      }
    } catch (error) {
      console.error(
        `❌ Error in CondUserIdAddres(${userId}):`,
        error?.message || error
      );
      return null;
    }
  },

  globalStats: async (userAddress) => {
    try {
      const ROPDY_PRICECONV = await fetchContractAbi("ROPDY_PRICECONV");
      const contract = new web3.eth.Contract(
        ROPDY_PRICECONV.abi,
        ROPDY_PRICECONV.contractAddress
      );

      const globalRama = await contract.methods.getReadableRamaPrice().call();

      const balanceWei = await web3.eth.getBalance(userAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      const stats = {
        walletBalance: parseFloat(balanceEth).toFixed(4),
        globalRama: `${globalRama.dollars}.${String(
          globalRama.microCents
        ).padStart(6, "0")}`, // formatted as string
      };

      console.log("Global Stats:", stats);
      return stats;
    } catch (error) {
      console.error(
        `❌ Error in globalStats(${userAddress}):`,
        error?.message || error
      );
      return null;
    }
  },

  GetSponserId: async (userAddress) => {
    try {
      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");
      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      const getSponseAdd = await contract.methods
        .getSponsor(userAddress)
        .call();

      if (
        getSponseAdd &&
        getSponseAdd !== "0x0000000000000000000000000000000000000000"
      ) {
        const sponserId = await contract.methods.getUserId(getSponseAdd).call();
        console.log(sponserId);
        return sponserId.toString();
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        `❌ Error in GetSponserId(${userAddress}):`,
        error?.message || error
      );
      return null;
    }
  },

  getCirclePosPayment: async (userAddress, pkg, index) => {
    try {
      if (!userAddress || pkg === undefined || index === undefined) {
        Swal.fire("Missing required inputs");
        return [];
      }

      const ROPDY_ROOT = await fetchContractAbi("ROPDY_ROOT");

      const contract = new web3.eth.Contract(
        ROPDY_ROOT.abi,
        ROPDY_ROOT.contractAddress
      );

      const response = await contract.methods
        .getCircleDetails(userAddress, pkg, index)
        .call();

      // Format individual payment object
      const formatPayment = (payment, sourceType) => ({
        paymentType: sourceType, // "cp1Received" or "cp2Received"
        from: payment.from,
        to: payment.to,
        ramaAmount: payment.ramaAmount,
        usdAmount: payment.usdAmount,
        feeRama: payment.feeRama,
        feeUSD: payment.feeUSD,
        netRama: payment.netRama,
        netUSD: payment.netUSD,
        paymentTypeRaw: Number(payment.paymentType), // in case you need the actual number too
        timestamp: Number(payment.timestamp),
        circleIndex: Number(payment.circleIndex),
      });

      // Combine and tag cp1Received and cp2Received
      const formattedCp1 = response.cp1Received.map((p) =>
        formatPayment(p, "cp1Received")
      );
      const formattedCp2 = response.cp2Received.map((p) =>
        formatPayment(p, "cp2Received")
      );

      // Return merged array
      return [...formattedCp1, ...formattedCp2];
    } catch (error) {
      console.error("getCirclePosPayment error:", error);
      return [];
    }
  },
}));
