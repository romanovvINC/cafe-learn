import { FC } from 'react';
import cn from 'classnames';
import styles from './NavBar.module.scss';
import React from 'react';

const NavBar:FC = () => {
    return (
        <nav className={cn(styles.navBar)}>
            <div className={cn(styles.navBarListDesktop)}>
               Войти
            </div>
            <button
            >
                <span className={styles.visuallyHidden}>Открыть меню</span>
            </button>
        </nav>
    );
};

export default NavBar;