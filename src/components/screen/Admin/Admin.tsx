import React, {useEffect, useState} from 'react';
import styles from './Admin.module.scss';
import {useActions} from "../../../hooks/useActions";
import {userService} from "../../../service/user/user.service";
import {getFilledTests} from "../../../utils/getFilledTests";
import {getAverageScore} from "../../../utils/getAverageScore";
import {getUserAverageScore} from "../../../utils/getUserAverageScore";
import {topicService} from "../../../service/topics/topics.service";
import {IStatUser, IUser} from "../../../types/userTypes";
import {ITopic} from "../../../types/topicTypes";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {getRoleComparison} from "../../../utils/getRoleComparison";

const Admin = () => {
    const [currentUsers, setCurrentUsers] = useState<IUser[]>([]);
    const [allTopics, setAllTopics] = useState<ITopic[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        getCurrentUsers();
        getAllTopics();
    }, []);

    const getCurrentUsers = async () => {
        if (user) {
            const { data: userData } = await userService.getAll();
            console.log(user, userData);
            setCurrentUsers(userData.filter((dataUser) => getRoleComparison(user.role, dataUser.role)));
        }
    };

    const getAllTopics = async () => {
        const { data: topicData } = await topicService.getAll();
        setAllTopics(topicData);
    };

    console.log(currentUsers);

    return (
        <div className={styles.adminContainer}>
            <h1>Админ панель</h1>
            <h2>Ваша роль:  <span className={styles.adminOrange}>{user?.role}</span></h2>
            <div className={styles.adminUsers}>
                {
                    currentUsers.map((user, index) => {
                        return (
                            <div className={styles.adminUser}>
                                <div className={styles.adminUserMainInfo}>
                                    <h1>Имя сотрудника: {user.name}</h1>
                                    <p>Роль сотрудника: {user.role}</p>
                                </div>
                                <div className={styles.adminUserStatistics}>
                                    <div
                                        className={styles.countContainer}
                                    >
                                        <h3>Количество пройденных тестов: {getFilledTests(getUserAverageScore(user, allTopics))}</h3>
                                    </div>
                                    <div
                                        className={styles.countContainer}
                                    >
                                        <h3>Средний балл: {getAverageScore(getUserAverageScore(user, allTopics)) ?? 'Не проходил'}</h3>
                                    </div>
                                </div>
                            </div>
                            );

                    })
                }
            </div>
        </div>
    );

};

export default Admin;