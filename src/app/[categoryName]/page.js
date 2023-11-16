'use client'

import React from 'react';
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import styles from './[subCategoryName]/page.module.css';

const CategoryPage = () => {
    const pathname = decodeURI(usePathname());
    const params = useSearchParams();
    const data = require('../../data/categories/' + params.get('categoryId') + '.json')
    return (
        <>
            <div className={styles.head}>여기는 {pathname.split("/").pop()} 카테고리 페이지입니다.</div>
            <div className={styles.container}>
                {Object.entries(data).map(([key, value]) => (
                    <div className={styles.list}>
                        <div className={styles.listHead}>
                            <Link href={value.postUrl} target={'_blank'}>${value.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategoryPage;
