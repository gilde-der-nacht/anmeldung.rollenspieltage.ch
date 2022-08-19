/* @refresh reload */
import { render } from "solid-js/web";

import "@style/custom.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
