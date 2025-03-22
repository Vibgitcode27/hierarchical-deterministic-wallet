import { useState } from 'react';
import { Modal, Input, Button, Select, Space, Avatar } from 'antd';
import { CloseOutlined, DownOutlined, SwapOutlined } from '@ant-design/icons';

interface SwapModalProps {
  activeModal: 'send' | 'receive' | 'swap' | null;
  setActiveModal: React.Dispatch<React.SetStateAction<'send' | 'receive' | 'swap' | null>>;
}

interface Token {
  name: string;
  balance: string;
  icon?: string;
}

export default function SwapModal({
  activeModal,
  setActiveModal,
}: SwapModalProps) {
  const [fromToken, setFromToken] = useState<string | null>(null);
  const [toToken, setToToken] = useState<string | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');

  const tokens: Token[] = [
    { name: 'ETH', balance: '0.5', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { name: 'USDC', balance: '100', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
    { name: 'SOL', balance: '0.2', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png' }
  ];

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleSwap = () => {
    // Add your swap logic here
    console.log({
      fromToken,
      toToken,
      fromAmount,
      toAmount
    });
  };

  // Simulate exchange rate calculation
  const calculateToAmount = (amount: string) => {
    if (!amount || !fromToken || !toToken) return '';
    
    // Dummy exchange rates for demonstration
    const rates = {
      'ETH-USDC': 3000,
      'ETH-SOL': 15,
      'USDC-ETH': 1/3000,
      'USDC-SOL': 1/200,
      'SOL-ETH': 1/15,
      'SOL-USDC': 200
    };
    
    const pair = `${fromToken}-${toToken}`;
    const rate = rates[pair as keyof typeof rates] || 1;
    
    return (parseFloat(amount) * rate).toFixed(6);
  };

  // Update toAmount when fromAmount, fromToken, or toToken changes
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  return (
    <Modal
      open={activeModal === 'swap'}
      onCancel={handleClose}
      footer={null}
      title={<span style={{ color: "white" }}>Swap Tokens</span>}
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
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
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
          padding: '20px',
        },
      }}
      width={480}
    >
      <div className="space-y-5">
        {/* From Token Section */}
        <div>
          <label className="text-white mb-2 block">From</label>
          <Select
            placeholder={<span style={{ color: "black" }}>Select Token</span>}
            className="w-full text-white rounded-lg border border-gray-600 bg-black/20 backdrop-blur-md"
            onChange={(value) => {
              setFromToken(value);
              setToAmount(calculateToAmount(fromAmount));
            }}
            value={fromToken}
            suffixIcon={<DownOutlined className="text-gray-400" />}
            dropdownStyle={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              padding: '5px',
            }}
            style={{
              background: 'black !important',
              borderColor: 'rgba(255, 255, 255, 0.2) !important',
              borderRadius: '8px !important',
              padding: '8px !important',
            }}
          >
            {tokens.map((token) => (
              <Select.Option
                key={token.name}
                value={token.name}
                className="text-white bg-black hover:bg-gray-800 transition-colors"
              >
                <Space className="flex items-center">
                  <Avatar 
                    size={25} 
                    icon={<img src={token.icon} alt={token.name} />}
                    style={{ 
                      backgroundColor: token.name === "SOL" ? "black" : "white", 
                      display: 'flex', 
                      border: token.name === "SOL" ? "2px solid gray" : "none",
                      padding: token.name === "SOL" ? "4px" : "0",
                      alignItems: 'center', 
                      justifyContent: 'center',
                    }}
                  />
                  <span style={{ color: "white" }}>{token.name}</span>
                  <span style={{ color: "gray", fontSize: "0.8rem" }}>Balance: {token.balance}</span>
                </Space>
              </Select.Option>
            ))}
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            className="w-full p-3 mt-2 bg-black/20 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            styles={{
              input: {
                background: 'transparent',
                color: 'white',
              },
            }}
          />
        </div>
        
        {/* Swap Icon */}
        <div className="flex justify-center my-4">
          <div className="bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-500 transition-all">
            <SwapOutlined className="text-white text-lg" />
          </div>
        </div>
        
        {/* To Token Section */}
        <div>
          <label className="text-white mb-2 block">To</label>
          <Select
            placeholder={<span style={{ color: "black" }}>Select Token</span>}
            className="w-full text-white rounded-lg border border-gray-600 bg-black/20 backdrop-blur-md"
            onChange={(value) => {
              setToToken(value);
              setToAmount(calculateToAmount(fromAmount));
            }}
            value={toToken}
            suffixIcon={<DownOutlined className="text-gray-400" />}
            dropdownStyle={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              padding: '5px',
            }}
            style={{
              background: 'black !important',
              borderColor: 'rgba(255, 255, 255, 0.2) !important',
              borderRadius: '8px !important',
              padding: '8px !important',
            }}
          >
            {tokens.map((token) => (
              <Select.Option
                key={token.name}
                value={token.name}
                className="text-white bg-black hover:bg-gray-800 transition-colors"
              >
                <Space className="flex items-center">
                  <Avatar 
                    size={25} 
                    icon={<img src={token.icon} alt={token.name} />}
                    style={{ 
                      backgroundColor: token.name === "SOL" ? "black" : "white", 
                      display: 'flex', 
                      border: token.name === "SOL" ? "2px solid gray" : "none",
                      padding: token.name === "SOL" ? "4px" : "0",
                      alignItems: 'center', 
                      justifyContent: 'center',
                    }}
                  />
                  <span style={{ color: "white" }}>{token.name}</span>
                  <span style={{ color: "gray", fontSize: "0.8rem" }}>Balance: {token.balance}</span>
                </Space>
              </Select.Option>
            ))}
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            value={toAmount}
            disabled
            className="w-full p-3 mt-2 bg-black/20 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            styles={{
              input: {
                background: 'transparent',
                color: 'white',
              },
            }}
          />
        </div>
        
        {/* Swap Button */}
        <Button
          type="primary"
          className="w-full bg-blue-600 text-white font-medium text-lg p-4 rounded-lg hover:bg-blue-500 transition-all"
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !fromAmount}
        >
          Swap
        </Button>
      </div>
    </Modal>
  );
}