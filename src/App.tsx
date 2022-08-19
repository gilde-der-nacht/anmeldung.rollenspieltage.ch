import { getServerData } from "@api/api";
import { Box } from "@components/Box";
import { DynamicEntry } from "@components/ProgramEntry";
import { Layout } from "@layout/Layout";
import { NetworkError } from "@util/NetworkError";
import { Progress } from "@util/Progress";
import { Component, createResource, For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";

const App: Component = () => {
  const [state] = createResource(getServerData);

  const isAlone = () => state()?.names?.length === 1 ?? true;

  const namesList = (names: string[]): string =>
    names.join(", ").replace(/, ([^,]*)$/, " und $1");

  return (
    <Layout>
      <h1>{isAlone() ? "Dein" : "Euer"} Programm</h1>
      <p>
        Es folgt das persönliche Programm für{" "}
        <strong>{namesList(state()?.names ?? ["..."])}</strong>.
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
            <For each={state.program}>
              {(entry) => (
                <Dynamic component={DynamicEntry[entry.identifier]} />
              )}
            </For>
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
