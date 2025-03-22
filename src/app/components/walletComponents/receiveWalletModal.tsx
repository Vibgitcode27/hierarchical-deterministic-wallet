import { useState } from 'react';
import { Modal, Button , QRCode , Input } from 'antd';
import { ethers, formatEther, parseEther } from 'ethers';
import * as solanaWeb3 from '@solana/web3.js';
import logo from "../../assets/profile-removebg-preview.png";
import { CloseOutlined, CopyOutlined, QrcodeOutlined, CheckOutlined } from '@ant-design/icons';

interface ReceiveModalProps {
  activeModal: 'send' | 'receive' | 'swap' | null;
  setActiveModal: React.Dispatch<React.SetStateAction<'send' | 'receive' | 'swap' | null>>;
  blockChain: string;
  publicKey: string;
}

export default function ReceiveModal({
  activeModal,
  setActiveModal,
  blockChain,
  publicKey,
}: ReceiveModalProps) {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<string>('0');

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQrCodeValue = () => {
    if (blockChain === "Ethereum") {
      const chainId = 1; // 1 = Mainnet, use 11155111 for Sepolia, 5 for Goerli, etc.
      return `ethereum:${publicKey}@${chainId}?value=${parseEther(amount || "0")}`;
    } else {
      return `solana:${publicKey}?amount=${
        parseFloat(amount || "0") * solanaWeb3.LAMPORTS_PER_SOL
      }`;
    }
  };

  return (
    <Modal
      open={activeModal === 'receive'}
      onCancel={handleClose}
      footer={null}
      title={<span style={{ color: "white" }}>Receive Crypto</span>}
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
      <div className="space-y-5 text-center">
        <Input
          placeholder="Enter Amount To Receive"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setAmount(value);
            }
          }}
          value={amount}
          className="w-full p-3 bg-black/20 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
          styles={{
            input: {
              background: 'transparent',
              color: 'white',
            },
          }}
        />
        
        <div className="flex justify-center">
          <div className="border-4 border-white/20 rounded-lg p-6 bg-white/5">
            {/* <QrcodeOutlined style={{ fontSize: '200px', color: 'white' }} /> */}
            <QRCode 
              style={{ color : "white" , backgroundColor : "white"}}
              value={generateQrCodeValue()} 
              size={250}
              icon={logo.src} 
            />
          </div>
        </div>
        
        <Button
          type="primary"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
          className="w-full bg-blue-600 text-white font-medium text-md p-6 h-auto rounded-lg hover:bg-blue-500 transition-all flex items-center justify-center"
          style={{ height : "30px"}}
        >
          <span className="ml-2">{copied ? 'Copied!' : 'Copy Address'}</span>
        </Button>
      </div>
    </Modal>
  );
}