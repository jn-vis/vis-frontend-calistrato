'use client';

import ProviderComponent from '@/presentation/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RecoilRoot } from 'recoil';

// export const metadata: Metadata = {
//     title: {
//         template: '%s | JOBSNOW - Seu buscador de currículo',
//         default: 'JOBSNOW - Seu buscador de currículo',
//     },
// };

const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <html lang="en">
                <body className={nunito.variable}>
                    <ProviderComponent>{children}</ProviderComponent>
                </body>
            </html>
        </QueryClientProvider>
    </RecoilRoot>
    );
}
