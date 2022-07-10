import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/form/Checkbox";
import { RadioButtons } from "../components/form/RadioButtons";
import { TextInput } from "../components/form/TextInput";
import { GameRoundForm } from "../components/GameRoundForm";
import { GameRound } from "../components/GameRoundStore";
import { AlertBox } from "../components/general/AlertBox";
import { DrawerWithEvent } from "../components/general/DrawerWithEvent";
import { DrawerWithLink } from "../components/general/DrawerWithLink";
import { getSecretQuery, saveToServer } from "../components/general/server";
import { useLocalStorage } from "../components/general/store";

const Home: NextPage = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret]);
  const [companion1, setCompanion1] = useLocalStorage("companion1", "");
  const [companion2, setCompanion2] = useLocalStorage("companion2", "");
  const companions = [companion1, companion2].filter((c) => c.length > 0);
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

  type Slot = {
    state: boolean;
    label: string;
  };
  const timeSlots: Slot[] = [
    { state: timeSlotSaturday1, label: "Sa, 10-13" },
    { state: timeSlotSaturday2, label: "Sa, 13-16" },
    { state: timeSlotSaturday3, label: "Sa, 16-19" },
    { state: timeSlotSaturday4, label: "Sa, 19-22" },
    { state: timeSlotSunday1, label: "So, 10-13" },
    { state: timeSlotSunday2, label: "So, 13-16" },
    { state: timeSlotSunday3, label: "So, 16-18" },
  ];
  const hasNoSlots = timeSlots.filter((slot) => slot.state).length === 0;
  const timeProps = hasNoSlots
    ? {
        error: (
          <AlertBox link={"/zeit" + getSecretQuery(secret)}>
            <p>Bitte wähle mindestens einen Slot aus.</p>
          </AlertBox>
        ),
      }
    : {};

  const [fantasy, setFantasy] = useLocalStorage("fantasy", false);
  const [scifi, setScifi] = useLocalStorage("scifi", false);
  const [horror, setHorror] = useLocalStorage("horror", false);
  const [crime, setCrime] = useLocalStorage("crime", false);
  const [modern, setModern] = useLocalStorage("modern", false);
  const GENRE_LIST = [
    { state: fantasy, label: "Fantasy" },
    { state: scifi, label: "Science Fiction" },
    { state: horror, label: "Horror" },
    { state: crime, label: "Krimi" },
    { state: modern, label: "Modern" },
  ];

  const hasNoGenre = GENRE_LIST.filter((genre) => genre.state).length === 0;
  const [likeToPlay, setLikeToPlay] = useLocalStorage("likeToPlay", true);
  const vorliebenProps =
    likeToPlay && hasNoGenre
      ? {
          error: (
            <AlertBox link={"/mitspielen" + getSecretQuery(secret)}>
              <p>Bitte wähle mindestens ein Genre aus.</p>
            </AlertBox>
          ),
        }
      : {};
  const [likeToMaster, setLikeToMaster] = useLocalStorage(
    "likeToMaster",
    false
  );
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );
  const [catering, setCatering] = useLocalStorage("catering", 1);
  const [food, setFood] = useState({
    name: "food",
    currentValue: 1,
    options: [
      {
        label: <span>Ja, ich verpflege mich gerne vor Ort.</span>,
        value: 0,
      },
      {
        label: (
          <span>Nein, ich werde für meine Verpflegung selbst sorgen.</span>
        ),
        value: 1,
      },
    ],
  });
  useEffect(() => {
    setCatering(food.currentValue);
  }, [food]);
  const updateFoodValue = (num: number) => {
    setFood((currVal) => {
      return { ...currVal, currentValue: num };
    });
    saveToServer(secret);
  };

  const [kioskDuration, setKioskDuration] = useLocalStorage("kioskDuration", 0);
  const [cocAccepted, setCocAccepted] = useLocalStorage("cocAccepted", false);

  const [hasActivatedAtLeastOne, setHasActivatedAtLeastOne] = useState(false);
  useEffect(() => {
    setHasActivatedAtLeastOne(likeToPlay || likeToMaster || kioskDuration > 0);
  }, [likeToPlay, likeToMaster, kioskDuration]);

  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    setHasErrors(
      !hasActivatedAtLeastOne ||
        !cocAccepted ||
        hasNoSlots ||
        (likeToPlay && hasNoGenre) ||
        (likeToMaster &&
          gameRounds.filter((round) => round.active).length === 0)
    );
  }, [
    hasActivatedAtLeastOne,
    cocAccepted,
    hasNoSlots,
    likeToPlay,
    hasNoGenre,
    likeToMaster,
    gameRounds,
  ]);

  return (
    <>
      <h1>Übersicht</h1>
      <DrawerWithLink
        title="Kontaktdaten"
        link={"/kontaktdaten" + getSecretQuery(secret)}
        type="success"
      >
        <>
          Name: <strong>{name}</strong>
          <br /> E-Mail: <strong>{email}</strong>
        </>
      </DrawerWithLink>
      <DrawerWithLink
        title="Begleitung"
        link={"/begleitung" + getSecretQuery(secret)}
        optional={true}
      >
        <>
          <strong>
            {companions.length === 0
              ? "Ohne Begleitung"
              : companions.join(", ")}
          </strong>
          <span> ({companions.length})</span>
        </>
      </DrawerWithLink>
      <DrawerWithLink
        title="Zeit"
        link={"/zeit" + getSecretQuery(secret)}
        {...timeProps}
      >
        <div>
          {timeSlots.filter((slot) => slot.state).length === 0
            ? "Keinen Zeitslot ausgewählt"
            : timeSlots
                .filter((slot) => slot.state)
                .map((slot) => slot.label)
                .join(" / ")}
        </div>
      </DrawerWithLink>
      <h2>Spieler:innen</h2>
      <p>
        Möchtest du gerne Mitspielen, dann fülle die folgenden Informationen
        aus.
      </p>
      <div>
        <Checkbox
          state={likeToPlay}
          setter={(newState) => {
            setLikeToPlay(newState);
            saveToServer(secret);
          }}
        >
          <span>
            Ja, ich möchte gerne in einer oder mehreren Rollenspielrunden
            mitspielen.
          </span>
        </Checkbox>
      </div>
      <DrawerWithLink
        title="Vorlieben"
        link={"/mitspielen" + getSecretQuery(secret)}
        {...vorliebenProps}
        disabled={!likeToPlay}
      >
        <>
          <strong>
            {hasNoGenre
              ? "Kein Genre ausgewählt"
              : GENRE_LIST.filter((genre) => genre.state)
                  .map((genre) => genre.label)
                  .join(", ")}
          </strong>
          <span> ({GENRE_LIST.filter((genre) => genre.state).length})</span>
        </>
      </DrawerWithLink>
      <h2>Spielleiter:innen</h2>
      <p>
        Möchtest du ein oder mehrere Spielrunden leiten, dann erfasse diese in
        diesem Bereich.
      </p>
      <div>
        <Checkbox
          state={likeToMaster}
          setter={(newState) => {
            setLikeToMaster(newState);
            saveToServer(secret);
          }}
        >
          <span>
            Ja, ich möchte gerne eine oder mehrere Rollenspielrunden leiten.
          </span>
        </Checkbox>
      </div>
      <div>
        <GameRoundForm gameRounds={gameRounds} isActive={likeToMaster} />
      </div>
      <h2>Verpflegung</h2>
      <p>
        Ein Kiosk steht während den Öffnungszeiten zur Verfügung und am Mittag
        und am Abend kochen wir etwas Leckeres für euch.
      </p>
      <p>
        Folgende Umfrage ist nicht verbindlich, sondern hilft uns ungefähr
        abzuschätzen, wie gross das Interesse an Verpflegung ist.
      </p>
      <RadioButtons state={food} setter={updateFoodValue} />
      <h2>Helfen</h2>
      <p>
        Um während beiden Tagen den Kiosk betreiben zu können, benötigen wir
        freiwillige Helfer an der Kasse.
      </p>
      <p>
        Falls du dir es dir vorstellen kannst, uns zwischen den Spielrunden
        auszuhelfen, trage bitte im folgendem Feld ein, wie lange du bereit
        wärst, am Kiosk mitzuhelfen.
      </p>
      <TextInput
        label="Wie lange wärst du bereit an der Kiosk-Kasse zu helfen?"
        state={kioskDuration}
        setter={(val) => {
          setKioskDuration(Number(val));
          saveToServer(secret);
        }}
        placeholder="Zeit"
        type="number"
        clue="Dauer in Stunden"
      />
      <h2>Anmeldung abschliessen</h2>
      <div>
        <Checkbox
          state={cocAccepted}
          setter={(newState) => {
            setCocAccepted(newState);
            saveToServer(secret);
          }}
        >
          <span>
            Ja, ich habe den
            <a
              href="https://rollenspieltage.ch/verhaltenskodex/"
              target="_blank"
              rel="noreferrer"
            >
              Verhaltenskodex
            </a>
            gelesen und werde mich daran halten.
          </span>
        </Checkbox>
      </div>
      {hasErrors ? (
        <AlertBox>
          <div className="content">
            <p>Deine Anmeldung ist aktuell noch nicht gültig:</p>
            <ul style={{ margin: 0 }}>
              {hasNoSlots && (
                <li>Bitte wähle mindestens einen Zeitslot aus.</li>
              )}
              {!hasActivatedAtLeastOne && (
                <li>
                  Bitte wähle mindestens eine Option aus: <br /> Als Spieler:in
                  mitspielen, eine Spielrunde leiten oder am Kiosk aushelfen.
                </li>
              )}
              {likeToPlay && hasNoGenre && (
                <li>(Spieler:innen) Bitte wähle mindestens ein Genre aus.</li>
              )}
              {likeToMaster &&
                gameRounds.filter((round) => round.active).length === 0 && (
                  <li>
                    (Spielleiter:innen) Bitte füge mindestens eine Spielrunde
                    hinzu.
                  </li>
                )}
              {!cocAccepted && (
                <li>Bitte akzeptiere unseren Verhaltenskodex.</li>
              )}
            </ul>
          </div>
        </AlertBox>
      ) : (
        <DrawerWithEvent
          type="success"
          title="Deine Anmeldung ist gültig"
          event={() => console.log("clicked")}
        >
          <p>Bitte speichere deine Anmeldung.</p>
        </DrawerWithEvent>
      )}
    </>
  );
};

export default Home;
