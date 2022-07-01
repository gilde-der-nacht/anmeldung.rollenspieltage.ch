import RollenspieltageLogo from "../logo/RollenspieltageLogo";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="header">
        <input type="checkbox" id="mobile-navigation" className="hidden" />
        <label
          htmlFor="mobile-navigation"
          className="toggle-mobile-navigation"
          data-toggle-mobile-navigation=""
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="bars-staggered"
            className="fa-bars-staggered open-menu-container"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path
                style={{ opacity: 0.4 }}
                fill="currentColor"
                d="M64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256z"
              ></path>
              <path
                fill="currentColor"
                d="M416 128H32C14.33 128 0 113.7 0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
              ></path>
            </g>
          </svg>
          <svg
            aria-hidden="true"
            focusable="false"
            className="fa-xmark close-menu-container"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            ></path>
          </svg>
        </label>
        <aside className="mobile-menu-container">
          <nav className="main-navigation" aria-label="main navigation">
            <ul>
              <li>
                <a href="https://rollenspieltage.ch/">Startseite</a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/neueinsteiger/">
                  für Neueinsteiger
                </a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/familien/">für Familien</a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/spielleiterinnen/">
                  für Spielleiter:innen
                </a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/veteranen/">
                  für Veteranen
                </a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/kontakt/">Kontakt</a>
              </li>
            </ul>
          </nav>
          <nav
            className="secondary-navigation"
            aria-label="secondary navigation"
          >
            <ul>
              <li>
                <a href="https://rollenspieltage.ch/chat/">Chat</a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/newsletter/">Newsletter</a>
              </li>
              <li>
                <a href="https://rollenspieltage.ch/verhaltenskodex/">
                  Verhaltenskodex
                </a>
              </li>
            </ul>
          </nav>
          <footer className="mobile-footer">
            <button className="button" data-toggle-theme="" aria-label="light">
              <span data-toggle-theme-to-light="" className="hidden">
                <svg
                  className="svg-inline--fa fa-sun-bright"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="sun-bright"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <g className="fa-duotone-group">
                    <path
                      className="fa-secondary"
                      fill="currentColor"
                      d="M108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97zM256 0C242.8 0 232 10.75 232 24v64C232 101.3 242.8 112 256 112s24-10.75 24-24v-64C280 10.75 269.3 0 256 0zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8z"
                    ></path>
                    <path
                      className="fa-primary"
                      fill="currentColor"
                      d="M256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span data-toggle-theme-to-dark="">
                <svg
                  className="svg-inline--fa fa-moon-stars"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="moon-stars"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <g className="fa-duotone-group">
                    <path
                      className="fa-secondary"
                      fill="currentColor"
                      d="M288 63.1l12.42 29.78c.6094 1.225 2.211 2.219 3.578 2.219s2.967-.9941 3.576-2.219l12.42-29.78l29.79-12.42C351 50.97 352 49.36 352 47.1c0-1.365-.9922-2.967-2.211-3.576l-29.79-12.42l-12.42-29.79c-.6094-1.227-2.209-2.217-3.576-2.217s-2.969 .9902-3.578 2.217l-12.42 29.79L258.2 44.42c-1.217 .6094-2.209 2.211-2.209 3.576c0 1.359 .9922 2.971 2.209 3.58L288 63.1zM507.6 216.9L448 192l-24.88-59.63C421.8 129.8 419 127.1 416 127.1s-5.75 1.75-7.125 4.375L384 192l-59.63 24.88C321.8 218.3 320 221 320 224s1.75 5.75 4.375 7.125L384 256l24.88 59.63C410.3 318.3 413 320 416 320s5.75-1.75 7.125-4.375L448 256l59.63-24.88C510.3 229.8 512 227 512 224S510.3 218.3 507.6 216.9z"
                    ></path>
                    <path
                      className="fa-primary"
                      fill="currentColor"
                      d="M332.3 426.4c-93.13 17.75-178.5-53.63-178.5-147.6c0-54.25 29-104 76-130.9c7.375-4.125 5.45-15.12-2.8-16.62C108.7 109.4 0 200 0 320c0 106 85.76 192 191.8 192c59.25 0 113.2-26.79 148.9-71.04C346.1 434.5 340.3 424.8 332.3 426.4z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </footer>
        </aside>
        <div className="site-name">
          <Link href="/">
            <a>
              <h1>Luzerner Rollenspieltage</h1>
              <h2>27. + 28. August 2022</h2>
            </a>
          </Link>
        </div>
        <div className="site-logo">
          <Link href="/">
            <a>
              <RollenspieltageLogo />
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
