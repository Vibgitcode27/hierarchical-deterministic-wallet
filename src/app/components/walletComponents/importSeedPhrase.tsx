import { useState, useRef, useEffect } from "react";

interface RenderImportSeedPhraseProps {
  activeMenu: 'home' | 'import' | 'wallet' | 'generate';
  setActiveMenu: React.Dispatch<React.SetStateAction<'home' | 'import' | 'wallet' | 'generate'>>;
  setSeed: React.Dispatch<React.SetStateAction<string>>;
}

export default function RenderImportSeedPhrase({
  activeMenu,
  setActiveMenu,
  setSeed,
}: RenderImportSeedPhraseProps) {
  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(''));
  const [isValidSeed, setIsValidSeed] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Validate seed phrase when seedWords change
  useEffect(() => {
    // Check if all words are filled in
    const allWordsFilled = seedWords.every(word => word.trim().length > 0);
    setIsValidSeed(allWordsFilled);
  }, [seedWords]);
  
  // Handle paste event
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent default paste behavior
    const pastedText = event.clipboardData.getData('text');
    const words = pastedText.trim().toLowerCase().split(/\s+/);
    
    if (words.length === 12) {
      // Create a new array of words to ensure state update
      const newSeedWords = [...words];
      setSeedWords(newSeedWords);
      
      // Automatically fill inputs
      words.forEach((word, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = word;
        }
      });
    }
  };
  
  const handleWordChange = (index: number, value: string) => {
    // Create a new array to trigger state update
    const newSeedWords = [...seedWords];
    newSeedWords[index] = value.trim().toLowerCase();
    setSeedWords(newSeedWords);
  };
  
  const handleImportSeedProceed = () => {
    if (isValidSeed) {
      // Join the words with a single space to form the seed phrase
      const seedPhrase = seedWords.join(' ');
      setSeed(seedPhrase);
      setActiveMenu('wallet');
    } else {
      alert('Please enter a valid 12-word seed phrase');
    }
  };

  return (
    <div 
      style={{ 
        backgroundColor: 'rgba(28, 73, 255, 0.1)', 
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
          marginBottom: '20px',
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          padding: "20px",
          borderRadius: "20px" 
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
              width: "200px"
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleImportSeedProceed}
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
}