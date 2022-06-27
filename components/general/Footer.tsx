import GildenLogo from "../logo/GildenLogo";
import SpieltageLogo from "../logo/SpieltageLogo";
import RollenspieltageLogo from "../logo/RollenspieltageLogo";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="site-switcher">
                <h1>Unser Netzwerk</h1>
                <div className="switcher">
                    <div className="logo">
                        <a href="https://gildedernacht.ch/">
                            <div className="network-name">
                                <h2>Gilde der Nacht</h2>
                                <h3>Luzerner Spielverein</h3>
                            </div>
                            <GildenLogo />
                        </a>
                    </div>
                    <div className="logo">
                        <a href="https://spieltage.ch/">
                            <div className="network-name">
                                <h2>Luzerner Spieltage</h2>
                                <h3>11. + 12. März 2023</h3>
                            </div>
                            <SpieltageLogo />
                        </a>
                    </div>
                    <div className="logo">
                        <a href="https://rollenspieltage.ch/">
                            <div className="network-name">
                                <h2>Luzerner Rollenspieltage</h2>
                                <h3>27. + 28. August 2022</h3>
                            </div>
                            <RollenspieltageLogo />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
