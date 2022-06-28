import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { IdentificationForm } from "../components/IdentificationForm";
import Layout from "../components/general/Layout";
import {
  checkIdentification,
  useLocalStorage,
} from "../components/general/store";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isIdentified, setIsIdentified] = useState(true);
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");

  useEffect(() => {
    setIsIdentified(checkIdentification(name, email));
  }, [name, email]);

  if (!isIdentified) {
    return (
      <Layout>
        <>
          <h1>Anmeldung Luzerner Rollenspieltage 2022</h1>
          <p>
            Melde dich hier für die Rollenspieltage an, damit wir dir ein
            personalisiertes Programm zusenden können.
          </p>
          <p>
            Hast du Fragen oder tretten Probleme auf, dann nimm bitte mit uns
            <a href="https://rollenspieltage.ch/kontakt/">Kontakt</a> auf.
          </p>
          <h2>Kontaktdaten</h2>
          <IdentificationForm
            name={name}
            email={email}
            setName={(name: string) => setName(name)}
            setEmail={(email: string) => setEmail(email)}
            initial={true}
          />
        </>
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
