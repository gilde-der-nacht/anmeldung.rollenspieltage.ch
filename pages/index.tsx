import type { NextPage } from "next";
import Layout from "../components/layout";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    document?.querySelector("body")?.classList.add("rst");
  });
  return (
    <Layout>
      <h1>Anmeldung</h1>
    </Layout>
  );
};

export default Home;
