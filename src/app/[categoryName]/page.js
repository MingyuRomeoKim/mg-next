'use client'

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CategoryPage = (props) => {
    const pathname = decodeURI(usePathname());
    const params = useSearchParams();

    return(
        <>
            <div>여기는 {pathname} 카테고리 페이지입니다.</div>
            <div>여기는 {params.get('categoryId')} categoryId 페이지입니다.</div>
        </>
    );
};

export default CategoryPage;
