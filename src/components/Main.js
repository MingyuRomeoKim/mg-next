"use client"
import React, { useState } from 'react';

import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import SideBar from '../components/SideBar/SideBar';
import layoutContainer from './main.module.css';

const Main = ({children}) => {
    const [showMobileSideBar, setShowMobileSideBar] = useState(false);

    return (
        <div className={layoutContainer.container}>
            <aside className={layoutContainer.sideBar}>
                <SideBar showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>
            </aside>
            <header className={layoutContainer.header}>
                <NavBar showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>
            </header>
            <main className={layoutContainer.mainContent}>
                {children}
            </main>
            <footer className={layoutContainer.footer}>
                <Footer/>
            </footer>
        </div>
    );
}

export default Main