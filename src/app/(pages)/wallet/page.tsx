"use client";

import React, { useState } from 'react';
import { Flex, Avatar, Select } from 'antd';
import RenderGenerateSeedPhrase from '@/app/components/walletComponents/generateSeed';
import RenderImportSeedPhrase from '@/app/components/walletComponents/importSeedPhrase';
import SendModal from '@/app/components/walletComponents/sendWalletModal';
import ReceiveModal from '@/app/components/walletComponents/receiveWalletModal';
import SwapModal from '@/app/components/walletComponents/swapWalletModal';
import { 
  WalletOutlined, 
  CopyOutlined, 
  SendOutlined, 
  SwapOutlined, 
  QrcodeOutlined 
} from '@ant-design/icons';
import "../../styles/button.css";

export default function WalletPage() {
  const [activeMenu, setActiveMenu] = useState<'home' | 'import' | 'wallet' | 'generate' | 'import'>('home');
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedBlockchain, setSelectedBlockchain] = useState('all');

  const accounts = [
    {
      id: 1,
      name: 'Ethereum Wallet 1',
      address: '0x1234...5678',
      balance: '0.5 ETH',
      blockchain: 'ethereum',
      network: 'mainnet'
    },
    {
      id: 2,
      name: 'Solana Wallet 1',
      address: 'Sol1234...5678',
      balance: '0.2 SOL',
      blockchain: 'solana',
      network: 'mainnet'
    },
    {
      id: 3,
      name: 'Ethereum Wallet 2',
      address: '0x9876...4321',
      balance: '1.2 ETH',
      blockchain: 'ethereum',
      network: 'mainnet'
    }
  ];

const blockchains = [
    { 
      value: 'all', 
      label: 'All Blockchains',
      icon: '🌐',
    },
    { 
      value: 'ethereum', 
      label: 'Ethereum',
      icon: '⟠',
    },
    { 
      value: 'solana', 
      label: 'Solana',
      icon: '◎',
    }
  ];


  const filteredAccounts = selectedBlockchain === 'all' 
    ? accounts 
    : accounts.filter(account => account.blockchain === selectedBlockchain);

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
            width: '300px', 
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
              fontSize: '30px'
            }}>
              My Wallets
            </h2>

            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={(value) => {
                setSelectedBlockchain(value);
                setSelectedAccount(0);  // Reset selected account when changing blockchain
              }}
              options={blockchains}
              className="blockchain-select"
            />
          </Flex>

          {filteredAccounts.map((account, index) => (
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
                  size={55} 
                  icon={<WalletOutlined />} 
                  style={{ 
                    backgroundColor: "#1c49ff", 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }} 
                />
                <Flex vertical>
                  <span style={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    fontSize: "18px" 
                  }}>
                    {account.name}
                  </span>
                  <small style={{ 
                    color: '#888', 
                    fontSize: "14px" 
                  }}>
                    {account.address}
                  </small>
                </Flex>
              </Flex>
              <span style={{ 
                color: 'white', 
                fontWeight: 'bold' 
              }}>
                {account.balance}
              </span>
            </Flex>
          ))}
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
                  {currentAccount.name}
                </h1>
                <Flex align="center" gap={10}>
                  <span style={{ color: '#888' }}>
                    {currentAccount.address}
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
                  <SendOutlined /> Send
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
                  <SwapOutlined /> Swap
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
                  <QrcodeOutlined /> Receive
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
              <h2 style={{ 
                color: 'white', 
                marginBottom: '20px',
                fontSize: '30px'
              }}>
                Recent Transactions
              </h2>
              
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
      height: "93vh", 
      borderRadius: "30px", 
      padding: "20px",
      backgroundColor: '#121212'
    }}>
      <Flex vertical>
        <h1 style={{ 
          color: "#f4f4f4", 
          fontSize: "20px", 
          marginBottom: "10px" 
        }}>
          W A L L E T
        </h1>
        <h1 style={{ 
          fontSize: "55px", 
          fontFamily: "sans-serif", 
          fontWeight: "600", 
          color: "white",
          marginBottom: "30px"
        }}>
          # Manage Your Digital Assets
        </h1>

        {activeMenu === 'home' && renderGenerateWallet()}
        {activeMenu === 'generate' && <RenderGenerateSeedPhrase activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>}
        {activeMenu === 'import' && <RenderImportSeedPhrase activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>}
        {activeMenu === 'wallet' && renderWalletInterface()}
        <SendModal activeModal={activeModal} setActiveModal={setActiveModal}/>
        <ReceiveModal activeModal={activeModal} setActiveModal={setActiveModal} />
        <SwapModal activeModal={activeModal} setActiveModal={setActiveModal}/>
      </Flex>
    </div>
  );
}