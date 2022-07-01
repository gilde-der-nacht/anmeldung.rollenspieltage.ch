import { NextPage } from "next";
import { IdentificationForm } from "../components/IdentificationForm";
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
        setName={setName}
        setEmail={setEmail}
        initial={false}
      />
    </>
  );
};

export default Kontaktdaten;
