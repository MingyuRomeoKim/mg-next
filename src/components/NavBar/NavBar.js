"use client"

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css'; // CSS 모듈을 사용하려면 먼저 생성해야 한다.

const NavBar = ({showMobileSideBar, setShowMobileSideBar}) => {

    const toggleSideBar = () => {
        // SideBar의 토글 로직을 여기에 구현
        setShowMobileSideBar(true);
    };

    return (
        <nav className={styles.navBar}>
            <button className={styles.menuToggle} onClick={toggleSideBar}>
                메뉴 펼치기
            </button>
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
