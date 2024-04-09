import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProfileSettings.module.scss';
import { IUser } from '../../../../types/userTypes';
import { userService } from '../../../../service/user/user.service';
import { useAuth } from '../../../../hooks/useAuth';
import { MyToast } from '../../../ui/MyToast/MyToast';

const ProfileSettings = () => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const { pathname } = useLocation();
  const [userPassword, setUserPassword] = useState('');
  const { user } = useAuth();
  console.log(user.id);
  const getCurrentUsers = async () => {
    if (user) {
      const { data: userData } = await userService.getById(user.id);
      setCurrentUser(userData);
      setUserEmail(userData.email);
      setUserName(userData.name);
      setUserPassword(userData.password);
    }
  };

  const updateUser = () => {
    if (currentUser) {
      userService.updateUser(currentUser.id, userEmail, userPassword, userName);
      MyToast('Обновление прошло успешно', true);
    }
  };

  useEffect(() => {
    getCurrentUsers();
  }, []);

  return (
    <div className={styles.profileSettings}>
      <div className={styles.containerImg}>
        <img
          className={styles.img}
          width={290}
          height={290}
          src='../../../../assets/img/author-img.png'
          alt="Фото пользователя."
        />
        <h2
          className={styles.title}
        >
          {currentUser?.name || ''}
        </h2>
        <h3
            className={styles.role}
        >
          Роль: <span>{currentUser?.role || 'Не определена'}</span>
        </h3>
        <div className={styles.containerLink}>
          <Link
            className={cn(styles.link, styles.settings, {
              [styles.currentActiveSettings]: pathname === '/profile/settings',
            })}
            to="/profile/settings"
          >
            <span>Настройки профиля</span>
          </Link>
          <Link
            className={cn(styles.link, styles.statistics, {
              [styles.currentActiveStatistics]: pathname === '/profile/statistics',
            })}
            to="/profile/statistics"
          >
            <span>Статистика</span>
          </Link>
        </div>
      </div>
      <div
        className={styles.userSettings}
        style={{ overflow: 'hidden' }}
      >
        <div className={styles.containerField}>
          <span>Имя</span>
          <input className={styles.field} onChange={(e) => setUserName(e.target.value)} value={userName} />
        </div>
        <div className={styles.containerField}>
          <span>E-mail</span>
          <input className={styles.field} onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
        </div>
        <div className={styles.containerField}>
          <span>Пароль</span>
          <input className={styles.field} onChange={(e) => setUserPassword(e.target.value)} value={userPassword} type="password" />
        </div>
        <button className={styles.btn} color="Pink" onClick={() => updateUser()}>Сохранить</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
