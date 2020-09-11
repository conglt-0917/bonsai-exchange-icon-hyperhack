import { Col, Button, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTourStep } from 'store/actions';

import './style.css';

export default function Item({ item, onBuyPlant, unit }) {
  const dispatch = useDispatch();
  const balanceOxy = useSelector((state) => state.balanceOxy);

  useEffect(() => {
    if (item.index === 0)
      setTimeout(() => {
        dispatch(updateTourStep(2));
      }, 300);
  }, [item.index, dispatch]);

  const handleBuy = (price) => {
    // set up tour for first-use user
    dispatch(updateTourStep(100));

    // Check whether you have enough oxygen to buy plants.
    if (balanceOxy >= price) {
      onBuyPlant();
    } else {
      message.warning(
        `You don't have enough Oxygen to buy this bonsai. Please buy oxygen or wait for plants to generate oxygen`,
        1.5
      );
    }
  };

  return (
    <Col
      className={`gutter-row r-bot-10px r-top-10px ${item.index === 0 ? 'first-bonsai' : ''}`}
      span={8}
    >
      <div className='align-center'>
        <strong> {item.name} </strong>
      </div>

      <div className='bg-swapItem'>
        <img src={item.plantImg} className='h-140px pd-buy-bonsai w-100' alt='plant' />
      </div>

      <div>
        {/* <img src={oxyImg} className='oxy-img' alt='oxy' /> */}
        <Button className='w-100 r-bot-10px' type='primary' onClick={() => handleBuy(item.price)}>
          <strong className=''>
            {item.price} {unit}
          </strong>
        </Button>
      </div>
    </Col>
  );
}
