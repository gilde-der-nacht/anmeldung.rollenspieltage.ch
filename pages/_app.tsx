import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { IdentificationForm } from "../components/general/IdentificationForm";
import Layout from "../components/general/layout";
import {
  checkIdentification,
  useLocalStorage,
} from "../components/general/store";
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
        <IdentificationForm
          name={name}
          email={email}
          setName={(name: string) => setName(name)}
          setEmail={(email: string) => setEmail(email)}
        />
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
