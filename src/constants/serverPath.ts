export const API_URL = 'http://localhost:5000';

export const getLoginUrl = () => '/login';
export const getRegisterUrl = () => '/users';
export const getUsersUrl = () => '/users';
export const getUserUrl = (id: string) => `/users/${id}`;
export const getAllTopics = () => '/topicsOfStudy';
export const getByIdTopic = (id: string) => `/topicsOfStudy/${id}`;
export const getAllQuestions = () => `allTest`;
export const getByIdQuestions = (id: string) => `allTest/${id}`;
export const getAllTest = () => 'allTest';
