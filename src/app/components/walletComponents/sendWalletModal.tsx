import { useState, useEffect } from 'react';
import { Modal, Input, Button, Select , Avatar, Space } from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
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
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);

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

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleSend = () => {
    // Add your send logic here
    console.log({
      blockchain: selectedBlockchain,
      address: receiveAddress,
      amount: sendAmount
    });
  };

  return (
    <Modal
      open={activeModal === 'send'}
      onCancel={handleClose}
      footer={null}
      title={<span style={{ color : "white"}}>Send Crypto</span>}
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
        <Select
          placeholder={<span style={{ color : "black"}}>Select Blockchain</span>}
          className="w-full text-white rounded-lg border border-gray-600 bg-black/20 backdrop-blur-md"
          onChange={(value) => setSelectedBlockchain(value)}
          value={selectedBlockchain}
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
          {blockchains.map((blockchain) => (
            <Select.Option
              key={blockchain.name}
              value={blockchain.name}
              className="text-white bg-black hover:bg-gray-800 transition-colors"
            >
              <Space className="flex items-center">
                { blockchain.name == "Solana" ? <Avatar size={25} icon={ <img src={blockchain.icon}/> } style={{ backgroundColor: "black", display: 'flex' , border : "2px solid gray" , padding :"4px", alignItems: 'center', justifyContent: 'center', }} /> : 
                <Avatar 
                  size={25} 
                  icon={ <img src={blockchain.icon}/> }
                  style={{ 
                    backgroundColor: "white", 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                  }}
                />
                }
                <span style={{ color : "white"}}>{blockchain.name}</span>
              </Space>
            </Select.Option>
          ))}
        </Select>

        <Input
          placeholder="Recipient Address"
          value={receiveAddress}
          onChange={(e) => setReceiveAddress(e.target.value)}
          className="w-full p-3 bg-black/20 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
          styles={{
            input: {
              background: 'transparent',
              color: 'white',
            },
          }}
        />

        <Input
          type="number"
          placeholder="Amount"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          className="w-full p-3 bg-black/20 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
          styles={{
            input: {
              background: 'transparent',
              color: 'white',
            },
          }}
        />

        <Button
          type="primary"
          className="w-full bg-blue-600 text-white font-medium text-lg p-4 rounded-lg hover:bg-blue-500 transition-all"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
}