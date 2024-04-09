import React from 'react';
import styles from './Main.module.scss';
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
const Main = () => {
    const {user} = useAuth();
    return (
        <div className={styles.mainContainer}>
            {user ? <Link to='topics/cafe'>Перейти к курсу</Link> : <h1>Авторизуйтесь чтобы просмотреть курсы</h1>}
        </div>
        )
};

export default Main;