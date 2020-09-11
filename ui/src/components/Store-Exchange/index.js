import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PLANT_STATUS } from 'constant';
import Item from 'components/Item';
import { transferOxytoBuyBonsai } from 'helpers';
import * as actions from 'store/actions';

import './style.css';

function Store({ onClose }) {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plants);

  const [plantsForSale, setPlantsForSale] = useState(
    plants.filter((item) => item.plantStatus === PLANT_STATUS.INSTORE)
  );

  useEffect(() => {
    setPlantsForSale(plants.filter((item) => item.plantStatus === PLANT_STATUS.INSTORE));
  }, [plants]);

  const address = useSelector((state) => state.walletAddress);

  const handleBuyPlant = (item) => {
    transferOxytoBuyBonsai(address, item);
    dispatch(actions.setFirstPlant(item.index));
    onClose();
  };

  return (
    <div>
      {plantsForSale.length !== 0 ? (
        <Row gutter={[20, 20]} className='overflow bgc-smoke'>
          {plantsForSale.map((item, index) => {
            return (
              <Item
                key={index}
                onBuyPlant={() => handleBuyPlant(item)}
                item={item}
                unit={'Oxygen'}
              />
            );
          })}
        </Row>
      ) : (
        <div>
          <div className='collection align-center'>
            <strong>No plant in the store</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
