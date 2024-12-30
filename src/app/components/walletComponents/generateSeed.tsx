import { useState , useEffect } from "react"
import { setSeedPhraseInSession } from "@/lib/features/wallet/walletSlice";
import { generateSeedPhrase } from "../helpers/helperFunctions";

interface RenderGenerateSeedPhraseProps {
    activeMenu: 'home' | 'import' | 'wallet' | 'generate';
    setActiveMenu: React.Dispatch<React.SetStateAction<'home' | 'import' | 'wallet' | 'generate'>>;
    setSeed: React.Dispatch<string>;
}
  
  export default function RenderGenerateSeedPhrase({
    activeMenu,
    setActiveMenu,
    setSeed,
  }: RenderGenerateSeedPhraseProps) {
    const [seedPhrase, setSeedPhrase] = useState<string>('venture lottery motor spell gloom venue cruel escape jump banner shell debris');
    const [regenerate , toggleRegenerate] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [hasAgreedToCopy, setHasAgreedToCopy] = useState<boolean>(false);
  
    useEffect(() => {
        if (activeMenu === 'generate') {
          let seed = generateSeedPhrase();
          setSeedPhrase(seed);
        }
      }, [activeMenu , regenerate]);

    const copySeedPhrase = () => {
      navigator.clipboard.writeText(seedPhrase);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };
  
    const handleProceed = () => {
      if (hasAgreedToCopy && isCopied) {
        setIsConfirmed(true);
      } else {
        alert('Please copy the seed phrase and confirm that you have copied it.');
      }
    };

    const handleStoreLocally = () => {
      localStorage.setItem('mnemonic', seedPhrase);
    }
    return (
    <>
    <div 
      style={{ 
        backgroundColor: 'rgba(28, 73, 255, 0.1)', 
        borderRadius: '15px', 
        padding: '10px', 
        color: 'white',
        width:'900px',
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
        Generate Seed Phrase
      </h2>

      {!isConfirmed ? (
        <>
          {seedPhrase ? (
            <div 
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.3)', 
                borderRadius: '10px', 
                padding: '15px', 
                marginBottom: '20px',
                position: 'relative'
              }}
            >
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '10px' 
                }}
              >
                {seedPhrase.split(' ').map((word, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      padding: '10px', 
                      borderRadius: '5px', 
                      textAlign: 'center' 
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div style={{ textAlign: 'center', marginBottom: '-20px' }}>
            {!seedPhrase ? (
              <button 
                // onClick={generateSeedPhrase}
                style={{
                  backgroundColor: '#74ccc9',
                  color: 'black',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Generate Seed Phrase
              </button>
            ) : (
              <>
                <button 
                  onClick={copySeedPhrase}
                  style={{
                    backgroundColor: isCopied ? '#74ccc9' : 'transparent',
                        border: '1px solid #74ccc9',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                   }}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop : "-30px"
                  }}
                >
                  <input 
                    type="checkbox" 
                    id="copyConfirm"
                    checked={hasAgreedToCopy}
                    onChange={() => setHasAgreedToCopy(!hasAgreedToCopy)}
                    style={{ 
                      marginRight: '10px', 
                      accentColor: '#74ccc9' 
                    }}
                  />
                  <label 
                    htmlFor="copyConfirm" 
                    style={{ 
                      color: isCopied ? '#74ccc9' : '#ff4654' 
                    }}
                  >
                    I have copied and securely stored my seed phrase
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <button 
                    onClick={() => {toggleRegenerate(!regenerate)}}
                    style={{
                      backgroundColor: '#ff4654',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Regenerate
                  </button>
                  <button 
                    onClick={handleProceed}
                    style={{
                      backgroundColor: (hasAgreedToCopy && isCopied) ? '#74ccc9' : 'gray',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: (hasAgreedToCopy && isCopied) ? 'pointer' : 'not-allowed'
                    }}
                    disabled={!(hasAgreedToCopy && isCopied)}
                  >
                    Proceed
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div 
          style={{ 
            textAlign: 'center', 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            padding: '20px', 
            borderRadius: '10px' 
          }}
        >
          <h3 style={{ color: '#74ccc9', marginBottom: '10px' }}>
            Seed Phrase Confirmed!
          </h3>
          <p>Your seed phrase has been successfully generated and verified.</p>
          <button 
            onClick={() => { setActiveMenu('wallet') ,setSeed(seedPhrase) , handleStoreLocally() , setSeedPhraseInSession(seedPhrase)}}
            style={{
              backgroundColor: '#74ccc9',
              color: 'black',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              marginTop: '15px',
              cursor: 'pointer'
            }}
          >
            Next Step
          </button>
        </div>
      )}
    </div>
    </>
    )
  }