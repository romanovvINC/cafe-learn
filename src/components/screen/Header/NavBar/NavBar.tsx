import {FC, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './NavBar.module.scss';
import { useAuth } from '../../../../hooks/useAuth';
import { useActions } from '../../../../hooks/useActions';
import {role} from "../../../../types/userTypes";
import {useNavigate} from "react-router-dom";

interface INavBarProps {
    Auth: boolean
}

interface IMenuOptions {
    value: string,
    label: string
}

const userMenuItems: IMenuOptions[] = [{ label: 'Личный кабинет', value: 'personal-area' }, { label: 'Выход', value: 'exit' }];

const adminMenuItems: IMenuOptions[] = [{ label: 'Личный кабинет', value: 'personal-area' }, { label: 'Админ панель', value: 'admin-panel' }, { label: 'Выход', value: 'exit' }];

const NavBar:FC<INavBarProps> = ({ Auth }) => {
    const [navBarListVisible, setNavBarListVisible] = useState<boolean>(false);
    const [valueMySettings, setValueMySettings] = useState<IMenuOptions | undefined>();
    const [isAdmin, setIsAdmin]= useState<boolean>(false);
    const { logout, toggleModalAuth } = useActions();
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        toggleModalAuth({ isVisible: true });
        logout();
    }

    const handleClickOption = (option: string) => {
        if (option === 'personal-area') {
            navigate('/profile/settings');
        }
        if (option === 'admin-panel') {
            navigate('/manage/statistics');
        }
        if (option === 'exit') {
            logout();
        }
    };

    useEffect(() => {
        if (user && (user.role === role.INTERN || user.role === role.BARISTA)) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    }, [user]);

    return (
        <nav className={cn(styles.navBar)}>
            <div className={cn(styles.navBarList)}>
                {user && (
                    <div className={styles.userMenu}>
                        {
                            isAdmin ? adminMenuItems.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(styles.dropdownItem)}
                                    onClick={() => handleClickOption('admin-panel')}
                                />)) : userMenuItems.map((option) => (
                                    <div
                                        key={option.value}
                                        className={cn(styles.dropdownItem)}
                                        onClick={() => handleClickOption('personal-area')}
                                    >
                                    {option.label}
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
            <button
                className={cn(styles.navToggle, {
                    [styles.openBtn]: navBarListVisible === true,
                    [styles.closeBtn]: navBarListVisible === false,
                })}
                type="button"
                onClick={() => {
                    setNavBarListVisible(!navBarListVisible);
                }}
            >
                <span className={styles.visuallyHidden}>Открыть меню</span>
            </button>
        </nav>
    );
};

export default NavBar;
