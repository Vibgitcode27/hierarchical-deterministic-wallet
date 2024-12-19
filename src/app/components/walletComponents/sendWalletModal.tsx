import {  ChevronDown , X } from 'lucide-react';
import ethLogo from "../../assets/ethereum-6903901_1280.png";
import solLogo from "../../assets/solana-sol-icon.png";
import { useState , useRef , useEffect } from 'react';

interface SendModalProps {
    activeModal: 'send' | 'receive' | 'swap' | null;
    setActiveModal: React.Dispatch<React.SetStateAction<'send' | 'receive' | 'swap' | null>>;
}


export default function SendModal({
    activeModal,
    setActiveModal,
  }: SendModalProps){

    const [sendAmount, setSendAmount] = useState('');
    const [receiveAddress, setReceiveAddress] = useState('');
    const [selectedBlockchain, setSelectedBlockchain] = useState<Option | null>(null);

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
                  style={{ all: 'unset' , color : 'white' , backgroundColor : 'rgba(186, 18, 18, 0.3)' , borderRadius : "50%" , padding : "5px" }}
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

    return (
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
}