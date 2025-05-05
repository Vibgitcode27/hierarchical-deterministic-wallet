import { useState, useEffect, useRef } from 'react';
import { Modal, Input, Button, Avatar, Space, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ethLogo from "../../assets/ethereum-6903901_1280.png";
import solLogo from "../../assets/solana-sol-icon.png";

interface SendModalProps {
  activeModal: 'send' | 'receive' | 'swap' | null;
  setActiveModal: React.Dispatch<React.SetStateAction<'send' | 'receive' | 'swap' | null>>;
}

interface Blockchain {
  name: string;
  icon: string;
  networks: string[];
}

export default function SendModal({
  activeModal,
  setActiveModal,
}: SendModalProps) {
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAddress, setReceiveAddress] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [isBlockchainDropdownOpen, setIsBlockchainDropdownOpen] = useState(false);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  
  const blockchainDropdownRef = useRef<HTMLDivElement>(null);
  const networkDropdownRef = useRef<HTMLDivElement>(null);

  const blockchains: Blockchain[] = [
    {
      name: 'Ethereum',
      icon: ethLogo.src,
      networks: ['Mainnet', 'Sepolia']
    },
    {
      name: 'Solana',
      icon: solLogo.src,
      networks: ['Mainnet', 'Testnet']
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockchainDropdownRef.current && !blockchainDropdownRef.current.contains(event.target as Node)) {
        setIsBlockchainDropdownOpen(false);
      }
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleBlockchainSelect = (blockchain: Blockchain) => {
    setSelectedBlockchain(blockchain);
    setSelectedNetwork(blockchain.networks[0]);
    setIsBlockchainDropdownOpen(false);
  };

  const handleNetworkSelect = (network: string) => {
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false);
  };

  const handleSend = () => {
    console.log({
      blockchain: selectedBlockchain?.name,
      network: selectedNetwork,
      address: receiveAddress,
      amount: sendAmount
    });
  };

  const toggleBlockchainDropdown = () => {
    setIsBlockchainDropdownOpen(!isBlockchainDropdownOpen);
    if (isNetworkDropdownOpen) setIsNetworkDropdownOpen(false);
  };

  const toggleNetworkDropdown = () => {
    setIsNetworkDropdownOpen(!isNetworkDropdownOpen);
    if (isBlockchainDropdownOpen) setIsBlockchainDropdownOpen(false);
  };

  return (
    <Modal
      open={activeModal === 'send'}
      onCancel={handleClose}
      footer={null}
      title={<span className="text-xl font-bold text-white">Send Crypto</span>}
      centered
      closeIcon={<CloseOutlined className="text-gray-400 hover:text-white transition-colors" />}
      className="backdrop-blur-md"
      styles={{
        mask: {
          backdropFilter: 'blur(6px)',
          background: 'rgba(0, 0, 0, 0.6)',
        },
        content: {
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(15px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        },
        header: {
          background: 'transparent',
          color: 'white',
          borderBottom: 'none',
          paddingBottom: '0',
          fontSize: '18px',
          fontWeight: '600',
        },
        body: {
          padding: '24px',
        },
      }}
      width={480}
    >
      <div className="space-y-6">
        {/* Custom Blockchain Dropdown */}
        <div className="relative" ref={blockchainDropdownRef}>
          <div className="text-gray-400 text-sm mb-2">Blockchain</div>
          <div 
            className="w-full flex items-center justify-between p-3 bg-black/30 text-white rounded-lg border border-gray-600 cursor-pointer hover:border-gray-500 transition-colors"
            onClick={toggleBlockchainDropdown}
          >
            {selectedBlockchain ? (
              <div className="flex items-center">
                <Avatar 
                  size={36} 
                  src={selectedBlockchain.icon}
                  style={{ 
                    backgroundColor: selectedBlockchain.name === "Solana" ? "black" : "white", 
                    padding: selectedBlockchain.name === "Solana" ? "4px" : "2px",
                    border: selectedBlockchain.name === "Solana" ? "2px solid gray" : "none",
                  }}
                />
                <span className="ml-3 text-white">{selectedBlockchain.name}</span>
              </div>
            ) : (
              <span className="text-gray-500">Select Blockchain</span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform ${isBlockchainDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          
          {isBlockchainDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full p-2 bg-black/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
              {blockchains.map((blockchain) => (
                <div
                  key={blockchain.name}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-800/50 rounded-md transition-colors"
                  onClick={() => handleBlockchainSelect(blockchain)}
                >
                  <Avatar 
                    size={36} 
                    src={blockchain.icon}
                    style={{ 
                      backgroundColor: blockchain.name === "Solana" ? "black" : "white", 
                      padding: blockchain.name === "Solana" ? "4px" : "2px",
                      border: blockchain.name === "Solana" ? "2px solid gray" : "none",
                    }}
                  />
                  <span className="ml-3 text-white">{blockchain.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Network Dropdown */}
        {selectedBlockchain && (
          <div className="relative" ref={networkDropdownRef}>
            <div className="text-gray-400 text-sm mb-2">Network</div>
            <div 
              className="w-full flex items-center justify-between p-3 bg-black/30 text-white rounded-lg border border-gray-600 cursor-pointer hover:border-gray-500 transition-colors"
              onClick={toggleNetworkDropdown}
            >
              {selectedNetwork ? (
                <span className="text-white">{selectedNetwork}</span>
              ) : (
                <span className="text-gray-500">Select Network</span>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform ${isNetworkDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {isNetworkDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full p-2 bg-black/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
                {selectedBlockchain.networks.map((network) => (
                  <div
                    key={network}
                    className="p-3 cursor-pointer hover:bg-gray-800/50 rounded-md transition-colors"
                    onClick={() => handleNetworkSelect(network)}
                  >
                    <span className="text-white">{network}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recipient Address Input */}
        <div>
          <div className="text-gray-400 text-sm mb-2">Recipient Address</div>
          <Input
            placeholder="0x..."
            value={receiveAddress}
            onChange={(e) => setReceiveAddress(e.target.value)}
            className="w-full p-3 bg-black/30 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
            styles={{
              input: {
                background: 'transparent',
                color: 'white',
                height: '36px',
              },
            }}
          />
        </div>

        {/* Amount Input */}
        <div>
          <div className="text-gray-400 text-sm mb-2">Amount</div>
          <Input
            type="number"
            placeholder="0.00"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            className="w-full p-3 bg-black/30 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
            styles={{
              input: {
                background: 'transparent',
                color: 'white',
                height: '36px',
              },
            }}
          />
        </div>

        {/* Send Button */}
        <Button
          type="primary"
          className="w-full h-14 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-500 transition-all mt-4"
          onClick={handleSend}
          disabled={!selectedBlockchain || !selectedNetwork || !receiveAddress || !sendAmount}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
}