import {Inter} from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import SideBar from '../components/SideBar/SideBar';
import layoutContainer from './layout-contianer.module.css';

import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'mg-next App',
    description: 'next.js를 사용해서 간단한 토이프로젝트를 만들어보자!',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className={layoutContainer.container}>
                    <aside className={layoutContainer.sideBar}>
                        <SideBar/>
                    </aside>
                    <header className={layoutContainer.header}>
                        <NavBar/>
                    </header>
                    <main className={layoutContainer.mainContent}>
                        {children}
                    </main>
                    <footer className={layoutContainer.footer}>
                        <Footer/>
                    </footer>
                </div>
            </body>
        </html>
    )
}
