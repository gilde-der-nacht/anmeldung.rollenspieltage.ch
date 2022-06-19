import type { NextPage } from "next";
import Layout from "../components/layout";
import Head from "next/head";
import Script from 'next/script'
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    document?.querySelector("body")?.classList.add("rst");
  });
  return (
    <div>
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

      <Layout>
        <h1>Anmeldung</h1>
      </Layout>
    </div>
  );
};

export default Home;
