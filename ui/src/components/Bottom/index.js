import React, { useState } from 'react';
import plantImg from 'images/icn_plantlist.png';
import bstImg from 'images/icn_shop.png';
import { Modal, Button } from 'antd';
import PlantCollection from '../PlantCollection';
import Store from '../Store-Exchange';

import './bottom.css';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';

function Bottom() {
  const dispatch = useDispatch();

  const [openModalPlant, setOpenModalPlant] = useState(false);
  const [openModalStore, setOpenModalStore] = useState(false);

  const handleOpen = () => {
    setOpenModalStore(!openModalStore);
    dispatch(actions.updateTourStep(100));
  };

  const handleOpenModalPlant = () => {
    setOpenModalPlant(!openModalPlant);
    dispatch(actions.updateTourStep(100));
    localStorage.setItem('noNeedTour', true);
  };

  return (
    <div>
      <div className='bot'>
        <Button className='plantLst bgc-w move-plant' onClick={() => handleOpenModalPlant()}>
          <img src={plantImg} alt='icon' />
        </Button>
        <Button className='bstLst bgc-w buy-bonsai' onClick={() => handleOpen()}>
          <img src={bstImg} alt='icon' />
        </Button>
      </div>
      <Modal
        title='Plant Collection'
        visible={openModalPlant}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setOpenModalPlant(!openModalPlant)}
      >
        <PlantCollection onClose={() => setOpenModalPlant(!openModalPlant)} />
      </Modal>

      <Modal
        title='Plant Shop'
        visible={openModalStore}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setOpenModalStore(!openModalStore)}
      >
        <Store onClose={() => setOpenModalStore(!openModalStore)} />
      </Modal>
    </div>
  );
}

export default Bottom;
