import { getServerData } from "@api/api";
import { Box } from "@components/Box";
import { DynamicEntry } from "@components/ProgramEntry";
import { Layout } from "@layout/Layout";
import { NetworkError } from "@util/NetworkError";
import { Progress } from "@util/Progress";
import { renderNamesList } from "@util/utils";
import {
  Component,
  createResource,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { Dynamic } from "solid-js/web";

const App: Component = () => {
  const [secret, setSecret] = createSignal("");
  const [state] = createResource(secret, getServerData);

  const isAlone = () => {
    const s = state();
    if (s === undefined) {
      return true;
    }
    const { hasLoaded } = s;
    if (!hasLoaded) {
      return true;
    }
    return s.names.length === 1 ?? true;
  };

  return (
    <Layout>
      <Show when={state.loading || !state()?.hasLoaded}>
        <h1>Programm</h1>
        <p>
          Weitere Anmeldungen für die Rollenspieltage 2022 sind nicht mehr
          möglich.
        </p>
        <h2>Ich möchte gerne spontan teilnehmen</h2>
        <p>
          Wie bereits in vergangenen Jahren halten wir ein paar Plätze frei,
          damit spontane Besucher ebenfalls teilnehmen können.
        </p>
        <p>
          Hast du Fragen, dann nimm bitte mit uns
          <a href="https://rollenspieltage.ch/kontakt/">Kontakt</a> auf.
        </p>
        <h2>Ich habe mich angemeldet</h2>
        <p>
          Du solltest einen Link mit deinem persönlichen Programm von uns
          erhalten haben. Ist dies nicht der Fall, dann melde dich bitte
          umgehend bei uns per
          <a href="https://rollenspieltage.ch/kontakt/">Kontaktformular</a>.
        </p>
      </Show>

      <Switch fallback={<Progress />}>
        <Match when={typeof state.error !== "undefined"}>
          <NetworkError />
        </Match>
        <Match when={state()}>
          {(state) => {
            if (!state.hasLoaded) {
              return <></>;
            }
            return (
              <>
                <h1>{isAlone() ? "Dein" : "Euer"} Programm</h1>
                <p>
                  Es folgt das persönliche Programm für{" "}
                  <strong>{renderNamesList(state.names)}</strong>.
                </p>
                <Box>
                  {isAlone() ? "Kommst du" : "Kommt ihr"} verspätet oder{" "}
                  {isAlone() ? "kannst du" : "könnt ihr"} gar nicht teilnehmen
                  (Krankheit, Stau etc.), sendet uns doch bitte eine Nachricht{" "}
                  <a href="https://rollenspieltage.ch/kontakt/">
                    per Kontaktformular
                  </a>
                  .
                </Box>
                <div class="rst-grid" style="padding-block:2rem">
                  <div></div>
                  <div class="centered">10 Uhr</div>
                  <div class="centered">11 Uhr</div>
                  <div class="centered">12 Uhr</div>
                  <div class="centered">13 Uhr</div>
                  <div class="centered">14 Uhr</div>
                  <div class="centered">15 Uhr</div>
                  <div class="centered">16 Uhr</div>
                  <div class="centered">17 Uhr</div>
                  <div class="centered">18 Uhr</div>
                  <div class="centered">19 Uhr</div>
                  <div class="centered">20 Uhr</div>
                  <div class="centered">21 Uhr</div>
                  <h3 class="centered day-sa">Samstag, 27.8.</h3>
                  <For each={state.program.filter((e) => e.day === "sa")}>
                    {(entry) => (
                      <Dynamic
                        component={DynamicEntry[entry.identifier](entry)}
                      />
                    )}
                  </For>
                  <div class="rst-only-small"></div>
                  <div class="rst-only-small centered">10 Uhr</div>
                  <div class="rst-only-small centered">11 Uhr</div>
                  <div class="rst-only-small centered">12 Uhr</div>
                  <div class="rst-only-small centered">13 Uhr</div>
                  <div class="rst-only-small centered">14 Uhr</div>
                  <div class="rst-only-small centered">15 Uhr</div>
                  <div class="rst-only-small centered">16 Uhr</div>
                  <div class="rst-only-small centered">17 Uhr</div>
                  <h3 class="centered day-so">Sonntag, 28.8.</h3>
                  <For each={state.program.filter((e) => e.day === "so")}>
                    {(entry) => (
                      <Dynamic
                        component={DynamicEntry[entry.identifier](entry)}
                      />
                    )}
                  </For>
                </div>
              </>
            );
          }}
        </Match>
      </Switch>
      <p>Wir freuen uns auf {isAlone() ? "dich" : "euch"}.</p>
      <p>
        Lieben Gruss
        <br />
        Thomas, Andy, Adrian, Michelle, Andrea und Oliver
        <br />
        <strong>OK Luzerner Rollenspieltage 2022</strong>
      </p>
    </Layout>
  );
};

export default App;
