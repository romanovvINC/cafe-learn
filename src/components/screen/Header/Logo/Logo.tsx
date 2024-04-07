import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const logo = require('../../../../assets/img/logo.jpg');

const Logo = () => (
  <Link className={styles.logo} to="/">
    <picture>
      <source media="(min-width: 1440px)" srcSet={logo} />
      <img className={styles.logo} src={logo} alt="React Learn" />
    </picture>
  </Link>
);

export default Logo;
