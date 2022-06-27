import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { checkIdentification, useLocalStorage } from "../components/store";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isIdentified, setIsIdentified] = useState(false);
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  useEffect(() => {
    setIsIdentified(checkIdentification(name, email));
  }, [name, email]);

  if (!isIdentified) {
    return (
      <Layout>
        <h1>Is not identified</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
