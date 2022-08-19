import { GildenLogo } from "@layout/logos/GildenLogo";
import { SpieltageLogo } from "@layout/logos/SpieltageLogo";
import { RollenspieltageLogo } from "@layout/logos/RollenspieltageLogo";
import { Component } from "solid-js";

export const Footer: Component = () => {
  return (
    <>
      <footer class="footer">
        <div class="site-switcher">
          <h1>Unser Netzwerk</h1>
          <div class="switcher">
            <div class="logo">
              <a href="https://gildedernacht.ch/">
                <div class="network-name">
                  <h2>Gilde der Nacht</h2>
                  <h3>Luzerner Spielverein</h3>
                </div>
                <GildenLogo />
              </a>
            </div>
            <div class="logo">
              <a href="https://spieltage.ch/">
                <div class="network-name">
                  <h2>Luzerner Spieltage</h2>
                  <h3>11. + 12. März 2023</h3>
                </div>
                <SpieltageLogo />
              </a>
            </div>
            <div class="logo">
              <a href="https://rollenspieltage.ch/">
                <div class="network-name">
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
  );
};
