import ComponentsDashboardSales from '@/components/home/home-page-componente';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sales Admin',
};

const Home = () => {
    return <ComponentsDashboardSales />;
};

export default Home;
