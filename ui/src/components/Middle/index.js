import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plant from 'components/Plant';

import shelfImg from 'images/shelf_side_rotate.png';
import lockImg from 'images/lock.png';
import plantHereImg from 'images/plant_here.png';
import './Middle.css';
import { transferPlantLocation, setFirstPlant } from 'store/actions';

function Middle() {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plants);
  const firstPlant = useSelector((state) => state.firstPlant);

  const handleTransferPlant = (index) => {
    dispatch(transferPlantLocation(index));
    dispatch(setFirstPlant(null));
  };

  const rowOfPlant = (plants) => {
    return (
      <div>
        <div className='row'>
          {plants.map((item, index) => {
            if (firstPlant !== null) {
              if (item.id === null) {
                return (
                  <img
                    className='plant-here'
                    onClick={() => handleTransferPlant(item.index)}
                    key={index}
                    src={plantHereImg}
                    alt='plant-here'
                  />
                );
              } else return <Plant key={index} plant={item} />;
            } else return <Plant key={index} plant={item} />;
          })}
        </div>
        <img className='shelf' src={shelfImg} alt='' />
      </div>
    );
  };

  return (
    <div className='plant-area'>
      <div className='lock'>
        <div className='row coming-soon' />
        <div className='lock-overlay'>
          <img className='lock-image' src={lockImg} alt='lock' />
          <p className='lock-text'>Comming soon</p>
        </div>
      </div>

      <img className='shelf' src={shelfImg} alt='' />

      <div>
        {rowOfPlant(plants.slice(0, 4))}
        {rowOfPlant(plants.slice(4, 8))}
        {rowOfPlant(plants.slice(8, 12))}
      </div>
    </div>
  );
}

export default Middle;
