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
            <Logo />
            <div className={cn(styles.navBarList)}>
                {user && (
                    <div className={styles.userMenu}>
                        {
                            isAdmin ? adminMenuItems.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(styles.menuItem)}
                                    onClick={() => handleClickOption('admin-panel')}
                                >
                                    <p>{option.label}</p>
                                </div>)) : userMenuItems.map((option) => (
                                    <div
                                        key={option.value}
                                        className={cn(styles.menuItem)}
                                        onClick={() => handleClickOption('personal-area')}
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
