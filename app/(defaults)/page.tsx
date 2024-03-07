import HomePage from '@/components/home/home-page-componente';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home',
};

const Home = () => {
    return <HomePage />;
};

export default Home;
