import { FC } from 'react';
import styles from './Header.module.scss';
import Logo from './Logo/Logo';
import NavBar from './NavBar/NavBar';


const Header:FC = () => (
  <header className={styles.Header}>
    <Logo />
    <NavBar />
  </header>
);

export default Header;
