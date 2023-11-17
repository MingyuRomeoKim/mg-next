'use client'

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import styles from './page.module.css';

const CategoryPage = () => {
    const pathname = decodeURI(usePathname());
    const params = useSearchParams();
    const [categoryLists, setCategoryLists] = useState(null);

    useEffect(() => {
        // 카테고리 JSON 파일을 불러온다.
        fetch(`/data/categories/${params.get('categoryId')}.json`)
            .then(response => response.json())
            .then(async data => {
                // 각 카테고리에 대한 추가적인 데이터를 불러온다.
                const updatedCategoryLists = await Promise.all(data.map(async categoryList => {
                    const response = await fetch(`/data/posts/${params.get('categoryId')}/${categoryList.id}.json`);
                    const postData = await response.json();
                    // 원문 글에서 데이터 파싱하기
                    const parser = new DOMParser();
                    const htmlDocument = parser.parseFromString(postData.content, "text/html");
                    const summaryParagraph = htmlDocument.querySelectorAll("p")[0].textContent + "...";
                    return {...categoryList, description: summaryParagraph};
                }));

                setCategoryLists(updatedCategoryLists);
            })
            .catch(error => console.error('Error loading category lists:', error));
    }, [params]);

    if (!categoryLists) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.head}>여기는 {pathname.split("/").pop()} 카테고리 페이지입니다.</div>
            <div className={styles.container}>
                {Object.entries(categoryLists).map(([key, categoryList]) => (
                    <Link href={categoryList.postUrl} target={'_blank'}>
                        <div className={styles.list}>
                            <div className={styles.listHead}>
                                {categoryList.title}
                            </div>
                            <div className={styles.listContent}>
                                {categoryList.description}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CategoryPage;
