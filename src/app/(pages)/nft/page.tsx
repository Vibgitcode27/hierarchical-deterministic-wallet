"use client";
import React, { useState } from 'react';
import { Flex, Image, Avatar } from 'antd';
import { WalletOutlined } from '@ant-design/icons';

// Assuming you'll replace these with your actual NFT images
import nft1 from "../../assets/nft1.avif";
import nft2 from "../../assets/nft2.jpg";
import nft3 from "../../assets/nft3.jpg";
import nft4 from "../../assets/nft4.jpg";
import nft5 from "../../assets/nft5.png";

export default function NFTShowcase() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const imageStyle = (index: number, isHovered: boolean): React.CSSProperties => ({
    width: "250px", 
    height: "200px", 
    objectFit: "cover",
    borderRadius: "15px",
    transform: isHovered 
      ? "scale(1.05) rotate(0deg) translateY(-10px)" : "scale(1) rotate(0deg) translateY(0px)",
    boxShadow: isHovered 
      ? "0 25px 35px rgba(0,0,0,0.4)" 
      : "0 15px 25px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    opacity: isHovered ? 1 : 0.9,
    filter: isHovered ? "brightness(110%)" : "brightness(100%)"
  });

  const nftCollections = [
    {
      name: "Orion Genesis Collection",
      description: "Exclusive first-edition NFTs from the Orion ecosystem",
      items: [
        { id: '1', image: nft1, price: "0.5 ETH" },
        { id: '2', image: nft2, price: "0.7 ETH" },
        { id: '3', image: nft3, price: "0.6 ETH" }
      ]
    },
    {
      name: "Digital Pioneers",
      description: "Commemorative NFTs for early Orion adopters",
      items: [
        { id: '4', image: nft4, price: "0.4 ETH" },
        { id: '5', image: nft5, price: "0.8 ETH" }
      ]
    }
  ];

  return (
    <div style={{ 
      height: "93vh", 
      borderRadius: "30px", 
      padding: "20px",
      overflowY: 'auto', 
      scrollbarWidth: 'none', 
      msOverflowStyle: 'none',
    }}>
      <Flex vertical>
        <h1 style={{ 
          color: "#f4f4f4", 
          fontSize: "20px", 
          marginBottom: "10px" 
        }}>
         # N F T &#160;&#160;S H O W C A S E
        </h1>
        <h1 style={{ 
          fontSize: "55px", 
          fontFamily: "sans-serif", 
          fontWeight: "600", 
          color: "white",
          marginBottom: "30px"
        }}>
          # Explore Orion NFTs
        </h1>

        {nftCollections.map((collection, collectionIndex) => (
          <Flex 
            key={collectionIndex} 
            vertical 
            style={{ marginBottom: "40px" }}
          >
            <Flex justify="space-between" align="center" style={{ marginBottom: "20px" }}>
              <Flex vertical>
                <h2 style={{ 
                  color: "white", 
                  fontSize: "30px", 
                  margin: 0 
                }}>
                  {collection.name}
                </h2>
                <p style={{ 
                  color: "#888", 
                  fontSize: "16px" 
                }}>
                  {collection.description}
                </p>
              </Flex>
              <button 
                className="outline red" 
                type="button"
                style={{ 
                  fontSize: "24px",
                  width: "230px",
                  padding: "10px",
                  backgroundColor: "rgba(28, 73, 255, 0.1)",
                  color: "#f4f4f4",
                  border: "1px solid #1c49ff",
                  borderRadius: "10px"
                }}
              >
                View Collection
              </button>
            </Flex>

            <Flex gap={20}>
              {collection.items.map((nft, index) => (
                <Flex
                  key={nft.id}
                  vertical
                  style={{
                    backgroundColor: "rgba(28, 73, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "15px",
                    width: "300px",
                    color: "white",
                    transition: "transform 0.3s ease",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    setHoveredImage(index);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    setHoveredImage(null);
                  }}
                >
                  <Image 
                    preview={false}
                    src={nft.image.src} 
                    style={{
                      ...imageStyle(index, hoveredImage === index),
                      width: "100%",
                      height: "250px",
                      objectFit: "cover"
                    }}
                  />
                  
                  <Flex 
                    justify="space-between" 
                    align="center" 
                    style={{ 
                      marginTop: "15px", 
                      width: "100%" 
                    }}
                  >
                    <Flex align="center" gap="middle">
                      <Avatar 
                        size={40} 
                        icon={<WalletOutlined />} 
                        style={{ backgroundColor: "#1c49ff" , width : "55px"}}
                      />
                      <Flex vertical>
                        <span style={{ 
                          color: 'white', 
                          fontWeight: 'bold', 
                          fontSize: "18px" 
                        }}>
                          Orion NFT #{nft.id}
                        </span>
                        <small style={{ 
                          color: '#888', 
                          fontSize: "14px" 
                        }}>
                          {nft.price}
                        </small>
                      </Flex>
                    </Flex>
                    
                    <button
                      style={{
                        all: "unset",
                        backgroundColor: "#1c49ff",
                        color: "white",
                        border: "none",
                        borderRadius: "20px",
                        padding: "8px 15px",
                        cursor: "pointer",
                        width: "152px",
                      }}
                    >
                      Buy Now
                    </button>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}