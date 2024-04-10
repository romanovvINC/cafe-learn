import { axiosPrivate } from '../../api/interceptors';
import {getUserUrl, getUsersUrl, getAllTopics } from '../../constants/serverPath';
import { IUser } from '../../types/userTypes';
import {ITopic} from "../../types/topicTypes";

const uuid = require('uuid');

export const userService = {

    async getAll() {
        const response = await axiosPrivate.get<IUser[]>(getUsersUrl());

        return response;
    },

    async getById(id: string) {
        const response = await axiosPrivate.get<IUser>(getUserUrl(id));

        return response;
    },

    async improveSkills(userId: string, role: string) {
        console.log(role);
        const allTopicsResponse = await axiosPrivate.get<ITopic[]>(getAllTopics());
        const filteredTopics = allTopicsResponse.data.filter((topic) => topic.role === role);
        const pointTests = filteredTopics.map((topic) => {
            return         {
                idUser: userId,
                idTest: topic.relatedQuestionsId,
                points: 0
            }
        })
        const response = await axiosPrivate.patch<IUser>(getUserUrl(userId), { role, pointTests });
        console.log(response.data);
        return response;
    },

    async updateUser(id: string, email: string, password: string, name: string) {
        const response = await axiosPrivate.patch<IUser>(getUserUrl(id), { email, password, name });

        return response;
    },
};
