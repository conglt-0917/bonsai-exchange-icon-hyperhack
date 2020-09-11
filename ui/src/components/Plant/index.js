import React from 'react';
import testPot from 'images/pot_empty.png';
import { PLANT_STATUS } from 'constant';
import './Plant.css';
import Bubbles from 'components/Animation/Bubbles';

export default function Plant({ plant }) {
  return (
    <div className='flexalign'>
      {!!plant && plant.plantStatus === PLANT_STATUS.PLANTED ? (
        <div className={`plant ${plant.id ? 'on-shelf' : ''}`}>
          <div className='stem'>
            <img src={plant.plantImg} alt='' className='plantImg' />
            <Bubbles />
          </div>
          <div className='pot'>
            <img src={testPot} alt='' className='potImg' />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
