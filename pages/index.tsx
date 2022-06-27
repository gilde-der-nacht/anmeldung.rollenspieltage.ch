import type { NextPage } from "next";
import { Drawer } from "../components/general/Drawer";
import { useLocalStorage } from "../components/general/store";

const Home: NextPage = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [companion1, setCompanion1] = useLocalStorage("companion1", "");
  const [companion2, setCompanion2] = useLocalStorage("companion2", "");
  const companions = [companion1, companion2].filter((c) => c.length > 0);

  return (
    <>
      <h1>Übersicht</h1>
      <Drawer title="Kontaktdaten" link="/kontaktdaten" type="success">
        <div>
          Name: <strong>{name}</strong>
          <br /> E-Mail: <strong>{email}</strong>
        </div>
      </Drawer>
      <Drawer title="Begleitung" link="/begleitung">
        <div>
          <strong>
            {companions.length === 0
              ? "Ohne Begleitung"
              : companions.join(", ")}
          </strong>{" "}
          ({companions.length})
        </div>
      </Drawer>
    </>
  );
};

export default Home;
