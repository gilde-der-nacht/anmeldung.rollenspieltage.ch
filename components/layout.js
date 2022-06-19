import Header from '../components/header'
import Footer from '../components/footer'


export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="main-content content">
                {children}
            </main>
            <Footer />
        </>
    )
}
