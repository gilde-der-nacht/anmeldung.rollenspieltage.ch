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
import { SaveAndFeedbackBox } from "../components/SaveAndFeedbackBox";

const Home: NextPage = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret, setSecret]);
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
            <p>Bitte w??hle mindestens einen Slot aus.</p>
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
              <p>Bitte w??hle mindestens ein Genre aus.</p>
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
        label: <span>Das weiss ich aktuell noch nicht.</span>,
        value: 1,
      },
      {
        label: (
          <span>Nein, ich werde f??r meine Verpflegung selbst sorgen.</span>
        ),
        value: 2,
      },
    ],
  });
  useEffect(() => {
    setCatering(food.currentValue);
  }, [food, setCatering]);
  const updateFoodValue = (num: number) => {
    setFood((currVal) => {
      return { ...currVal, currentValue: num };
    });
    setRecentlySaved(false);
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
  const [recentlySaved, setRecentlySaved] = useLocalStorage(
    "recentlySaved",
    false
  );
  const [atLeastOnceSaved, setAtLeastOnceSaved] = useLocalStorage(
    "atLeastOnceSaved",
    false
  );

  const [workshop1, setWorkshop1] = useLocalStorage("workshop1", false);
  const [workshop2, setWorkshop2] = useLocalStorage("workshop2", false);
  const [workshop3, setWorkshop3] = useLocalStorage("workshop3", false);
  const [workshopSummary, setWorkshopSummary] = useState("");
  const [workshopCount, setWorkshopCount] = useState(0);
  useEffect(() => {
    const sum: string[] = [];
    if (workshop1) {
      sum.push("Offene Fragerunde");
    }
    if (workshop2) {
      sum.push("Warum spiele ich ??berhaupt Rollenspiele?");
    }
    if (workshop3) {
      sum.push("Spielerischer Weltenbau");
    }
    setWorkshopCount(sum.length);
    if (sum.length === 0) {
      setWorkshopSummary("Keine Workshops ausgew??hlt");
    } else {
      setWorkshopSummary(sum.map((title) => `??${title}??`).join(", "));
    }
  }, [workshop1, workshop2, workshop3, setWorkshopSummary, setWorkshopCount]);

  return (
    <>
      <SaveAndFeedbackBox
        hasErrors={hasErrors}
        hasNoSlots={hasNoSlots}
        hasActivatedAtLeastOne={hasActivatedAtLeastOne}
        likeToPlay={likeToPlay}
        hasNoGenre={hasNoGenre}
        likeToMaster={likeToMaster}
        noGameRounds={gameRounds.filter((round) => round.active).length === 0}
        cocAccepted={cocAccepted}
        recentlySaved={recentlySaved}
        secret={secret}
        setRecentlySaved={setRecentlySaved}
        setAtLeastOnceSaved={setAtLeastOnceSaved}
      />
      <h1>??bersicht</h1>
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
            ? "Keinen Zeitslot ausgew??hlt"
            : timeSlots
                .filter((slot) => slot.state)
                .map((slot) => slot.label)
                .join(" / ")}
        </div>
      </DrawerWithLink>
      <h2>Spieler:innen</h2>
      <p>
        M??chtest du gerne Mitspielen, dann f??lle die folgenden Informationen
        aus.
      </p>
      <div>
        <Checkbox
          state={likeToPlay}
          setter={(newState) => {
            setLikeToPlay(newState);
            setRecentlySaved(false);
            saveToServer(secret);
          }}
        >
          <span>
            Ja, ich m??chte gerne in einer oder mehreren Rollenspielrunden
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
              ? "Kein Genre ausgew??hlt"
              : GENRE_LIST.filter((genre) => genre.state)
                  .map((genre) => genre.label)
                  .join(", ")}
          </strong>
          <span> ({GENRE_LIST.filter((genre) => genre.state).length})</span>
        </>
      </DrawerWithLink>
      <h2>Spielleiter:innen</h2>
      <p>
        M??chtest du ein oder mehrere Spielrunden leiten, dann erfasse diese in
        diesem Bereich.
      </p>
      <div>
        <Checkbox
          state={likeToMaster}
          setter={(newState) => {
            setLikeToMaster(newState);
            setRecentlySaved(false);
            saveToServer(secret);
          }}
        >
          <span>
            Ja, ich m??chte gerne eine oder mehrere Rollenspielrunden leiten.
          </span>
        </Checkbox>
      </div>
      <div>
        <GameRoundForm gameRounds={gameRounds} isActive={likeToMaster} />
      </div>
      <h2>Workshops</h2>
      <p>
        <strong> Rollenspielerfahrungen sind nicht notwendig.</strong>
      </p>
      <DrawerWithLink
        title="Workshops"
        link={"/workshops" + getSecretQuery(secret)}
      >
        <>
          <strong>{workshopSummary}</strong>
          <span> ({workshopCount})</span>
        </>
      </DrawerWithLink>
      <h2>Verpflegung</h2>
      <p>
        Ein Kiosk steht w??hrend den ??ffnungszeiten zur Verf??gung und am Mittag
        und am Abend kochen wir etwas Leckeres f??r euch.
      </p>
      <p>
        Folgende Umfrage ist nicht verbindlich, sondern hilft uns ungef??hr
        abzusch??tzen, wie gross das Interesse an Verpflegung ist.
      </p>
      <RadioButtons state={food} setter={updateFoodValue} />
      <h2>Helfen</h2>
      <p>
        Um w??hrend beiden Tagen den Kiosk betreiben zu k??nnen, ben??tigen wir
        freiwillige Helfer an der Kasse.
      </p>
      <p>
        Falls du dir es dir vorstellen kannst, uns zwischen den Spielrunden
        auszuhelfen, trage bitte im folgendem Feld ein, wie lange du bereit
        w??rst, am Kiosk mitzuhelfen.
      </p>
      <TextInput
        label="Wie lange w??rst du bereit an der Kiosk-Kasse zu helfen?"
        state={kioskDuration}
        setter={(val) => {
          setKioskDuration(Number(val));
          setRecentlySaved(false);
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
            setRecentlySaved(false);
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
      <SaveAndFeedbackBox
        hasErrors={hasErrors}
        hasNoSlots={hasNoSlots}
        hasActivatedAtLeastOne={hasActivatedAtLeastOne}
        likeToPlay={likeToPlay}
        hasNoGenre={hasNoGenre}
        likeToMaster={likeToMaster}
        noGameRounds={gameRounds.filter((round) => round.active).length === 0}
        cocAccepted={cocAccepted}
        recentlySaved={recentlySaved}
        secret={secret}
        setRecentlySaved={setRecentlySaved}
        setAtLeastOnceSaved={setAtLeastOnceSaved}
      />
    </>
  );
};

export default Home;
