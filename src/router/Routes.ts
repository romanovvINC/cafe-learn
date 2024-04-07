import { ComponentType } from 'react';
import MainPage from "../pages/MainPage";

interface IRoute {
    path: string,
    Component: ComponentType
}

enum Routes {
    MAIN_ROUTE = '/',
    PAGE_404 = '*'
}

export const publicRoutes: IRoute[] = [
    {
        path: Routes.MAIN_ROUTE,
        Component: MainPage,
    },
];

export const authRoutes: IRoute[] = [
    {
        path: Routes.MAIN_ROUTE,
        Component: MainPage,
    },
];