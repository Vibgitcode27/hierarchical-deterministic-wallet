"use client"

import { Flex , Image , Button , Avatar } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WalletOutlined } from '@ant-design/icons';
import guy1 from "../../assets/image-removebg-preview (2).png"
import guy2 from "../../assets/image-removebg-preview (1) (1).png"
import nft2 from "../../assets/nft2.jpg"
import nft3 from "../../assets/nft3.jpg"
import nft5 from "../../assets/nft5.png"
import coin1 from "../../assets/coin1.jpg"
import coin2 from "../../assets/coin2.jpg"
import coin3 from "../../assets/coin3.png"
import "../../styles/button.css"
import "../../styles/home.css"

export default function Home() {

  const navigate = useRouter();

    const [hoveredImage, setHoveredImage] = useState<number | null>(null);
    const [hoveredImage1, setHoveredImage1] = useState<number | null>(null);

    const imageStyle = (index : number, isHovered : boolean): React.CSSProperties => ({
      width: "250px", 
      height: "200px", 
      objectFit: "cover",
      borderRadius: "15px",
      transform: isHovered 
        ? "scale(1.05) rotate(0deg) translateY(-10px)" 
        : index === 0 
          ? "rotate(-10deg) translateX(10px) translateY(10px)"
          : index === 1
            ? "rotate(0deg)"
            : "rotate(10deg) translateX(-10px) translateY(10px)",
      boxShadow: isHovered 
        ? "0 25px 35px rgba(0,0,0,0.4)" 
        : "0 15px 25px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      opacity: isHovered ? 1 : 0.9,
      filter: isHovered ? "brightness(110%)" : "brightness(100%)"
    });

  const accountData = [
    {
      id: '1',
      serial: 1,
      avatar: 'https://api.dicebear.com/7.x/miniavars/svg?seed=Bitcoin',
      accountName: 'Bitcoin Wallet',
      accountHash: '0x1234...5678',
    },
    {
      id: '2',
      serial: 2,
      avatar: 'https://api.dicebear.com/7.x/miniavars/svg?seed=Ethereum',
      accountName: 'Ethereum Wallet',
      accountHash: '0x9876...5432',
    },
    {
      id: '3',
      serial: 3,
      avatar: 'https://api.dicebear.com/7.x/miniavars/svg?seed=USDC',
      accountName: 'USDC Wallet',
      accountHash: '0xABCD...EFGH',
 
    },{
      id: '4',
      serial: 4,
      avatar: 'https://api.dicebear.com/7.x/miniavars/svg?seed=USDC',
      accountName: 'XTZ Wallet',
      accountHash: '0xABCD...EFGH',
 
    }
  ];

 return(
    <div style={{ 
      height: "93vh", 
      borderRadius: "30px", 
      padding: "20px" 
    }}>
      <Flex gap={30} style={{ marginTop: "3px" }}>
        <Flex 
          align="center" 
          justify="space-between" 
          style={{ 
            color: "white", 
            backgroundColor: "#ff4654", 
            width: "70vw", 
            height: "42vh",
            padding: "20px",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Flex 
            vertical 
            style={{ 
              width: "65%", 
              height: "100%", 
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2
            }}
          >
            <Flex
              vertical 
              style={{ 
                backgroundColor: "#0000003e", 
                height: "400px", 
                width: "600px",
                borderRadius: "15px",
                padding : "10px",
                marginLeft : "-70px"
              }}
            >
              <h1>about</h1>
              <Flex style={{ width : "100%" , marginTop : "20px"}} align="center" justify="center" vertical>
                <h1 style={{ margin: 0, fontSize: "23px" , lineHeight : "35px" }}>Empower Your Digital </h1>
                <h1 style={{ margin: 0, fontSize: "23px" }}>Assets With </h1>
                <button style={{ width : "auto"}} type="button">
                      <span style={{ backgroundColor : "white" }}>
                        <span style={{ padding : "10px" , fontSize : "80px" , color : "black"}} className="thin-border-text">Orion</span>
                      </span>
                </button>
              </Flex>
            </Flex>
          </Flex>
          <Flex 
            gap={30} 
            style={{ 
              position: "absolute",
              right: "-5%",
              top: "-10%",
              width: "50%", 
              justifyContent: "center", 
              alignItems: "center",
              zIndex: 1
            }}
          >
            <Image 
              preview={false} 
              src={guy1.src} 
              style={{ 
                width: "220px", 
                height: "auto", 
                transform: "rotate(-5deg)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
              }}
            />
            <Image 
              preview={false} 
              src={guy2.src} 
              style={{ 
                width: "200px", 
                height: "auto", 
                transform: "rotate(4deg)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            />
          </Flex>
        </Flex>
        <Flex 
          vertical
          style={{ 
            color: "white", 
            backgroundColor: "#1f2023", 
            width: "30vw", 
            height: "42vh",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <h1 style={{ color: 'white', marginBottom: '20px' }}>ACCOUNTS</h1>
          
          <Flex vertical gap="middle"   style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
            {accountData.map((account) => (
              <Flex 
                key={account.id} 
                justify="space-between" 
                align="center"
                style={{
                  borderRadius: '10px'
                }}
              >
                <Flex align="center" gap="middle">
                  <Avatar
                    size={55} 
                    icon={<WalletOutlined />} 
                  />
                  <Flex vertical>
                    <span style={{ color: 'white', fontWeight: 'bold' , fontSize : "25px" , lineHeight : "45px" }}>
                      {account.accountName}
                    </span>
                    <small style={{ color: '#888' , fontSize : "19px" }}>
                      {account.accountHash}
                    </small>
                  </Flex>
                </Flex>

                {/* <Flex align="center" justify="center" style={{ height : "100%" }}>
                  <Button 
                    type="primary" 
                    icon={<SwapOutlined />} 
                    onClick={() => navigate.push(`/transactions/swap/${account.id}`)}
                    style={{ width: '100%' }}
                  >
                    Swap
                  </Button>
                </Flex> */}
                <Flex vertical align="center" justify="center" style={{ height : "100px"}}>
                  <Flex
                    style={{
                      borderRadius: "30px", 
                      border: "none",
                      backgroundColor: "#1c49ff",
                      color: "black",
                      paddingInline: "10px",
                      paddingBlock: "3px",
                      fontSize: "18px",
                      fontFamily: "sans-serif",
                      fontWeight: "600",
                      height : "30px",
                      cursor : "pointer"
                    }}>
                      INTERACT
                  </Flex>
                </Flex>
            </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical style={{ marginTop : "20px"}}>
        <h1 style={{ color : "#f4f4f4"}}>E s s e n t i a l s</h1>
        <h1 style={{ fontSize : "55px" , fontFamily : "sans-serif" , fontWeight :"600" , color : "white"}}># What Orion Brings to You</h1>
        
      <Flex gap={20} style={{ width: '100%' , marginTop : "20px"}}>
              <Flex 
                vertical
                align="center"
                justify="center"
                style={{
                  backgroundColor: "rgba(28, 73, 255, 0.1)", // Slightly transparent background
                  borderRadius: "15px",
                  padding: "20px",
                  width: "calc(90% - 20px)", // Make the card wider
                  marginLeft : "calc(5% - 20px)",
                  height: "330px", // Maintain height
                  color: "white",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  position: "relative", // Ensure proper positioning of absolute elements
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
              <Flex 
                style={{ 
                  position: "absolute",
                  top: "-45px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%", 
                  justifyContent: "center", 
                  alignItems: "center",
                  zIndex: 1,
                  gap: "20px"
                }}
              >
                {[nft5, nft2, nft3].map((coin, index) => (
                  <Image 
                    key={index}
                    preview={false} 
                    src={coin.src} 
                    onMouseEnter={() => setHoveredImage1(index)}
                    onMouseLeave={() => setHoveredImage1(null)}
                    style={imageStyle(index, hoveredImage1 === index)}
                  />
                ))}
              </Flex>
              <button className="outline red" type="button"
                style={{ 
                color: "blue",
                position: "absolute",
                bottom: "-15px",
                left: "25%",
                textAlign: "center",
                padding : "10px",
                width : "220px",
              }}
              >
                  <div className="label">
                      <span className="hover-effect"></span>
                      <span className="label-text" style={{ padding : "4px" , paddingLeft : "0px" , fontSize : "26px" , color : "#f4f4f4"}}>Orion NFT's</span>
                  </div>
              </button>
                <h2 style={{ 
                  fontSize: "16px", 
                  marginBottom: "15px",
                  position: "absolute",
                  bottom: "-10px",
                  left: "20px",
                  color : "gray"
                }}>
                  Comming Soon
                </h2>
              </Flex>
          {/* Card 2 */}
              <Flex 
                vertical
                align="center"
                style={{
                  backgroundColor: "rgba(28, 73, 255, 0.1)",
                  borderRadius: "15px",
                  padding: "20px",
                  width: "calc(90% - 20px)",
                  marginLeft: "calc(5% - 20px)",
                  height: "330px",
                  color: "white",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <h2 style={{ 
                  fontSize: "30px", 
                  marginBottom: "15px",
                  top: "20px",
                  left: "20px",
                  color : "white",
                  textDecoration : "uppercase"
                }}>
                  MANAGE YOUR WALLET
                </h2>
                <p style={{ 
                  fontSize: "16px",
                  lineHeight: "1.5",
                  textAlign: "center",
                  color : "#ff4654",
                  fontWeight : "600",
                  }}>
                  Import your existing wallet seamlessly, or create a new, secure wallet in just a few clicks. 
                  Recover access effortlessly with your seed phrase and manage all your accounts in one place.
                </p>
                <Flex>
                    <button className="outline red" type="button"
                      style={{ 
                      color: "blue",
                      position: "absolute",
                      bottom: "-15px",
                      left: "5%",
                      textAlign: "center",
                      padding : "10px",
                      width : "220px",
                    }}
                    >
                        <div className="label">
                            <span className="hover-effect"></span>
                            <span className="label-text" style={{ padding : "4px" , paddingLeft : "0px" , fontSize : "26px" , color : "#f4f4f4"}}>Generate Seed</span>
                        </div>
                    </button>
                    <button className="outline" type="button"
                      style={{ 
                      color: "#ff4654",
                      position: "absolute",
                      bottom: "-15px",
                      left: "53%",
                      textAlign: "center",
                      padding : "10px",
                      width : "220px",
                    }}
                    >
                        <div className="label">
                            <span className="hover-effect" style={{ backgroundColor : "blue"}}></span>
                            <span className="label-text" style={{ padding : "4px" , paddingLeft : "0px" , fontSize : "26px" , color : "#f4f4f4" }}>Import Seed</span>
                        </div>
                    </button>
                </Flex>
              </Flex>

              {/* Card 3 */}

              <Flex 
                  vertical
                  align="center"
                  justify="center"
                  style={{
                    backgroundColor: "rgba(28, 73, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(90% - 20px)",
                    marginLeft: "calc(5% - 20px)",
                    height: "330px",
                    color: "white",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    position: "relative",
                  }}
                >
                  <Flex 
                    style={{ 
                      position: "absolute",
                      top: "-45px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100%", 
                      justifyContent: "center", 
                      alignItems: "center",
                      zIndex: 1,
                      gap: "20px"
                    }}
                  >
                    {[coin1, coin2, coin3].map((coin, index) => (
                      <Image 
                        key={index}
                        preview={false} 
                        src={coin.src} 
                        onMouseEnter={() => setHoveredImage(index)}
                        onMouseLeave={() => setHoveredImage(null)}
                        style={imageStyle(index, hoveredImage === index)}
                      />
                    ))}
                  </Flex>
                  
                  {/* Rest of the existing component remains the same */}
                  <button 
                    className="outline red" 
                    type="button"
                    style={{ 
                      color: "blue",
                      position: "absolute",
                      bottom: "-45px",
                      left: "30%",
                      textAlign: "center",
                      padding: "10px",
                      width: "220px",
                    }}
                  >
                    <div className="label">
                      <span className="hover-effect"></span>
                      <span 
                        className="label-text" 
                        style={{ 
                          padding: "4px", 
                          paddingLeft: "0px", 
                          fontSize: "26px", 
                          color: "#f4f4f4"
                        }}
                      >
                        Start Minting
                      </span>
                    </div>
                  </button>
                  
                  <h2 
                    style={{ 
                      fontSize: "16px", 
                      marginBottom: "15px",
                      position: "absolute",
                      bottom: "80px",
                      left: "20px",
                      color: "white",
                    }}
                  >
                    Create and launch your own token effortlessly with Orion.
                  </h2>
                </Flex>
              </Flex>
      </Flex>
    </div>
 )   
}