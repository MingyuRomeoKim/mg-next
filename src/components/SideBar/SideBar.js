"use client"
// components/SideBar/SideBar.js

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './SideBar.module.css';

const SideBar = () => {
    const [categoriesData, setCategoriesData] = useState(null);

    useEffect(() => {
        fetch('/data/categories.json', { next: { revalidate: 3600 } })
            .then(response => response.json())
            .then(data => setCategoriesData(data))
            .catch(error => console.error('Error loading categories:', error));
    }, []);

    if (!categoriesData) {
        return <div>Loading...</div>;
    }

    return (
        <nav className={styles.sideBar}>
            <ul className={styles.navList}>
                {categoriesData.categories.map((category) => (
                    <li key={category.id} className={category.label.includes('#') ? styles.navItemTopic : styles.navItem}>
                        {category.label.includes('#') ? (
                            <span >{category.label}</span>
                        ) : (
                            <Link href={`/${category.name}?categoryId=${category.id}`}>
                                {category.label}
                            </Link>
                        )}
                        {/* subCategories가 있을 경우, 중첩된 리스트를 렌더링. */}
                        {category.subCategories && (
                            <ul className={styles.subNavList}>
                                {category.subCategories.map((subCategory) => (
                                    <li key={subCategory.id} className={styles.subNavItem}>
                                        <Link href={`/${category.name}/${subCategory.name}?categoryId=${subCategory.id}`}>
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
