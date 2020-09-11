import React, { useState, useEffect } from 'react';
import { PLANT_STATUS } from 'constant';
import { useSelector } from 'react-redux';
import './style.css';
import { CollectionRow } from 'components/CollectionRow';

function PlantCollection({ onClose }) {
  const plants = useSelector((state) => state.plants);
  const [plantForTransfer, setPlantForTransfer] = useState(
    plants.filter((item) => item.plantStatus === PLANT_STATUS.PLANTED)
  );

  useEffect(() => {
    setPlantForTransfer(plants.filter((item) => item.plantStatus === PLANT_STATUS.PLANTED));
  }, [plants]);

  if (plantForTransfer.length === 0) {
    return (
      <div>
        <div className='collection align-center'>
          <strong>No plant in the stock</strong>
        </div>
      </div>
    );
  } else {
    return (
      <div className='collection'>
        {plantForTransfer.map((item, index) => {
          return <CollectionRow key={index} onCloseCollection={onClose} item={item} />;
        })}
      </div>
    );
  }
}

export default PlantCollection;
