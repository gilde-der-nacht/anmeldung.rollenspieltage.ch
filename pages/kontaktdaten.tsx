import { NextPage } from "next";
import { IdentificationForm } from "../components/general/IdentificationForm";
import { useLocalStorage } from "../components/general/store";

const Kontaktdaten: NextPage = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");

  return (
    <>
      <h1>Kontaktdaten anpassen</h1>
      <IdentificationForm
        name={name}
        email={email}
        setName={(name: string) => setName(name)}
        setEmail={(email: string) => setEmail(email)}
        initial={false}
      />
    </>
  );
};

export default Kontaktdaten;
