import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import MyToastContainer from '../components/ui/MyToast/MyToastContainer';
import AppRouter from '../router/AppRouter';

interface MainProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const MainProvider:FC<MainProviderProps> = ({ children }) => (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            {children}
            <MyToastContainer />
            <AppRouter />
        </QueryClientProvider>
    </BrowserRouter>
);

export default MainProvider;