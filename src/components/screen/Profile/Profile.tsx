import { FC } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import styles from './Profile.module.scss';
import ProfileStatistics from './ProfileStats/ProfileStatistics';
import ProfileSettings from './ProfileSettings/ProfileSettings';

interface ProfileProps {
  type: 'statistics' | 'settings'
}

const Profile:FC<ProfileProps> = ({ type }) => (
  <div className={styles.profile}>
    <ProfileHeader />
    <div className={styles.contentContainer}>
      {type === 'settings' && <ProfileSettings />}
      {type === 'statistics' && <ProfileStatistics />}
    </div>
  </div>
);

export default Profile;
