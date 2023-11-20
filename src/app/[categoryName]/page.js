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
        // 중복된 categoryList.id를 추적하기 위한 Set
        const processedIds = new Set();

        // 카테고리 JSON 파일을 불러온다.
        fetch(`/data/categories/${params.get('categoryId')}.json`)
            .then(response => response.json())
            .then(async data => {
                // 각 카테고리에 대한 추가적인 데이터를 불러온다.
                const updatedCategoryLists = await Promise.all(data.map(async categoryList => {
                    // 이미 처리된 id는 건너뛴다.
                    if (processedIds.has(categoryList.id)) {
                        return null;
                    }
                    processedIds.add(categoryList.id);

                    const response = await fetch(`/data/posts/${params.get('categoryId')}/${categoryList.id}.json`);
                    const postData = await response.json();
                    // 원문 글에서 데이터 파싱하기
                    const parser = new DOMParser();
                    const htmlDocument = parser.parseFromString(postData.content, "text/html");
                    const paragraphs = htmlDocument.querySelectorAll("p");

                    let summaryParagraph = "";
                    for (let p of paragraphs) {
                        if (p.textContent.trim().length > 0) {
                            summaryParagraph = p.textContent + "...";
                            if (summaryParagraph.length >= 200) {
                                // 200글자가 넘으면 루프를 중단합니다.
                                break;
                            }
                        }
                    }

                    return {...categoryList, description: summaryParagraph};
                }));

                // null 값을 제거한 후 categoryLists를 업데이트합니다.
                setCategoryLists(updatedCategoryLists.filter(item => item !== null));
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
