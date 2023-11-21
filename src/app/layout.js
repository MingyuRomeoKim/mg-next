import {Inter} from 'next/font/google'
import Main from '../components/Main';
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'mg-next App',
    description: 'next.js를 사용해서 간단한 토이프로젝트를 만들어보자!',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Main>{children}</Main>
        </body>
        </html>
    )
}
