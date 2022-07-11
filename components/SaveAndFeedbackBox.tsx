import { AlertBox } from "./general/AlertBox";
import { DrawerWithEvent } from "./general/DrawerWithEvent";
import { saveToServer } from "./general/server";

type BoxProps = {
  hasErrors: boolean;
  hasNoSlots: boolean;
  hasActivatedAtLeastOne: boolean;
  likeToPlay: boolean;
  hasNoGenre: boolean;
  likeToMaster: boolean;
  noGameRounds: boolean;
  cocAccepted: boolean;
  recentlySaved: boolean;
  secret: string;
  setRecentlySaved: (b: boolean) => void;
  setAtLeastOnceSaved: (b: boolean) => void;
};

export const SaveAndFeedbackBox = ({
  hasErrors,
  hasNoSlots,
  hasActivatedAtLeastOne,
  likeToPlay,
  hasNoGenre,
  likeToMaster,
  noGameRounds,
  cocAccepted,
  recentlySaved,
  secret,
  setRecentlySaved,
  setAtLeastOnceSaved,
}: BoxProps) => {
  if (hasErrors) {
    return (
      <AlertBox>
        <div className="content">
          <p>Deine Anmeldung ist aktuell noch nicht gültig:</p>
          <ul style={{ margin: 0 }}>
            {hasNoSlots && <li>Bitte wähle mindestens einen Zeitslot aus.</li>}
            {!hasActivatedAtLeastOne && (
              <li>
                Bitte wähle mindestens eine Option aus: <br /> Als Spieler:in
                mitspielen, eine Spielrunde leiten oder am Kiosk aushelfen.
              </li>
            )}
            {likeToPlay && hasNoGenre && (
              <li>(Spieler:innen) Bitte wähle mindestens ein Genre aus.</li>
            )}
            {likeToMaster && noGameRounds && (
              <li>
                (Spielleiter:innen) Bitte füge mindestens eine Spielrunde hinzu.
              </li>
            )}
            {!cocAccepted && <li>Bitte akzeptiere unseren Verhaltenskodex.</li>}
          </ul>
        </div>
      </AlertBox>
    );
  }

  if (recentlySaved) {
    return (
      <AlertBox type="success">
        <div>
          <h3>Deine Anmeldung ist gültig und gespeichert.</h3>
          <p>
            Du solltest eine E-Mail von uns erhalten haben. Sollte dies nicht
            der Fall sein,{" "}
            <a
              href="https://rollenspieltage.ch/kontakt/"
              target="_blank"
              rel="noreferrer"
            >
              dann melde dich bitte umgehend bei uns.
            </a>
          </p>
        </div>
      </AlertBox>
    );
  }
  return (
    <DrawerWithEvent
      type="danger"
      title="Deine Anmeldung ist noch nicht gespeichert!"
      event={() => {
        setRecentlySaved(true);
        setAtLeastOnceSaved(true);
        saveToServer(secret, true);
      }}
    >
      <p>Deine Anmeldung ist gültig.</p>
    </DrawerWithEvent>
  );
};
