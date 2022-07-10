import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { IdentificationForm } from "../components/IdentificationForm";
import Layout from "../components/general/Layout";
import {
  checkIdentification,
  StoreData,
  useLocalStorage,
} from "../components/general/store";
import "../styles/global.css";
import { loadServerData } from "../components/general/server";
import { AlertBox } from "../components/general/AlertBox";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [isIdentified, setIsIdentified] = useState(true);
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [secret, setSecret] = useLocalStorage("secret", "");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    if (sec !== null && sec.length > 0) {
      setSecret(sec);
      loadServerData(sec)
        .then((data) => data.json())
        .then((data) => {
          const privateBody: StoreData = data["privateBody"];
          setName(privateBody.name);
          setEmail(privateBody.email);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error({ err });
          setIsLoading(false);
          setHasNetworkError(true);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsIdentified(checkIdentification(name, email));
  }, [name, email]);

  if (hasNetworkError) {
    return (
      <Layout>
        <AlertBox>
          <span>
            Leider ist ein Fehler aufgetreten. Lade die Seite neu. Sollte das
            Problem weiterhin bestehen,
            <a href="https://rollenspieltage.ch/kontakt/" target="_blank">
              bitten wir dich uns umgehend zu kontaktieren!
            </a>
          </span>
        </AlertBox>
      </Layout>
    );
  }

  if (!isIdentified) {
    return (
      <Layout>
        <>
          {isLoading && (
            <AlertBox>
              <span>Bitte warten...</span>
            </AlertBox>
          )}
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
            setName={setName}
            setEmail={setEmail}
            initial={true}
          />
        </>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        {isLoading && (
          <AlertBox>
            <span>Bitte warten...</span>
          </AlertBox>
        )}
        <Component {...pageProps} />
      </>
    </Layout>
  );
}

export default MyApp;
