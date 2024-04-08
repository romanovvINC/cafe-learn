import { ComponentType } from 'react';
import MainPage from "../pages/MainPage";
import TopicsReactPage from "../pages/TopicsReact/TopicsReact";
import TopicReactPage from "../pages/TopicsReact/TopicReact/TopicReact";
import TopicTestPage from "../pages/TopicsReact/TopicTest/TopicTest";

interface IRoute {
    path: string,
    Component: ComponentType
}

enum Routes {
    MAIN_ROUTE = '/',
    PAGE_404 = '*',
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