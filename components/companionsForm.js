import { useEffect, useState } from "react";
import ArrowSymbol from "./arrowSymbol";
import Drawer from "./drawer";

export default function CompanionsForm({
    companion1, companion2, updateCompanion1, updateCompanion2, openDrawer, setOpenDrawer
}) {
    useEffect(() => {
        if (openDrawer !== ID) {
            setCollapsed(true);
        }
    }, [openDrawer])

    const [collapsed, setCollapsed] = useState(true);
    const TITLE = "Begleitung";
    const ID = "companion";

    const handleSubmit = (e) => {
        e.preventDefault();
        setCollapsed(true);
        setOpenDrawer("");
    };

    const openForm = () => {
        setCollapsed(false);
        setOpenDrawer(ID);
    }

    if (collapsed) {
        const companions = [companion1, companion2].filter((c) => c.length > 0);
        return (
            <Drawer title={TITLE} buttonEvent={openForm}>
                <strong>{companions.length === 0 ? "Ohne Begleitung" : companions.join(", ")}</strong> ({companions.length})
            </Drawer>
        );
    }
    return (
        <div className="content">
            <h2>{TITLE}</h2>
            <p>Du kannst deine Anmeldung für bis zu zwei weitere Personen durchführen. </p>
            <p><strong>Beachte, dass deine Begleitung das exakt selbe Programm enthält, wie du.</strong></p>
            <p>Seid ihr mehr als drei Personen, teilt euch bitte in mehrere Gruppen (und somit mehrere Anmeldungen) auf.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Begleitung #1
                    <input
                        id="name1"
                        type="text"
                        name="name1"
                        placeholder="Begleitung 1"
                        value={companion1}
                        onChange={(e) => updateCompanion1(e.target.value)}
                    />
                </label>
                <label>
                    Begleitung #2
                    <input
                        id="name2"
                        type="text"
                        name="name2"
                        placeholder="Begleitung 2"
                        value={companion2}
                        onChange={(e) => updateCompanion2(e.target.value)}
                    />
                </label>

                <button className="button-accent" type="submit">
                    <ArrowSymbol />
                    <span> Speichern </span>
                </button>
            </form>
        </div>
    )
}
