import { getServerData } from "@api/api";
import { Layout } from "@layout/Layout";
import { NetworkError } from "@util/NetworkError";
import { Progress } from "@util/Progress";
import { Component, createResource, Match, Switch } from "solid-js";

const App: Component = () => {
  const [state] = createResource(getServerData);

  return (
    <Layout>
      <h1>Programm</h1>
      <Switch fallback={<Progress />}>
        <Match when={typeof state.error !== "undefined"}>
          <NetworkError />
        </Match>
        <Match when={state()}>
          {(state) => <h2>State konnte geladen werden</h2>}
        </Match>
      </Switch>
    </Layout>
  );
};

export default App;
