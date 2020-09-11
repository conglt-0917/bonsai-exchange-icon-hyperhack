import { Col, Button } from 'antd';
import React from 'react';

export default function OxyPackage({ item, onBuyPlant, unit }) {
  return (
    <Col className='gutter-row r-bot-10px r-top-10px' span={8}>
      <div className='align-center'>
        <strong> {item.name} </strong>
      </div>

      <div className='bg-swapItem'>
        <img src={item.plantImg} className=' h-160px w-100 ' alt='' />
      </div>

      <div>
        <Button className='w-100 r-bot-10px' type='primary' onClick={onBuyPlant}>
          <strong className=''>
            {item.price} {unit}
          </strong>
        </Button>
      </div>
    </Col>
  );
}
