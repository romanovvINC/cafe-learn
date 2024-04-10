import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProfileSettings.module.scss';
import { IUser } from '../../../../types/userTypes';
import { userService } from '../../../../service/user/user.service';
import { useAuth } from '../../../../hooks/useAuth';
import { MyToast } from '../../../ui/MyToast/MyToast';

const userImage = require('../../../../assets/img/author-img.png');

const ProfileSettings = () => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const { pathname } = useLocation();
  const [userPassword, setUserPassword] = useState('');
  const { user } = useAuth();
  const [fileSrc, setFileSrc] = useState<string | ArrayBuffer | null>(userImage);
  const [bigFile, setBigFile] = useState<File>();

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

  const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    var target = event.target;

    if (!FileReader) {
      return;
    }

    if (!target.files?.length) {
      return;
    }

    var fileReader = new FileReader();
    fileReader.onload = function () {
      setFileSrc(fileReader.result);
    }

    fileReader.readAsDataURL(target.files[0]);
    setBigFile(target.files[0]);
  }

  useEffect(() => {
    getCurrentUsers();
  }, []);

  return (
    <div className={styles.profileSettings}>
      <div className={styles.containerImg}>
        <label className={styles.fileImage}>
          <input type="file" name="file" onChange={(event) => handleLoadFile(event)}  />
          <img className={styles.loadedImage} src={fileSrc as string}></img>
          <span className={styles.backgroundFileSpan}></span>
          <span className={styles.fileImage}></span>
        </label>
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
        <button className={styles.savgeBtn} onClick={() => updateUser()}>Сохранить</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
