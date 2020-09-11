import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Spin } from 'antd';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Middle from './components/Middle';
import TourNewbie from 'components/TourNewbie';

import './App.css';

const { Header, Footer, Content } = Layout;

function App() {
  const loading = useSelector((state) => state.loading);
  return (
    <Layout className='App bg'>
      {/* UI */}

      {/* Tour tutorial for fisrt user */}
      {localStorage.getItem('noNeedTour') ? <></> : <TourNewbie />}

      <Spin spinning={loading} size='large' tip='Loading...'></Spin>
      <Header className='bgc-w h-50px p-10px r-bot-10px'>
        <Top />
      </Header>
      <Content className='p-10px'>
        <Middle />
      </Content>
      <Footer className='h-50px p-10px m-10px r-top-10px'>
        <Bottom />
      </Footer>
    </Layout>
  );
}

export default App;
