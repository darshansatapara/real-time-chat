// Home.js

import React from 'react';
import AdSection from '../components/AdSection';
import ChatScreen from '../components/ChatScreen';
import ClubsInfo from '../components/ClubsInfo';
import Layout from '../common/Layout';

const Home = () => {
  return (
    <Layout >
      <div>
        <AdSection />
      </div>
      <div>
        <ChatScreen />
      </div>
      <div>
        <ClubsInfo />
      </div>
    </Layout>
  );
};

export default Home;
