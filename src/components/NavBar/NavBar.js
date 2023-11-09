import Link from 'next/link';
import styles from './NavBar.module.css'; // CSS 모듈을 사용하려면 먼저 생성해야 합니다.

const NavBar = () => {
    return (
        <nav className={styles.navBar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/">
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/about">
                        About
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/services">
                        Services
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
