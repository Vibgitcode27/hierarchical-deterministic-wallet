"use client";

import { Flex, Avatar } from 'antd';
import React, { useState , useRef ,useEffect } from 'react';
import { useAppSelector , useAppDispatch } from '@/lib/hooks';
import RenderGenerateSeedPhrase from '@/app/components/walletComponents/generateSeed';
import RenderImportSeedPhrase from '@/app/components/walletComponents/importSeedPhrase';
import SendModal from '@/app/components/walletComponents/sendWalletModal';
import ReceiveModal from '@/app/components/walletComponents/receiveWalletModal';
import SwapModal from '@/app/components/walletComponents/swapWalletModal';
import ethLogo from "../../assets/etherium_dropdown.jpg";
import solLogo from "../../assets/solana_dropdown.png";
import xtzLogo from "../../assets/tezos_logo.png";
import  styles from "../../styles/dropdown.module.css"
import { generateEtheriumAccount , generateSolanaAccount } from '@/app/components/helpers/helperFunctions';
import {
  CopyOutlined, 
  SwapOutlined,
  SendOutlined,
  QrcodeOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import "../../styles/button.css";
import { mnemonicToSeedSync } from 'bip39';

interface BlockchainOption {
  name: string;
  logo: string;
}

export default function WalletPage() {
  const [activeMenu, setActiveMenu] = useState<'home' | 'import' | 'wallet' | 'generate' | 'import'>('home');
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedNetwork , setSelectedNetwork] = useState<string>("Mainnet");
  const [isNetWorkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [isSeedBackedUp, setSeedBackedUp] = useState(false);

  const blockchains: BlockchainOption[] = [
    { name: "Ethereum", logo : ethLogo.src },
    { name: "Solana", logo: solLogo.src },
    { name: "Tezos", logo: xtzLogo.src },
  ];

  const ethereumNetwork = [
    { name: "Mainnet" },
    { name: "Sepolia" },
  ]

  const solanaNetwork = [
    { name: "Mainnet" },
    { name: "Devnet" },
  ]

  const handleEthereumNetworkSelect = (network: string) => {
    setSelectedNetwork(network);
    setNetworkDropdownOpen(false);
  }

  const toggleNetworkDropdown = () => {
    setNetworkDropdownOpen(!isNetWorkDropdownOpen);
  }

  const handleSelect = (blockchain: BlockchainOption) => {
    setSelectedBlockchain(blockchain);
    setDropdownOpen(false);
    setSelectedNetwork("Mainnet");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


















  // Adding Code To generate accounts and store them in local storage

  interface StoredWalletData {
    seedPhrase: string;
    accountCounters: {
      Ethereum: number;
      Solana: number;
    };
    accounts: Array<{
      id: number;
      name: string;
      address: string;
      balance: string;
      blockchain: string;
      network: string;
      privateKey: string;
    }>;
  }

  useEffect(() => {
    if (!seedPhrase) {
      setActiveMenu('home');
    } else {
      setActiveMenu('wallet');
    }
  } , []);

  const WALLET_STORAGE_KEY = 'walletData';

  const [seedPhrase, setSeedPhrase] = useState<string>(() => {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    return stored ? JSON.parse(stored).seedPhrase : '';
  });

  const [accountCounters, setAccountCounters] = useState(() => {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    return stored ? JSON.parse(stored).accountCounters : { Ethereum: 0, Solana: 0 };
  });

  const [accounts, setAccounts] = useState(() => {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    return stored ? JSON.parse(stored).accounts : [];
  });

    useEffect(() => {
      if (seedPhrase) {
        const walletData: StoredWalletData = {
          seedPhrase,
          accountCounters,
          accounts
        };
        console.log("Wallet Data Stored");
        localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletData));
      }
    }, [seedPhrase, accountCounters, accounts]);

    const seedMnemonic = useAppSelector(state => state.seed.seedPhrase);

    useEffect(() => {
      if (accountCounters.Ethereum === 0 && accountCounters.Solana === 0 && seedPhrase) {
        generateInitialAccounts(seedMnemonic);
      }
    }, [seedMnemonic, accountCounters]);

    const generateInitialAccounts = (mnemonic: string) => {
      const stored = localStorage.getItem(WALLET_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.seedPhrase === mnemonic) {
          setAccountCounters(data.accountCounters);
          setAccounts(data.accounts);
          return;
        }
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const ethAccount = generateEtheriumAccount(seed, 0);
    const solAccount = generateSolanaAccount(seed, 0);
    
    const initialCounters = {
      Ethereum: 1,
      Solana: 1
    };
    
    const initialAccounts = [
      {
        id: 1,
        name: 'Ethereum Wallet 1',
        address: ethAccount.publicKey,
        privateKey: ethAccount.privateKey,
        balance: '0 ETH',
        blockchain: 'Ethereum',
        network: 'mainnet'
      },
      {
        id: 2,
        name: 'Solana Wallet 1',
        address: solAccount.publicKey,
        privateKey: solAccount.privateKey,
        balance: '0 SOL',
        blockchain: 'Solana',
        network: 'mainnet'
      }
    ];

    setAccountCounters(initialCounters);
    setAccounts(initialAccounts);
    setSeedPhrase(mnemonic);
  };

  // Function to add new Ethereum account
  const addNewEthereumAccount = () => {
    if (!seedPhrase){ 
      console.log(seedPhrase);
      console.log("Seed Phrase Not Found");
      return; 
    } ;
    
    const seed = mnemonicToSeedSync(seedPhrase);
    const newIndex = accountCounters.Ethereum;
    const ethAccount = generateEtheriumAccount(seed, newIndex);
    
    const newAccount = {
      id: accounts.length + 1,
      name: `Ethereum Wallet ${newIndex + 1}`,
      address: ethAccount.publicKey,
      privateKey: ethAccount.privateKey,
      balance: '0 ETH',
      blockchain: 'Ethereum',
      network: 'mainnet'
    };

    setAccounts((prev: typeof accounts) => [...prev, newAccount]);
    setAccountCounters((prev: typeof accountCounters) => ({
      ...prev,
      Ethereum: prev.Ethereum + 1
    }));
  };

  // Function to add new Solana account
  const addNewSolanaAccount = () => {
    if (!seedPhrase) return;
    
    const seed = mnemonicToSeedSync(seedPhrase);
    const newIndex = accountCounters.Solana;
    const solAccount = generateSolanaAccount(seed, newIndex);
    
    const newAccount = {
      id: accounts.length + 1,
      name: `Solana Wallet ${newIndex + 1}`,
      address: solAccount.publicKey,
      privateKey: solAccount.privateKey,
      balance: '0 SOL',
      blockchain: 'Solana',
      network: 'mainnet'
    };

    setAccounts((prev: typeof accounts) => [...prev, newAccount]);
    setAccountCounters((prev: typeof accountCounters) => ({
      ...prev,
      Solana: prev.Solana + 1
    }));
  };

  // Then modify your "Add More" button click handler to use these functions
  const handleAddAccount = () => {
    if (selectedBlockchain.name === 'Ethereum') {
      addNewEthereumAccount();
    } else if (selectedBlockchain.name === 'Solana') {
      addNewSolanaAccount();
    }
  };


  const clearWalletData = () => {
    localStorage.removeItem(WALLET_STORAGE_KEY);
    setSeedPhrase('');
    setAccountCounters({ Ethereum: 0, Solana: 0 });
    setAccounts([]);
    setActiveMenu('home');
  };















  const [selectedBlockchain, setSelectedBlockchain] = useState<BlockchainOption>({ name: "Ethereum", logo : ethLogo.src });
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredAccounts = selectedBlockchain === null 
    ? accounts 
    : accounts.filter((account: { blockchain: string }) => account.blockchain === selectedBlockchain.name);

  const [activeModal, setActiveModal] = useState<'send' | 'receive' | 'swap' | null>(null);

  const renderGenerateWallet = () => (
    <Flex 
      vertical 
      align="center" 
      justify="center" 
      style={{ 
        height: '100%', 
        gap: '20px',
        borderRadius: '15px',
        padding: '40px'
      }}
    >
      <h1 style={{ 
        color: "white", 
        fontSize: "40px", 
        marginBottom: "20px" 
      }}>
        Create Your Wallet
      </h1>
      <Flex gap={50} style={{ marginTop: '30px' }}>
        <button 
          onClick={() => {setActiveMenu('generate')}}
          className="outline red" type="button"
          style={{ 
            color: "#74ccc9",
            textAlign: "center",
            padding: "10px",
            width: "300px",
          }}
        >
          <div className="label">
            <span className="hover-effect"></span>
            <span className="label-text" style={{ padding: "4px", paddingBlock: "10px", paddingLeft: "6px", fontSize: "26px", color: "#f4f4f4"}}>Generate Seed</span>
          </div>
        </button>
        <button 
          onClick={() => {setActiveMenu('import')}}
          className="outline" 
          type="button"
          style={{ 
            color: "#ff4654",
            textAlign: "center",
            padding: "10px",
            width: "300px",
          }}
        >
          <div className="label">
            <span className="hover-effect" style={{ backgroundColor: "#74ccc9"}}></span>
            <span className="label-text" style={{ padding: "4px", paddingBlock: "10px", paddingLeft: "6px", fontSize: "26px", color: "#f4f4f4" }}>Import Seed</span>
          </div>
        </button>
      </Flex>
    </Flex>
  );

  const renderWalletInterface = () => {
    const currentAccount = filteredAccounts[selectedAccount];

    return (
      <Flex style={{ height: '100%' }}>
        <Flex 
          vertical 
          style={{ 
            width: '380px', 
            backgroundColor: 'rgba(28, 73, 255, 0.1)', 
            padding: '20px', 
            height: '100%',
            borderRadius: '15px'
          }}
        >
          <Flex vertical gap={15}>
            <h2 style={{ 
              color: 'white', 
              marginBottom: '10px',
              fontSize: '30px',
              fontFamily : "DINNext",
              fontWeight : "800"
            }}>
              My Wallets
            </h2>
          </Flex>

          {filteredAccounts.map((account: { id: number; name: string; address: string; balance: string; blockchain: string; network: string; privateKey: string }, index: number) => (
            <Flex
              key={account.id}
              align="center"
              justify="space-between"
              style={{
                backgroundColor: selectedAccount === index 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'transparent',
                padding: '15px',
                borderRadius: '10px',
                marginTop: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onClick={() => setSelectedAccount(index)}
            >
              <Flex align="center" gap={15}>
                <Avatar 
                  size={50} 
                  icon={ <img src={selectedBlockchain.logo}/> } 
                  style={{ 
                    backgroundColor: "#1c49ff", 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                  }} 
                />
                <Flex vertical>
                  <span style={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    fontSize: "17px" 
                  }}>
                    {account.name}
                  </span>
                  <small style={{ 
                    color: '#888', 
                    fontSize: "16px" 
                  }}>
                    {`${account.address.slice(0, 8)}...${account.address.slice(-4)}`}
                  </small>
                </Flex>
              </Flex>
            </Flex>
          ))}
          <Flex align='center' justify='center' style={{ width : "100%"}}>
            <Flex
              align="center"
              justify="space-between"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '15px',
                borderRadius: '10px',
                marginTop: '15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width : "70%"
              }}
            >
              <Flex 
                gap={15} 
                align="center" 
                justify='center' 
                style={{ width : "200%" , color : "#f4f4f4"}}
                onClick={handleAddAccount}
              >
                Add More
              </Flex>
            </Flex>
            </Flex>
          </Flex>

        {currentAccount && (
          <Flex 
            vertical 
            style={{ 
              flex: 1, 
              padding: '20px', 
              backgroundColor: 'transparent' 
            }}
          >
            <Flex 
              justify="space-between" 
              align="center" 
              style={{ 
                marginBottom: '30px',
                backgroundColor: 'rgba(28, 73, 255, 0.1)',
                borderRadius: '15px',
                padding: '20px'
              }}
            >
              <Flex vertical>
                <h1 style={{ 
                  color: 'white', 
                  margin: 0, 
                  fontSize: '40px' 
                }}>
                  1221.00 ETH
                </h1>
                <Flex align="center" gap={10}>
                  <span style={{ color: '#888' }}>
                   {`${currentAccount.address.slice(0, 15)}...${currentAccount.address.slice(-8)}`}
                  </span>
                  <CopyOutlined 
                    style={{ 
                      color: 'white', 
                      cursor: 'pointer',
                      fontSize: '18px'
                    }} 
                  />
                </Flex>
              </Flex>

              <Flex gap={15}>
                <button
                  onClick={() => setActiveModal('send')}
                  style={{
                    backgroundColor: "#1c49ff",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Avatar size={40} icon={<SendOutlined style={{ height : "20px" , paddingLeft : "3px"}} />} style={{ backgroundColor : "black" , padding : "15px"}}/> Send
                </button>
                <button
                  onClick={() => setActiveModal('swap')}
                  style={{
                    backgroundColor: "#ff4654",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                   <Avatar size={40} icon={<SwapOutlined style={{ height : "20px"}} />} style={{ backgroundColor : "black" , padding : "15px"}}/> Swap
                </button>
                <button
                  onClick={() => setActiveModal('receive')}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                   <Avatar size={40} icon={<QrcodeOutlined style={{ height : "20px"}} />} style={{ backgroundColor : "black" , padding : "15px"}}/> Receive
                </button>
              </Flex>
            </Flex>

            <Flex 
              vertical 
              style={{ 
                backgroundColor: 'rgba(28, 73, 255, 0.1)', 
                borderRadius: '15px', 
                padding: '20px' 
              }}
            >
            <Flex align='center' justify='space-between'>
              <h2 style={{ 
                color: 'white', 
                marginBottom: '20px',
                fontSize: '30px',
              }}>
                Recent Transactions
              </h2>
              <div style={{ userSelect : "none" , marginBottom : "20px" , marginRight : "5px"}} className={styles.dropdown} ref={dropdownRef}>
              <div className={styles.selected} onClick={toggleNetworkDropdown}>
                {selectedNetwork ? (
                  <Flex gap={0}>
                    <h1 style={{ color : "cyan"}}>{selectedNetwork}</h1>
                    <ArrowDownOutlined style={{ marginLeft : "20px" , color :"white" , fontSize : "20px"}} />
                  </Flex>
                ) : (
                  <span className={styles.placeholder}>Select Blockchain</span>
                )}
              </div>              
              {isNetWorkDropdownOpen && selectedBlockchain.name === "Ethereum" && (
                <div className={styles.options}>
                  {ethereumNetwork.map((network) => (
                    <div
                      key={network.name}
                      className={styles.option}
                      onClick={() => handleEthereumNetworkSelect(network.name)}
                    >
                      <span className={styles.optionName}>{network.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {isNetWorkDropdownOpen && selectedBlockchain.name === "Solana" && (
                <div className={styles.options}>
                  {solanaNetwork.map((network) => (
                    <div
                      key={network.name}
                      className={styles.option}
                      onClick={() => handleEthereumNetworkSelect(network.name)}
                    >
                      <span className={styles.optionName}>{network.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
              
            </Flex>
              <Flex 
                vertical 
                align="center" 
                justify="center" 
                style={{ 
                  height: '200px', 
                  color: '#888' 
                }}
              >
                No recent transactions
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <div style={{ 
      height: "94vh", 
      borderRadius: "30px", 
      padding: "20px",
      backgroundColor: '#121212'
    }}>
      <Flex vertical>
        <Flex align='center' justify='space-between'>
          <h1 style={{ 
            color: "#f4f4f4", 
            fontSize: "20px", 
            marginBottom: "10px" 
          }}>
            W A L L E T
          </h1>

          <div style={{ color : "#f4f4f4", cursor : "pointer"}} onClick={clearWalletData}>
            Sign Out
          </div>
        </Flex>
        
        <Flex align='center' justify='space-between'>
          <h1 style={{ 
            fontSize: "55px", 
            fontFamily: 'DINNext',
            fontWeight: "600", 
            color: "white",
            marginBottom: "30px"
          }}>
            Manage Your Digital Assets
          </h1>
          {activeMenu === 'wallet' && (
            <div style={{ userSelect : "none"}} className={styles.dropdown} ref={dropdownRef}>
              {/* Selected Blockchain Avatar */}
              <div className={styles.selected} onClick={toggleDropdown}>
                {selectedBlockchain ? (
                  <Flex gap={0}>
                    <Avatar
                      src={selectedBlockchain.logo}
                      alt={selectedBlockchain.name}
                      style={{ backgroundColor : "rgba(255,255,255,0.1)" , padding : "3px"}}
                      size={50}
                    />
                  </Flex>
                ) : (
                  <span className={styles.placeholder}>Select Blockchain</span>
                )}
              </div>

              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div className={styles.options}>
                  {blockchains.map((blockchain) => (
                    <div
                      key={blockchain.name}
                      className={styles.option}
                      onClick={() => handleSelect(blockchain)}
                    >
                      <img src={blockchain.logo} alt={blockchain.name} className={styles.optionLogo} />
                      <span className={styles.optionName}>{blockchain.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Flex>

        {activeMenu === 'home' && renderGenerateWallet()}
        {activeMenu === 'generate' && <RenderGenerateSeedPhrase activeMenu={activeMenu} setActiveMenu={setActiveMenu} setSeed={setSeedPhrase}/>}
        {activeMenu === 'import' && <RenderImportSeedPhrase activeMenu={activeMenu} setActiveMenu={setActiveMenu} setSeed={setSeedPhrase}/>}
        {activeMenu === 'wallet' && renderWalletInterface()}
        <SendModal activeModal={activeModal} setActiveModal={setActiveModal}/>
        <ReceiveModal activeModal={activeModal} setActiveModal={setActiveModal} />
        <SwapModal activeModal={activeModal} setActiveModal={setActiveModal}/>
      </Flex>
    </div>
  );
}