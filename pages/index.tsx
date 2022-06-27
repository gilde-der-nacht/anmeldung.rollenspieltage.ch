import type { NextPage } from "next";
import { Drawer } from "../components/general/Drawer";
import { useLocalStorage } from "../components/general/store";

const Home: NextPage = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");

  return (
    <>
      <h1>Übersicht</h1>
      <Drawer title="Kontaktdaten" link="/kontaktdaten" type="success">
        <div>
          Name: <strong>{name}</strong>
          <br /> E-Mail: <strong>{email}</strong>
        </div>
      </Drawer>
    </>
  );
};

export default Home;
