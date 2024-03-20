import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import HomeScreen from './src/screens/HomeScreen/homeScreen';

export default function Home() {
  
  return (
    <>
      <Layout>

        <HomeScreen />

      </Layout>
    </>
  );
}
