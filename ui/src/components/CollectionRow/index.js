import React, { useState } from 'react';
import { Row, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import { transferBonsai } from 'helpers';
import { PLANT_STATUS } from 'constant';
import * as actions from 'store/actions';

export const CollectionRow = ({ onCloseCollection, item }) => {
  const dispatch = useDispatch();

  const address = useSelector((state) => state.walletAddress);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState(null);

  const handleTransfer = (bonsaiId) => {
    if (!input) {
      setShowInput(!showInput);
      return;
    }
    transferBonsai(address, input, bonsaiId);

    setShowInput(!showInput);
    setInput(null);
    onCloseCollection();
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleMovingPlant = (index) => {
    dispatch(actions.setFirstPlant(index));
    onCloseCollection();
  };

  return (
    <div>
      <Row className='bgc-w item'>
        <div className='plant-ava bgc-blue'>
          <img src={item.plantImg} className='plantImg' alt='' />
        </div>
        <div className='mg-top'>
          <strong>{item.name}</strong> <br />
        </div>
        <div className='colection-button'>
          {item.plantStatus === PLANT_STATUS.PLANTED ? (
            <Button type='primary' className='mgl-10' onClick={() => handleMovingPlant(item.index)}>
              <strong>Move</strong>
            </Button>
          ) : (
            <Button
              type='primary'
              className='mgl-10'
              // onClick={() => handleTakeOut(item.id)}
            >
              <strong>Plant</strong>
            </Button>
          )}

          <Button
            type='primary'
            className='mgl-10 align-center'
            onClick={() => handleTransfer(item.id)}
          >
            <strong>Transfer</strong>
          </Button>
        </div>
        {showInput ? (
          <Input
            className='mg-top-input'
            placeholder='Receiving address: hx...'
            onChange={handleInputChange}
            value={input}
          />
        ) : null}
      </Row>
    </div>
  );
};
