import {FC, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './NavBar.module.scss';
import { useAuth } from '../../../../hooks/useAuth';
import { useActions } from '../../../../hooks/useActions';
import {role} from "../../../../types/userTypes";
import {useNavigate} from "react-router-dom";
import Logo from "../Logo/Logo";

interface INavBarProps {
    Auth: boolean
}

interface IMenuOptions {
    value: string,
    label: string
}

const userMenuItems: IMenuOptions[] = [{ label: 'Личный кабинет', value: 'personal-area' }];

const adminMenuItems: IMenuOptions[] = [{ label: 'Личный кабинет', value: 'personal-area' }, { label: 'Админ панель', value: 'admin-panel' }];

const NavBar:FC<INavBarProps> = ({ Auth }) => {
    const { logout, toggleModalAuth } = useActions();
    const { user, isLoading } = useAuth();
    const [isAdmin, setIsAdmin]= useState<boolean>((user?.role === role.INTERN || user?.role === role.BARISTA));
    const navigate = useNavigate();

    const handleLogout = () => {
        toggleModalAuth({ isVisible: true });
        navigate('/');
        logout();
    }

    const handleClickOption = (option: string) => {
        if (option === 'personal-area') {
            navigate('/profile/settings');
        }
        if (option === 'admin-panel') {
            navigate('/admin');
        }
        if (option === 'exit') {
            handleLogout();
        }
    };

    useEffect(() => {
        if (user && (user.role === role.INTERN || user.role === role.BARISTA)) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
        console.log(user)
    }, [setIsAdmin, user]);

    return (
        <nav className={cn(styles.navBar)}>
            <Logo />
            <div className={cn(styles.navBarList)}>
                {user && (
                    <div className={styles.userMenu}>
                        {
                            isAdmin && user ? adminMenuItems.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(styles.menuItem)}
                                    onClick={() => handleClickOption(option.value)}
                                >
                                    <p>{option.label}</p>
                                </div>)) : userMenuItems.map((option) => (
                                    <div
                                        key={option.value}
                                        className={cn(styles.menuItem)}
                                        onClick={() => handleClickOption(option.value)}
                                    ><p>{option.label}</p>

                                </div>))
                        }
                    </div>
                )}
                {isLoading === false && !user
                    && (
                        <div className={styles.authorizationLink} onClick={() => toggleModalAuth({ isVisible: true })}>
                            Войти
                        </div>
                    )}
                {
                    isLoading === false && user
                    && (
                        <div className={styles.authorizationLink} onClick={
                            () => handleLogout()
                        }>
                            Выйти
                        </div>
                    )
                }
            </div>
        </nav>
    );
};

export default NavBar;
