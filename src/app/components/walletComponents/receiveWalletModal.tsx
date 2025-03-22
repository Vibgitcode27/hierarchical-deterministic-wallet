import { useState } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined, CopyOutlined, QrcodeOutlined, CheckOutlined } from '@ant-design/icons';

interface ReceiveModalProps {
  activeModal: 'send' | 'receive' | 'swap' | null;
  setActiveModal: React.Dispatch<React.SetStateAction<'send' | 'receive' | 'swap' | null>>;
}

export default function ReceiveModal({
  activeModal,
  setActiveModal,
}: ReceiveModalProps) {
  const [copied, setCopied] = useState(false);
  const address = '0x1234...5678';

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="bg-white/10 p-4 rounded-lg border border-gray-700">
          <p className="text-white text-lg break-words">{address}</p>
        </div>
        
        <div className="flex justify-center">
          <div className="border-4 border-white/20 rounded-lg p-6 bg-white/5">
            <QrcodeOutlined style={{ fontSize: '200px', color: 'white' }} />
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