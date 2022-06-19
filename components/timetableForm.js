import { useEffect, useState } from "react";
import ArrowSymbol from "./arrowSymbol";
import Drawer from "./drawer";

export default function TimetableForm({
    timeSaturday, updateTimeSaturday, timeSunday, updateTimeSunday, openDrawer, setOpenDrawer
}) {
    useEffect(() => {
        if (openDrawer !== ID) {
            setCollapsed(true);
        }
    }, [openDrawer])

    const [collapsed, setCollapsed] = useState(true);
    const TITLE = "Zeit";
    const ID = "time";
    const SLOTS_SATURDAY = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const SLOTS_SUNDAY = [10, 11, 12, 13, 14, 15, 16, 17];

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
        return (
            <Drawer title={TITLE} buttonEvent={openForm}>
                TODO
            </Drawer>
        );
    }
    return (
        <div className="content">
            <h2>{TITLE}</h2>
            <p>Wähle die Stunden aus, an denen du an den Rollenspieltagen teilnehmen wirst.</p>
            <form onSubmit={handleSubmit}>
                <h3>Samstag, 27. August 2022</h3>
                {SLOTS_SATURDAY.map((time) => {
                    return (
                        <p key={time}>{time} bis {time + 1} Uhr</p>
                    );
                })}
                <h3>Sonntag, 28. August 2022</h3>
                {SLOTS_SUNDAY.map((time) => {
                    return (
                        <p key={time}>{time} bis {time + 1} Uhr</p>
                    );
                })}
                <button className="button-accent" type="submit">
                    <ArrowSymbol />
                    <span> Speichern </span>
                </button>
            </form>
        </div>
    )
}
