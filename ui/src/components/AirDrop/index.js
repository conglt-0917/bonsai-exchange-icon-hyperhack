import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { airDropOxyIcon, isTxSuccess } from 'helpers';
import * as actions from 'store/actions';

export default function AirDrop() {
  const address = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const main = async () => {
      if (address) {
        const txHash = await airDropOxyIcon(address);

        if (await isTxSuccess(txHash)) {
          setVisible(true);
          // get balance oxy after airdrop
          dispatch(actions.getBalanceOxy(address));
        }
        // if not beginner
        else localStorage.setItem('noNeedTour', true);
      }
    };

    main();
  }, [address, dispatch]);

  const handleOk = () => {
    setVisible(false);
    dispatch(actions.updateTourStep(1));
  };

  return (
    <>
      <Modal
        visible={visible}
        footer={[
          <Button key='submit' type='primary' onClick={() => handleOk(false)}>
            OK
          </Button>,
        ]}
      >
        <div className='ant-modal-confirm-body'>
          <CheckCircleTwoTone twoToneColor='#52c41a' />
          <div className='ant-modal-confirm-content'>
            You have been given 3000 Oxygen to start the game !!!
          </div>
        </div>
      </Modal>
    </>
  );
}
