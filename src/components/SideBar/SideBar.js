// components/SideBar/SideBar.js

import Link from 'next/link';
import React from 'react';
import styles from './SideBar.module.css';
import categoriesData from '../../data/categories.json'; // JSON 데이터를 import.

const SideBar = () => {
    return (
        <nav className={styles.sideBar}>
            <ul className={styles.navList}>
                {categoriesData.categories.map((category) => (
                    <li key={category.id} className={styles.navItem}>
                        {category.label.includes('#') ? (
                            <span>{category.label}</span>
                        ) : (
                            <Link href={`/${category.name}`}>
                                {category.label}
                            </Link>
                        )}
                        {/* subCategories가 있을 경우, 중첩된 리스트를 렌더링. */}
                        {category.subCategories && (
                            <ul className={styles.subNavList}>
                                {category.subCategories.map((subCategory) => (
                                    <li key={subCategory.id} className={styles.subNavItem}>
                                        <Link href={`/${category.name}/${subCategory.name}`}>
                                            {subCategory.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SideBar;
