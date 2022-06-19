import { useState } from "react";

export default function IdentificationForm({
    name, email, updateName, updateEmail,
    startRegistration, registrationStarted
}) {
    const [collapsed, setCollapsed] = useState(true);

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
            <div class="box-success"> <span><p>Name: <strong>{name}</strong><br /> E-Mail: <strong>{email}</strong></p> </span> <a onClick={openForm} class="button button-small button-success"><svg class="svg-inline--fa fa-arrow-turn-down-right event-icon" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="arrow-turn-down-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><g class="fa-duotone-group"><path class="fa-secondary" fill="currentColor" d="M402.7 320H80C35.87 320 0 284.1 0 240V64C0 46.33 14.31 32 32 32C49.69 32 64 46.33 64 64V240C64 248.8 71.19 256 80 256H402.7L434.7 287.1L402.7 320z"></path><path class="fa-primary" fill="currentColor" d="M374.6 438.6C362.1 451.1 341.9 451.1 329.4 438.6C323.1 432.4 320 424.2 320 416C320 407.8 323.1 399.6 329.4 393.4L434.7 288L329.4 182.6C316.9 170.1 316.9 149.9 329.4 137.4C341.9 124.9 362.1 124.9 374.6 137.4L502.6 265.4C515.1 277.9 515.1 298.1 502.6 310.6L374.6 438.6z"></path></g></svg> Anpassen</a> </div>
        );
    }
    return (
        <form onSubmit={handleSubmit} >
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
            <button className="button-accent" type="submit" >
                <svg className="svg-inline--fa fa-arrow-turn-down-right event-icon" aria-hidden="true"
                    focusable="false"
                    data-prefix="fad"
                    data-icon="arrow-turn-down-right"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg="">
                    <g className="fa-duotone-group" >
                        <path
                            className="fa-secondary"
                            fill="currentColor"
                            d="M402.7 320H80C35.87 320 0 284.1 0 240V64C0 46.33 14.31 32 32 32C49.69 32 64 46.33 64 64V240C64 248.8 71.19 256 80 256H402.7L434.7 287.1L402.7 320z"
                        > </path>
                        <path
                            className="fa-primary"
                            fill="currentColor"
                            d="M374.6 438.6C362.1 451.1 341.9 451.1 329.4 438.6C323.1 432.4 320 424.2 320 416C320 407.8 323.1 399.6 329.4 393.4L434.7 288L329.4 182.6C316.9 170.1 316.9 149.9 329.4 137.4C341.9 124.9 362.1 124.9 374.6 137.4L502.6 265.4C515.1 277.9 515.1 298.1 502.6 310.6L374.6 438.6z"
                        > </path>
                    </g>
                </svg>
                {registrationStarted ? (<span> Speichern </span>) : (<span> Anmeldung starten </span>)}
            </button>
        </form>
    )
}
