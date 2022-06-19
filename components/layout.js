import Header from '../components/header'
import Footer from '../components/footer'
import Head from "next/head";
import Script from 'next/script'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Luzerner Rollenspieltage</title>
                <Script src="https://test.rollenspieltage.ch/icons/duotone.min.js"></Script>
                <Script src="https://test.rollenspieltage.ch/icons/fontawesome.min.js"></Script>
                <link
                    rel="preload"
                    as="font"
                    crossOrigin="anonymous"
                    href="https://test.rollenspieltage.ch/fonts/krona-one-normal-400.woff2"
                    type="font/woff2"
                />
                <link
                    rel="preload"
                    as="font"
                    crossOrigin="anonymous"
                    href="https://test.rollenspieltage.ch/fonts/dm-sans-normal-400.woff2"
                    type="font/woff2"
                />
                <link
                    rel="shortcut icon"
                    href="https://test.rollenspieltage.ch/favicon.ico"
                    type="image/x-icon"
                />
                <link
                    rel="stylesheet"
                    href="https://test.rollenspieltage.ch/style/style.css"
                />
            </Head>
            <Header />
            <main className="main-content content">
                {children}
            </main>
            <Footer />
        </>
    )
}
