import { ComponentType } from 'react';
import MainPage from "../pages/MainPage";
import TopicsReactPage from "../pages/TopicsReact/TopicsReact";
import TopicReactPage from "../pages/TopicsReact/TopicReact/TopicReact";
import TopicTestPage from "../pages/TopicsReact/TopicTest/TopicTest";
import ProfileSettingsPage from "../pages/Profile/ProfileSettings";
import ProfileStatisticsPage from "../pages/Profile/ProfileStatistics";
import AdminPage from "../pages/Admin";

interface IRoute {
    path: string,
    Component: ComponentType
}

enum Routes {
    MAIN_ROUTE = '/',
    PAGE_404 = '*',
    PROFILE_SETTINGS_ROUTE = '/profile/settings',
    PROFILE_STATISTICS_ROUTE = '/profile/statistics',
    ADMIN = '/admin',
    TOPICS_REACT_ROUTE = '/topics/cafe',
    TOPIC_REACT_ROUTE = '/topics/cafe/:id',
    TOPIC_TEST_ROUTE = '/topics/test/:idTest',
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
    {
        path: Routes.PROFILE_SETTINGS_ROUTE,
        Component: ProfileSettingsPage,
    },
    {
        path: Routes.PROFILE_STATISTICS_ROUTE,
        Component: ProfileStatisticsPage,
    },
    {
        path: Routes.ADMIN,
        Component: AdminPage,
    },
    {
        path: Routes.TOPICS_REACT_ROUTE,
        Component: TopicsReactPage,
    },
    {
        path: Routes.TOPIC_REACT_ROUTE,
        Component: TopicReactPage,
    },
    {
        path: Routes.TOPIC_TEST_ROUTE,
        Component: TopicTestPage,
    },
];