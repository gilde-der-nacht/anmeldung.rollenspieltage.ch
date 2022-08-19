import { ParentComponent } from "solid-js";
import { Footer } from "@layout/Footer";
import { Header } from "@layout/Header";

export const Layout: ParentComponent = (props) => {
  return (
    <div class="rst-body">
      <Header />
      <main class="main-content content">{props.children}</main>
      <Footer />
    </div>
  );
};
