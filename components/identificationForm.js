import { useState } from "react";
import Drawer from "../components/drawer";
import ArrowSymbol from "./arrowSymbol";

export default function IdentificationForm({
    name, email, updateName, updateEmail, startRegistration, registrationStarted
}) {
    const [collapsed, setCollapsed] = useState(true);
    const TITLE = "Identifikation";

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Validation
        setCollapsed(true);
        startRegistration();
    };

    const openForm = () => {
        setCollapsed(false);
    }

    if (collapsed && registrationStarted) {
        return (
            <Drawer title={TITLE} buttonEvent={openForm}>
                Name: <strong>{name}</strong><br /> E-Mail: <strong>{email}</strong>
            </Drawer>
        );
    }
    return (
        <div>
            <h2>{TITLE}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => updateName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    E-Mail
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                        required
                    />
                </label>
                <button className="button-accent" type="submit">
                    <ArrowSymbol />
                    {registrationStarted ? (<span> Speichern </span>) : (<span> Anmeldung starten </span>)}
                </button>
            </form>
        </div>
    )
}
