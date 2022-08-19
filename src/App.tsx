import { getServerData } from "@api/api";
import { Box } from "@components/Box";
import { DynamicEntry } from "@components/ProgramEntry";
import { Layout } from "@layout/Layout";
import { NetworkError } from "@util/NetworkError";
import { Progress } from "@util/Progress";
import { renderNamesList } from "@util/utils";
import { Component, createResource, For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";

const App: Component = () => {
  const [state] = createResource(getServerData);

  const isAlone = () => state()?.names?.length === 1 ?? true;

  return (
    <Layout>
      <h1>{isAlone() ? "Dein" : "Euer"} Programm</h1>
      <p>
        Es folgt das persönliche Programm für{" "}
        <strong>{renderNamesList(state()?.names ?? ["..."])}</strong>.
      </p>
      <Box>
        {isAlone() ? "Kommst du" : "Kommt ihr"} verspätet oder{" "}
        {isAlone() ? "kannst du" : "könnt ihr"} gar nicht teilnehmen (Krankheit,
        Stau etc.), sendet uns doch bitte eine Nachricht{" "}
        <a href="https://rollenspieltage.ch/kontakt/">per Kontaktformular</a>{" "}
        oder {isAlone() ? "rufe" : "ruft"} uns unter <strong>000</strong> an.
      </Box>
      <Switch fallback={<Progress />}>
        <Match when={typeof state.error !== "undefined"}>
          <NetworkError />
        </Match>
        <Match when={state()}>
          {(state) => (
            <div class="rst-grid" style="padding-block:2rem">
              <div></div>
              <h3 class="centered rst-saturday">Sa, 27.8.</h3>
              <h3 class="centered rst-sunday">So, 28.8.</h3>
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
              <For each={state.program.filter((e) => e.day === "sa")}>
                {(entry) => (
                  <Dynamic component={DynamicEntry[entry.identifier](entry)} />
                )}
              </For>
              <For each={state.program.filter((e) => e.day === "so")}>
                {(entry) => (
                  <Dynamic component={DynamicEntry[entry.identifier](entry)} />
                )}
              </For>
            </div>
          )}
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
