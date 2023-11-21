"use client"
// components/SideBar/SideBar.js

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import styles from './SideBar.module.css';


const SideBar = ({showMobileSideBar, setShowMobileSideBar}) => {
    const sideBarRef = useRef();
    const pathname = usePathname();
    const [categoriesData, setCategoriesData] = useState(null);

    useEffect(() => {
        fetch('/data/categories.json', { next: { revalidate: 3600 } })
            .then(response => response.json())
            .then(data => setCategoriesData(data))
            .catch(error => console.error('Error loading categories:', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setShowMobileSideBar(false);
            }
        };

        // 전체 페이지에 클릭 이벤트 리스너 추가
        document.addEventListener('click', handleClickOutside);

        // 클린업 함수
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMobileSideBar])

    useEffect(() => {
        console.log(pathname);
        setShowMobileSideBar(false);
    },[pathname])

    if (!categoriesData) {
        return <div>Loading...</div>;
    }

    return (
        <nav ref={sideBarRef} onClick={(e) => e.stopPropagation()} className={` ${showMobileSideBar ? styles.sideBarOpen :styles.sideBar}`}>
            <ul className={styles.navList}>
                {categoriesData.categories.map((category) => (
                    <li key={category.id} className={category.label.includes('#') ? styles.navItemTopic : styles.navItem}>
                        {category.label.includes('#') ? (
                            <span >{category.label}</span>
                        ) : (
                            <Link className={styles.linkItem} href={`/${category.name}?categoryId=${category.id}`}>
                                {category.label}
                            </Link>
                        )}
                        {/* subCategories가 있을 경우, 중첩된 리스트를 렌더링. */}
                        {category.subCategories && (
                            <ul className={styles.subNavList}>
                                {category.subCategories.map((subCategory) => (
                                    <li key={subCategory.id} className={styles.subNavItem}>
                                        <Link className={styles.linkItem} href={`/${category.name}/${subCategory.name}?categoryId=${subCategory.id}`}>
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
