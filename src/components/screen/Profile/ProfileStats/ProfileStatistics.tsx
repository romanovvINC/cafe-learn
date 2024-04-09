import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAuth } from '../../../../hooks/useAuth';
import { ITopic } from '../../../../types/topicTypes';
import {IStatUser, IUser, role} from '../../../../types/userTypes';
import { getFilledTests } from '../../../../utils/getFilledTests';
import styles from './ProfileStatistics.module.scss';
import { topicService } from '../../../../service/topics/topics.service';
import { userService } from '../../../../service/user/user.service';
import { getUserAverageScore } from '../../../../utils/getUserAverageScore';
import { getAverageScore } from '../../../../utils/getAverageScore';
import {useActions} from "../../../../hooks/useActions";
import {MyToast} from "../../../ui/MyToast/MyToast";
import {IUserImproveSkills} from "../../../../store/auth/auth.interface";

const ProfileStatistics = () => {
  const [averageUserScores, setAverageUserScores] = useState<IStatUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [allTopics, setAllTopics] = useState<ITopic[]>([]);
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { improveSkills } = useActions();

  useEffect(() => {
    getCurrentUsers();
    getAllTopics();
  }, []);

  useEffect(() => {
    console.log(user);
    if (allTopics.length > 0 && currentUser) {
      setAverageUserScores(getUserAverageScore(currentUser, allTopics));
    } else {
      setAverageUserScores([])
    }
  }, [currentUser, allTopics]);

  const getCurrentUsers = async () => {
    if (user) {
      const { data: userData } = await userService.getById(user.id);
      setCurrentUser(userData);
    }
  };

  const getAllTopics = async () => {
    const { data: topicData } = await topicService.getAll();
    setAllTopics(topicData.filter((topic) => topic.role === user?.role));
    console.log(allTopics);
  };

  const handleImproveSkill = () => {
    if (user) {
      if (Number(getAverageScore(averageUserScores)) < 4.5) {
        MyToast('Средняя оценка должна быть от 4.5', false);
        return;
      }
      const rolesObjects = Object.values(role);
      const newRoleIndex = rolesObjects.indexOf(user.role) + 1;
      improveSkills({id: user.id, role: rolesObjects[newRoleIndex]} as IUserImproveSkills);
    }
  }

  return (
    <div className={styles.profileStatistics}>
      <div className={styles.containerImg}>
        <img
          className={styles.img}
          width={290}
          height={290}
          src={'../../../../assets/img/author-img.png'}
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
      <div className={styles.userStatistics}>
        <h2
          className={styles.title}
        >
          Баллы за тесты
        </h2>
        <div className={styles.statTableContainer}>
            {averageUserScores.map((statData, idx) => {
              return (
                    <div className={styles.statBar} key={idx}>
                        <div className={styles.barNumber}>
                          #
                          {idx + 1}
                        </div>
                      <div className={styles.barValue}
                      >
                        {`${statData.value}`}
                      </div>
                    </div>
                );
            })}
        </div>
        <div className={styles.containerStats}>
          <div
            className={styles.filledTests}
          >
            <h2>Количество пройденных тестов</h2>
            <h3>{averageUserScores.length > 0 && getFilledTests(averageUserScores)}</h3>
          </div>
          <div
            className={styles.averageScore}
          >
            <h2>Средний балл</h2>
            <h3>{averageUserScores.length > 0 && getAverageScore(averageUserScores)}</h3>
          </div>
        </div>
        <div className={styles.improveSkills}>
          {user?.role !== role.HR_MANAGER && <button onClick={handleImproveSkill}>Повысить квалификацию</button>}
        </div>
      </div>
    </div>
  );
};

export default ProfileStatistics;
