"use client";

import React, { useState , useRef , useEffect } from 'react';
import { Flex, Avatar } from 'antd';
import ethLogo from "../../assets/ethereum-6903901_1280.png";
import solLogo from "../../assets/solana-sol-icon.png";
// import { generateSeedPhrase } from '@/app/components/helpers/helperFunctions';
import RenderGenerateSeedPhrase from '@/app/components/walletComponents/generateSeed';
import { 
  WalletOutlined, 
  CopyOutlined, 
  SendOutlined, 
  SwapOutlined, 
  QrcodeOutlined 
} from '@ant-design/icons';
import "../../styles/button.css";
import {
  Copy, 
  QrCode, 
  ArrowRightLeft, 
  ChevronDown,
  X
} from 'lucide-react';


// Custom Dropdown Component
interface Option {
  name: string;
}

interface CustomDropdownProps {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
  label: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
  options, 
  selectedOption, 
  onSelect, 
  label 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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


export default function WalletPage() {
  const [activeMenu, setActiveMenu] = useState<'home' | 'import' | 'wallet' | 'generate' | 'import'>('home');
  // const [regenerate , toggleRegenerate] = useState<boolean>(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState<Option | null>(null);
  const [selectedAccount, setSelectedAccount] = useState(0);
  
  // useEffect(() => {
  //   if (activeMenu === 'generate') {
  //     let seed = generateSeedPhrase();
  //     setSeedPhrase(seed);
  //   }
  // }, [activeMenu , regenerate]);

  const blockchains = [
    { 
      name: 'Ethereum', 
      icon: ethLogo,
      networks: ['Mainnet', 'Sepolia']
    },
    { 
      name: 'Solana', 
      icon: solLogo,
      networks: ['Mainnet', 'Testnet']
    }
  ];

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
    }
  ];
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
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
  const [activeModal, setActiveModal] = useState<'send' | 'receive' | 'swap' | null>(null);
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAddress, setReceiveAddress] = useState('');

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
    const [fromToken, setFromToken] = useState<Option | null>(null);
    const [toToken, setToToken] = useState<Option | null>(null);

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


  const renderGenerateWallet = () => (
    <Flex 
      vertical 
      align="center" 
      justify="center" 
      style={{ 
        height: '100%', 
        gap: '20px',
        // backgroundColor: 'rgba(28, 73, 255, 0.1)',
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
          padding : "10px",
          width : "300px",
        }}
        >
          <div className="label">
              <span className="hover-effect"></span>
              <span className="label-text" style={{ padding : "4px" , paddingBlock : "10px" , paddingLeft : "6px" , fontSize : "26px" , color : "#f4f4f4"}}>Generate Seed</span>
          </div>
        </button>
        <button 
          onClick={() => {setActiveMenu('import')}}
          className="outline" 
          type="button"
          style={{ 
          color: "#ff4654",
          textAlign: "center",
          padding : "10px",
          width : "300px",
        }}
        >
            <div className="label">
                <span className="hover-effect" style={{ backgroundColor : "#74ccc9"}}></span>
                <span className="label-text" style={{ padding : "4px" , paddingBlock : "10px" , paddingLeft : "6px" , fontSize : "26px" , color : "#f4f4f4" }}>Import Seed</span>
             </div>
        </button>
      </Flex>
    </Flex>
  );


  // const [seedPhrase, setSeedPhrase] = useState<string>('venture lottery motor spell gloom venue cruel escape jump banner shell debris');
  // const [isCopied, setIsCopied] = useState<boolean>(false);
  // const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  // const [hasAgreedToCopy, setHasAgreedToCopy] = useState<boolean>(false);

  // const copySeedPhrase = () => {
  //   navigator.clipboard.writeText(seedPhrase);
  //   setIsCopied(true);
  //   setTimeout(() => setIsCopied(false), 2000);
  // };

  // const handleProceed = () => {
  //   if (hasAgreedToCopy && isCopied) {
  //     setIsConfirmed(true);
  //   } else {
  //     alert('Please copy the seed phrase and confirm that you have copied it.');
  //   }
  // };

  // const renderGenerateSeedPhrase = () => {
  //   return (
  //   <div 
  //     style={{ 
  //       backgroundColor: 'rgba(28, 73, 255, 0.1)', 
  //       borderRadius: '15px', 
  //       padding: '10px', 
  //       color: 'white',
  //       width:'900px',
  //       margin: '0 auto'
  //     }}
  //   >
  //     <h2 
  //       style={{ 
  //         textAlign: 'center', 
  //         marginBottom: '20px', 
  //         color: '#74ccc9' 
  //       }}
  //     >
  //       Generate Seed Phrase
  //     </h2>

  //     {!isConfirmed ? (
  //       <>
  //         {seedPhrase ? (
  //           <div 
  //             style={{ 
  //               backgroundColor: 'rgba(0,0,0,0.3)', 
  //               borderRadius: '10px', 
  //               padding: '15px', 
  //               marginBottom: '20px',
  //               position: 'relative'
  //             }}
  //           >
  //             <div 
  //               style={{ 
  //                 display: 'grid', 
  //                 gridTemplateColumns: 'repeat(4, 1fr)', 
  //                 gap: '10px' 
  //               }}
  //             >
  //               {seedPhrase.split(' ').map((word, index) => (
  //                 <div 
  //                   key={index} 
  //                   style={{ 
  //                     backgroundColor: 'rgba(255,255,255,0.1)', 
  //                     padding: '10px', 
  //                     borderRadius: '5px', 
  //                     textAlign: 'center' 
  //                   }}
  //                 >
  //                   {word}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         ) : null}

  //         <div style={{ textAlign: 'center', marginBottom: '-20px' }}>
  //           {!seedPhrase ? (
  //             <button 
  //               // onClick={generateSeedPhrase}
  //               style={{
  //                 backgroundColor: '#74ccc9',
  //                 color: 'black',
  //                 border: 'none',
  //                 padding: '10px 20px',
  //                 borderRadius: '5px',
  //                 cursor: 'pointer'
  //               }}
  //             >
  //               Generate Seed Phrase
  //             </button>
  //           ) : (
  //             <>
  //               <button 
  //                 onClick={copySeedPhrase}
  //                 style={{
  //                   backgroundColor: isCopied ? '#74ccc9' : 'transparent',
  //                       border: '1px solid #74ccc9',
  //                   color: 'white',
  //                   padding: '5px 10px',
  //                   borderRadius: '5px',
  //                   cursor: 'pointer'
  //                  }}
  //               >
  //                 {isCopied ? 'Copied!' : 'Copy'}
  //               </button>
  //               <div 
  //                 style={{ 
  //                   display: 'flex', 
  //                   alignItems: 'center', 
  //                   justifyContent: 'center',
  //                   marginTop : "-30px"
  //                 }}
  //               >
  //                 <input 
  //                   type="checkbox" 
  //                   id="copyConfirm"
  //                   checked={hasAgreedToCopy}
  //                   onChange={() => setHasAgreedToCopy(!hasAgreedToCopy)}
  //                   style={{ 
  //                     marginRight: '10px', 
  //                     accentColor: '#74ccc9' 
  //                   }}
  //                 />
  //                 <label 
  //                   htmlFor="copyConfirm" 
  //                   style={{ 
  //                     color: isCopied ? '#74ccc9' : '#ff4654' 
  //                   }}
  //                 >
  //                   I have copied and securely stored my seed phrase
  //                 </label>
  //               </div>

  //               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
  //                 <button 
  //                   onClick={() => {toggleRegenerate(!regenerate)}}
  //                   style={{
  //                     backgroundColor: '#ff4654',
  //                     color: 'white',
  //                     border: 'none',
  //                     padding: '10px 20px',
  //                     borderRadius: '5px',
  //                     cursor: 'pointer'
  //                   }}
  //                 >
  //                   Regenerate
  //                 </button>
  //                 <button 
  //                   onClick={handleProceed}
  //                   style={{
  //                     backgroundColor: (hasAgreedToCopy && isCopied) ? '#74ccc9' : 'gray',
  //                     color: 'white',
  //                     border: 'none',
  //                     padding: '10px 20px',
  //                     borderRadius: '5px',
  //                     cursor: (hasAgreedToCopy && isCopied) ? 'pointer' : 'not-allowed'
  //                   }}
  //                   disabled={!(hasAgreedToCopy && isCopied)}
  //                 >
  //                   Proceed
  //                 </button>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       </>
  //     ) : (
  //       <div 
  //         style={{ 
  //           textAlign: 'center', 
  //           backgroundColor: 'rgba(0,0,0,0.3)', 
  //           padding: '20px', 
  //           borderRadius: '10px' 
  //         }}
  //       >
  //         <h3 style={{ color: '#74ccc9', marginBottom: '10px' }}>
  //           Seed Phrase Confirmed!
  //         </h3>
  //         <p>Your seed phrase has been successfully generated and verified.</p>
  //         <button 
  //           onClick={() => { setActiveMenu('wallet')}}
  //           style={{
  //             backgroundColor: '#74ccc9',
  //             color: 'black',
  //             border: 'none',
  //             padding: '10px 20px',
  //             borderRadius: '5px',
  //             marginTop: '15px',
  //             cursor: 'pointer'
  //           }}
  //         >
  //           Next Step
  //         </button>
  //       </div>
  //     )}
  //   </div>
  //   )
  // }

    const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(''));
    const [isValidSeed, setIsValidSeed] = useState<boolean>(true);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Handle paste event
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData('text');
      const words = pastedText.trim().toLowerCase().split(/\s+/);
      
      if (words.length === 12) {
        setSeedWords(words);
        
        // Automatically fill inputs
        words.forEach((word, index) => {
          if (inputRefs.current[index]) {
            inputRefs.current[index]!.value = word;
          }
        });
      }
    };

    const handleWordChange = (index: number, value: string) => {
      const newSeedWords = seedWords;
      newSeedWords[index] = value.trim().toLowerCase();
      setSeedWords(newSeedWords);
      // validateSeedPhrase(newSeedWords);
    };

    // const validateSeedPhrase = (words: string[]) => {
    //   const allWordsFilled = words.every(word => word.length > 0);
    //   const isValid = allWordsFilled && bip39.validateMnemonic(words.join(' '));
      
    //   setIsValidSeed(isValid);
    // };

    const handleImportSeedProceed = () => {
      if (isValidSeed) {
        console.log('Valid seed phrase. Importing wallet...');
      } else {
        alert('Please enter a valid 12-word seed phrase');
      }
    };

  const renderImportSeedPhrase = () => {
    return (
      <div 
        style={{ 
          backgroundColor: ' rgba(28, 73, 255, 0.1)', 
          borderRadius: '15px', 
          padding: '20px', 
          color: 'white',
          maxWidth: '930px',
          margin: '0 auto'
        }}
      >
        <h2 
          style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            color: '#74ccc9' 
          }}
        >
          Import Wallet
        </h2>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '10px', 
            marginBottom: '20px' ,
            backgroundColor : "rgba(0, 0, 0, 0.3)",
            padding : "20px" ,
            borderRadius : "20px" 
          }}
        >
          {seedWords.map((word, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              placeholder={`Word ${index + 1}`}
              value={word}
              onChange={(e) => handleWordChange(index, e.target.value)}
              onPaste={index === 0 ? handlePaste : undefined}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '10px',
                color: 'white',
                textAlign: 'center',
                width : "200px"
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={ () => {handleImportSeedProceed() , setActiveMenu('wallet')} }
            disabled={!isValidSeed}
            style={{
              backgroundColor: isValidSeed ? '#74ccc9' : 'gray',
              color: 'white',
              border: 'none',
              padding: '10px 10px',
              borderRadius: '5px',
              cursor: isValidSeed ? 'pointer' : 'not-allowed'
            }}
          >
            Import Wallet
          </button>
        </div>

        {!isValidSeed && seedWords.some(word => word.length > 0) && (
          <p 
            style={{ 
              color: '#ff4654', 
              textAlign: 'center', 
              marginTop: '10px' 
            }}
          >
            Invalid seed phrase. Please check your words.
          </p>
        )}
      </div>
    );
  };

  const renderWalletInterface = () => {
    const currentAccount = accounts[selectedAccount];

    return (
      <Flex style={{ height: '100%' }}>
        {/* Sidebar */}
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
          <h2 style={{ 
            color: 'white', 
            marginBottom: '20px',
            fontSize: '30px'
          }}>
            My Wallets
          </h2>

          {accounts.map((account, index) => (
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
                marginBottom: '10px',
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

        {/* Main Wallet Content */}
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

          {/* Transactions Section */}
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
            
            {/* Placeholder for transactions */}
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
        {activeMenu === 'import' && renderImportSeedPhrase()}
        {activeMenu === 'wallet' && renderWalletInterface()}
        <SendModal />
        <ReceiveModal />
        <SwapModal />
      </Flex>
    </div>
  );
}