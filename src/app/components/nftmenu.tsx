import React, { useState } from 'react';
import { Flex } from 'antd';

export default function NFTMenu({ 
  onMenuSelect 
}: { 
  onMenuSelect: (menu: 'showcase' | 'owned') => void 
}) {
  const [activeMenu, setActiveMenu] = useState<'showcase' | 'owned'>('showcase');

  const handleMenuClick = (menu: 'showcase' | 'owned') => {
    setActiveMenu(menu);
    onMenuSelect(menu);
  };

  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? '#f4f4f4' : '#888',
    fontSize: '24px',
    fontWeight: isActive ? '600' : '400',
    padding: '10px 20px',
    borderBottom: isActive ? '3px solid #ff4654' : 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase'
  });

  return (
    <Flex 
      justify="start" 
      align="center"
      style={{ 
        width: '100%', 
        marginBottom: '30px',
        backgroundColor: '#101821',
        borderRadius: '15px',
        padding: '10px 0'
      }}
    >
      <Flex gap={30}>
        <div 
          style={menuItemStyle(activeMenu === 'showcase')}
          onClick={() => handleMenuClick('showcase')}
        >
          Showcase
        </div>
        <div 
          style={menuItemStyle(activeMenu === 'owned')}
          onClick={() => handleMenuClick('owned')}
        >
          Owned
        </div>
      </Flex>
    </Flex>
  );
}