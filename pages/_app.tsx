import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GameRound } from "../components/GameRoundStore";
import { AlertBox } from "../components/general/AlertBox";
import Layout from "../components/general/Layout";
import { loadServerData } from "../components/general/server";
import {
  checkIdentification,
  StoreData,
  useLocalStorage
} from "../components/general/store";
import { IdentificationForm } from "../components/IdentificationForm";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [isIdentified, setIsIdentified] = useState(true);
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [secret, setSecret] = useLocalStorage("secret", "");
  const [companion1, setCompanion1] = useLocalStorage("companion1", "");
  const [companion2, setCompanion2] = useLocalStorage("companion2", "");
  const [timeSlotSaturday1, setTimeSlotSaturday1] = useLocalStorage(
    "timeSlotSaturday1",
    false
  );
  const [timeSlotSaturday2, setTimeSlotSaturday2] = useLocalStorage(
    "timeSlotSaturday2",
    false
  );
  const [timeSlotSaturday3, setTimeSlotSaturday3] = useLocalStorage(
    "timeSlotSaturday3",
    false
  );
  const [timeSlotSaturday4, setTimeSlotSaturday4] = useLocalStorage(
    "timeSlotSaturday4",
    false
  );
  const [timeSlotSunday1, setTimeSlotSunday1] = useLocalStorage(
    "timeSlotSunday1",
    false
  );
  const [timeSlotSunday2, setTimeSlotSunday2] = useLocalStorage(
    "timeSlotSunday2",
    false
  );
  const [timeSlotSunday3, setTimeSlotSunday3] = useLocalStorage(
    "timeSlotSunday3",
    false
  );
  const [fantasy, setFantasy] = useLocalStorage("fantasy", false);
  const [scifi, setScifi] = useLocalStorage("scifi", false);
  const [horror, setHorror] = useLocalStorage("horror", false);
  const [crime, setCrime] = useLocalStorage("crime", false);
  const [modern, setModern] = useLocalStorage("modern", false);
  const [likeToPlay, setLikeToPlay] = useLocalStorage("likeToPlay", true);
  const [likeToMaster, setLikeToMaster] = useLocalStorage(
    "likeToMaster",
    false
  );
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );
  const [catering, setCatering] = useLocalStorage("catering", 1);
  const [kioskDuration, setKioskDuration] = useLocalStorage("kioskDuration", 0);
  const [cocAccepted, setCocAccepted] = useLocalStorage("cocAccepted", false);
  const [recentlySaved, setRecentlySaved] = useLocalStorage("setRecentlySaved", false);

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
          setCompanion1(privateBody.companion1);
          setCompanion2(privateBody.companion2);
          setTimeSlotSaturday1(privateBody.timeSlotSaturday1);
          setTimeSlotSaturday2(privateBody.timeSlotSaturday2);
          setTimeSlotSaturday3(privateBody.timeSlotSaturday3);
          setTimeSlotSaturday4(privateBody.timeSlotSaturday4);
          setTimeSlotSunday1(privateBody.timeSlotSunday1);
          setTimeSlotSunday2(privateBody.timeSlotSunday2);
          setTimeSlotSunday3(privateBody.timeSlotSunday3);
          setLikeToPlay(privateBody.likeToPlay);
          setFantasy(privateBody.fantasy);
          setScifi(privateBody.scifi);
          setHorror(privateBody.horror);
          setCrime(privateBody.crime);
          setModern(privateBody.modern);
          setLikeToMaster(privateBody.likeToMaster);
          setGameRounds(privateBody.gameRounds);
          setCatering(privateBody.catering);
          setKioskDuration(privateBody.kioskDuration);
          setCocAccepted(privateBody.cocAccepted);
          setSecret(privateBody.secret);
          setRecentlySaved(privateBody.recentlySaved);
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
            <a href="https://rollenspieltage.ch/kontakt/" target="_blank" rel="noreferrer">
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
