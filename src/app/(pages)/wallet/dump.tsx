"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Wallet, 
  Copy, 
  QrCode, 
  ArrowRightLeft, 
  ChevronDown, 
  X 
} from 'lucide-react';

// Custom Dropdown Component
const CustomDropdown = ({ 
  options, 
  selectedOption, 
  onSelect, 
  label 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={dropdownRef} 
      className="relative w-full"
      style={{ zIndex: 10 }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#1c49ff]/10 text-white p-3 rounded-lg"
      >
        {selectedOption ? selectedOption.name : label}
        <ChevronDown 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div 
          className="absolute top-full mt-2 w-full bg-[#1c49ff]/20 rounded-lg shadow-lg"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          {options.map((option) => (
            <div 
              key={option.name}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="p-3 hover:bg-[#1c49ff]/30 cursor-pointer text-white"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#1c49ff]/10 rounded-2xl p-6 w-[500px] relative"
        onClick={(e) => e.stopPropagation()}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white font-semibold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:bg-red-500/20 rounded-full p-2"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function WalletPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedBlockchain, setSelectedBlockchain] = useState(null);
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAddress, setReceiveAddress] = useState('');

  const blockchains = [
    { 
      name: 'Ethereum', 
      icon: '/ethereum-icon.png',
      networks: ['Mainnet', 'Sepolia']
    },
    { 
      name: 'Solana', 
      icon: '/solana-icon.png',
      networks: ['Mainnet', 'Testnet']
    }
  ];

  const SendModal = () => (
    <Modal 
      isOpen={activeModal === 'send'} 
      onClose={() => setActiveModal(null)} 
      title="Send Crypto"
    >
      <div className="space-y-4">
        <CustomDropdown 
          options={blockchains}
          selectedOption={selectedBlockchain}
          onSelect={setSelectedBlockchain}
          label="Select Blockchain"
        />
        
        <input 
          type="text" 
          placeholder="Recipient Address" 
          value={receiveAddress}
          onChange={(e) => setReceiveAddress(e.target.value)}
          className="w-full p-3 bg-[#1c49ff]/10 text-white rounded-lg border border-[#1c49ff]/30 focus:outline-none focus:ring-2 focus:ring-[#1c49ff]"
        />
        
        <input 
          type="number" 
          placeholder="Amount" 
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          className="w-full p-3 bg-[#1c49ff]/10 text-white rounded-lg border border-[#1c49ff]/30 focus:outline-none focus:ring-2 focus:ring-[#1c49ff]"
        />
        
        <button 
          className="w-full bg-[#1c49ff] text-white p-3 rounded-lg hover:bg-[#1c49ff]/90 transition-colors"
        >
          Send
        </button>
      </div>
    </Modal>
  );

  const ReceiveModal = () => {
    const [copied, setCopied] = useState(false);
    const address = '0x1234...5678';

    const handleCopy = () => {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <Modal 
        isOpen={activeModal === 'receive'} 
        onClose={() => setActiveModal(null)} 
        title="Receive Crypto"
      >
        <div className="space-y-4 text-center">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-lg break-words">{address}</p>
          </div>
          
          <div className="flex justify-center">
            <QrCode 
              size={250} 
              className="text-white border-4 border-white/20 rounded-lg p-4" 
            />
          </div>
          
          <button 
            onClick={handleCopy}
            className="w-full bg-[#1c49ff] text-white p-3 rounded-lg hover:bg-[#1c49ff]/90 transition-colors flex items-center justify-center gap-2"
          >
            <Copy /> {copied ? 'Copied!' : 'Copy Address'}
          </button>
        </div>
      </Modal>
    );
  };

  const SwapModal = () => {
    const [fromToken, setFromToken] = useState(null);
    const [toToken, setToToken] = useState(null);

    const tokens = [
      { name: 'ETH', balance: '0.5' },
      { name: 'USDC', balance: '100' },
      { name: 'SOL', balance: '0.2' }
    ];

    return (
      <Modal 
        isOpen={activeModal === 'swap'} 
        onClose={() => setActiveModal(null)} 
        title="Swap Tokens"
      >
        <div className="space-y-4">
          <div>
            <label className="text-white mb-2 block">From</label>
            <CustomDropdown 
              options={tokens}
              selectedOption={fromToken}
              onSelect={setFromToken}
              label="Select Token"
            />
            <input 
              type="number" 
              placeholder="Amount" 
              className="w-full p-3 mt-2 bg-[#1c49ff]/10 text-white rounded-lg"
            />
          </div>
          
          <div className="flex justify-center my-4">
            <ArrowRightLeft className="text-white" />
          </div>
          
          <div>
            <label className="text-white mb-2 block">To</label>
            <CustomDropdown 
              options={tokens}
              selectedOption={toToken}
              onSelect={setToToken}
              label="Select Token"
            />
            <input 
              type="number" 
              placeholder="Amount" 
              className="w-full p-3 mt-2 bg-[#1c49ff]/10 text-white rounded-lg"
              disabled
            />
          </div>
          
          <button 
            className="w-full bg-[#1c49ff] text-white p-3 rounded-lg hover:bg-[#1c49ff]/90 transition-colors mt-4"
          >
            Swap
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-xl text-gray-400 uppercase tracking-widest">
            Wallet
          </h1>
          <h2 className="text-5xl font-bold text-white">
            Manage Your Digital Assets
          </h2>
        </header>

        <div className="grid grid-cols-3 gap-6">
          <div 
            onClick={() => setActiveModal('send')}
            className="bg-[#1c49ff]/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#1c49ff]/20 transition-colors"
          >
            <Send className="text-[#1c49ff] w-16 h-16 mb-4" />
            <h3 className="text-white text-2xl font-semibold">Send</h3>
          </div>
          
          <div 
            onClick={() => setActiveModal('receive')}
            className="bg-[#1c49ff]/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#1c49ff]/20 transition-colors"
          >
            <QrCode className="text-[#4CAF50] w-16 h-16 mb-4" />
            <h3 className="text-white text-2xl font-semibold">Receive</h3>
          </div>
          
          <div 
            onClick={() => setActiveModal('swap')}
            className="bg-[#1c49ff]/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#1c49ff]/20 transition-colors"
          >
            <ArrowRightLeft className="text-[#ff4654] w-16 h-16 mb-4" />
            <h3 className="text-white text-2xl font-semibold">Swap</h3>
          </div>
        </div>
      </div>

      <SendModal />
      <ReceiveModal />
      <SwapModal />
    </div>
  );
}















// "use client";
// import React, { useState } from 'react';
// import { Flex, Image, Avatar } from 'antd';
// import { WalletOutlined } from '@ant-design/icons';
// import NFTMenu from '../../components/nftmenu';
// import nft1 from "../../assets/nft1.avif";
// import nft2 from "../../assets/nft2.jpg";
// import nft3 from "../../assets/nft3.jpg";
// import nft4 from "../../assets/nft4.jpg";
// import nft5 from "../../assets/nft5.png";

// export default function NFTShowcase() {
//   const [activeMenu, setActiveMenu] = useState<'showcase' | 'owned'>('showcase');
//   const [hoveredImage, setHoveredImage] = useState<number | null>(null);

//   const handleMenuSelect = (menu: 'showcase' | 'owned') => {
//     setActiveMenu(menu);
//   };

//   const imageStyle = (index: number, isHovered: boolean): React.CSSProperties => ({
//     width: "250px", 
//     height: "200px", 
//     objectFit: "cover",
//     borderRadius: "15px",
//     transform: isHovered 
//       ? "scale(1.05) rotate(0deg) translateY(-10px)" : "scale(1) rotate(0deg) translateY(0px)",
//     boxShadow: isHovered 
//       ? "0 25px 35px rgba(0,0,0,0.4)" 
//       : "0 15px 25px rgba(0,0,0,0.3)",
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//     opacity: isHovered ? 1 : 0.9,
//     filter: isHovered ? "brightness(110%)" : "brightness(100%)"
//   });

//   const nftCollections = [
//     {
//       name: "Orion Genesis Collection",
//       description: "Curated NFTs from top creators",
//       items: [
//         { id: '1', image: nft1, price: "0.5 ETH", platform: "OpenSea" },
//         { id: '2', image: nft2, price: "0.7 ETH", platform: "OpenSea" },
//         { id: '3', image: nft3, price: "0.6 ETH", platform: "OpenSea" }
//       ]
//     },
//     {
//       name: "Digital Pioneers",
//       description: "Trending NFT collections",
//       items: [
//         { id: '4', image: nft4, price: "0.4 ETH", platform: "OpenSea" },
//         { id: '5', image: nft5, price: "0.8 ETH", platform: "OpenSea" }
//       ]
//     }
//   ];

//   const ownedNFTs = [
//     {
//       name: "My NFT Collection",
//       description: "NFTs you currently own",
//       items: [
//         { id: '6', image: nft1, price: "0.5 ETH", platform: "Owned" },
//         { id: '7', image: nft2, price: "0.7 ETH", platform: "Owned" }
//       ]
//     }
//   ];

//   const renderNFTCollections = (collections: typeof nftCollections) => (
//     <>
//       {collections.map((collection, collectionIndex) => (
//         <Flex 
//           key={collectionIndex} 
//           vertical 
//           style={{ marginBottom: "40px" }}
//         >
//           <Flex justify="space-between" align="center" style={{ marginBottom: "20px" }}>
//             <Flex vertical>
//               <h2 style={{ 
//                 color: "white", 
//                 fontSize: "30px", 
//                 margin: 0 
//               }}>
//                 {collection.name}
//               </h2>
//               <p style={{ 
//                 color: "#888", 
//                 fontSize: "16px" 
//               }}>
//                 {collection.description}
//               </p>
//             </Flex>
//             <button 
//               className="outline red" 
//               type="button"
//               style={{ 
//                 fontSize: "24px",
//                 width: "230px",
//                 padding: "10px",
//                 backgroundColor: "rgba(28, 73, 255, 0.1)",
//                 color: "#f4f4f4",
//                 border: "1px solid #1c49ff",
//                 borderRadius: "10px",
//                 marginTop : "30px"
//               }}
//             >
//               View Collection
//             </button>
//           </Flex>

//           <Flex gap={20}>
//             {collection.items.map((nft, index) => (
//               <Flex
//                 key={nft.id}
//                 vertical
//                 style={{
//                   backgroundColor: "rgba(28, 73, 255, 0.1)",
//                   borderRadius: "15px",
//                   padding: "15px",
//                   width: "300px",
//                   color: "white",
//                   transition: "transform 0.3s ease",
//                   boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = 'scale(1.02)';
//                   setHoveredImage(index);
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = 'scale(1)';
//                   setHoveredImage(null);
//                 }}
//               >
//                 <Image 
//                   preview={false}
//                   src={nft.image.src} 
//                   style={{
//                     ...imageStyle(index, hoveredImage === index),
//                     width: "100%",
//                     height: "250px",
//                     objectFit: "cover"
//                   }}
//                 />
                
//                 <Flex 
//                   justify="space-between" 
//                   align="center" 
//                   style={{ 
//                     marginTop: "15px", 
//                     width: "100%" 
//                   }}
//                 >
//                   <Flex align="center" gap="middle">
//                     <Avatar 
//                       size={40} 
//                       icon={<WalletOutlined />} 
//                       style={{ backgroundColor: "#1c49ff" , width : "55px"}}
//                     />
//                     <Flex vertical>
//                       <span style={{ 
//                         color: 'white', 
//                         fontWeight: 'bold', 
//                         fontSize: "18px" 
//                       }}>
//                         {nft.platform} NFT #{nft.id}
//                       </span>
//                       <small style={{ 
//                         color: '#888', 
//                         fontSize: "14px" 
//                       }}>
//                         {nft.price}
//                       </small>
//                     </Flex>
//                   </Flex>
                  
//                   <button
//                     style={{
//                     //   all: "unset",
//                       backgroundColor: "#1c49ff",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "20px",
//                       padding: "8px 15px",
//                       cursor: "pointer",
//                       width: "152px",
//                     }}
//                   >
//                     Buy Now
//                   </button>
//                 </Flex>
//               </Flex>
//             ))}
//           </Flex>
//         </Flex>
//       ))}
//     </>
//   );

//   return (
//     <div style={{ 
//       height: "93vh", 
//       borderRadius: "30px", 
//       padding: "20px",
//       overflowY: 'auto', 
//       scrollbarWidth: 'none', 
//       msOverflowStyle: 'none',
//     }}>
//       <Flex vertical>
//         <h1 style={{ 
//           color: "#f4f4f4", 
//           fontSize: "20px", 
//           marginBottom: "10px" 
//         }}>
//         N F T &#160;&#160;S H O W C A S E
//         </h1>
//         <h1 style={{ 
//           fontSize: "55px", 
//           fontFamily: "sans-serif", 
//           fontWeight: "600", 
//           color: "white",
//           marginBottom: "30px"
//         }}>
//           # Explore Orion NFTs
//         </h1>

//         <NFTMenu onMenuSelect={handleMenuSelect} />

//         {activeMenu === 'showcase' 
//           ? renderNFTCollections(nftCollections)
//           : renderNFTCollections(ownedNFTs)}
//       </Flex>
//     </div>
//   );
// }