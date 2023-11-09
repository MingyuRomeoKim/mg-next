// components/SideBar/SideBar.js

import React from 'react';
import styles from './SideBar.module.css';

const SideBar = () => {
    return (
        <nav className={styles.sideBar}>
            {/* 여기에 사이드바 내용을 추가하세요. 예를 들어, 메뉴 항목 등 */}
            <ul className={styles.navList}>
                <li className={styles.navItem}>Home</li>
                <li className={styles.navItem}>About</li>
                <li className={styles.navItem}>Services</li>
                <li className={styles.navItem}>Contact</li>
            </ul>
        </nav>
    );
};

export default SideBar;
