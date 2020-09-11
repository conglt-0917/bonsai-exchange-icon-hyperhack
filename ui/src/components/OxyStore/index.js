import React from 'react';
import { Row } from 'antd';
import { packageOxyForSale } from 'constant';
import { useSelector } from 'react-redux';
import OxyPackage from 'components/OxyPackage';
import { buyOxygenWithICX } from 'helpers';

export const BuyOxy = ({ onClose }) => {
  const address = useSelector((state) => state.walletAddress);

  const handleBuyOxy = (item) => {
    buyOxygenWithICX(address, item.oxy);
    onClose();
  };

  return (
    <div>
      {packageOxyForSale.length !== 0 ? (
        <Row gutter={[20, 20]} className='overflow bgc-smoke'>
          {packageOxyForSale.map((item, index) => {
            return (
              <OxyPackage
                key={index}
                onBuyPlant={() => handleBuyOxy(item)}
                item={item}
                unit='ICX'
              />
            );
          })}
        </Row>
      ) : (
        <div>
          <div className='collection align-center'>
            <strong>No package in the store</strong>
          </div>
        </div>
      )}
    </div>
  );
};
