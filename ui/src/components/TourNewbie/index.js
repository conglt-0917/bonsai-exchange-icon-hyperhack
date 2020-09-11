import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { isNewbie } from 'helpers';

import './index.css';

export default function TourNewbie() {
  const address = useSelector((state) => state.walletAddress);
  const tourStep = useSelector((state) => state.tourStep);

  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    const main = async () => {
      if (address === null) {
        setIsTourOpen(true);
      } else {
        const newbie = await isNewbie(address);
        if (!newbie) setIsTourOpen(false);
      }
    };

    main();
  }, [address]);

  useEffect(() => {
    const main = async () => {
      if (tourStep === 100) {
        setIsTourOpen(false);
      } else setIsTourOpen(true);
    };

    main();
  }, [tourStep]);

  const steps = [
    {
      selector: '.connect-wallet',
      content: ({ goTo }) => (
        <div>
          {/* if tourStep === 100 close tour */}
          {tourStep === 0 ? 'Connect your wallet to app' : tourStep === 1 ? goTo(1) : <></>}
        </div>
      ),
    },
    {
      selector: '.connect-wallet',
      content: 'We give you 3000 oxygen to get you started',
    },
    {
      selector: '.buy-bonsai',
      content: ({ goTo }) => (
        <div>
          {/* if tourStep === 100 close tour */}
          {tourStep === 2 ? goTo(3) : `Let's buy a bonsai`}
        </div>
      ),
    },
    {
      selector: '.first-bonsai',
      content: ({ goTo }) => (
        <div>{tourStep === 3 ? goTo(4) : `Buy it and choose a position on the shelf to place`}</div>
      ),
    },
    {
      selector: '.on-shelf',
      content: `Each bonsai will generate 1 Oxygen every 30 seconds`,
    },
    {
      selector: '.buy-oxy',
      content: `You can buy more oxygen with ICX here`,
    },
    {
      selector: '.move-plant',
      content: `You can transfer bonsai to others or change bonsai location on the shelf here`,
    },
  ];

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => {
    enableBodyScroll(target);
    localStorage.setItem('noNeedTour', true);
  };

  return (
    <>
      {/* Tour instructions for beginners */}
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        maskClassName='mask'
        className='helper'
        accentColor='#5cb7b7'
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
      />
    </>
  );
}
