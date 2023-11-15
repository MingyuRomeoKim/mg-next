'use client'

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SubCategoryPage = () => {
    const pathname = decodeURI(usePathname());
    const params = useSearchParams();

    return(
        <>
            <div>여기는 {pathname} 서브카테고리 페이지입니다.</div>
            <div>여기는 {params.get('categoryId')} subCategoryId 페이지입니다.</div>
        </>
    );
};

export default SubCategoryPage;
