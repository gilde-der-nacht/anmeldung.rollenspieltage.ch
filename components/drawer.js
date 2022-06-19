import ArrowSymbol from "../components/arrowSymbol";

export default function Drawer({
    title, children, buttonEvent, type = "danger"
}) {
    return (
        <>
            <div className={"box-" + type}>
                <div>
                    <h3>{title}</h3>
                    <span>{children}</span>
                </div>
                <a onClick={buttonEvent} className="button button-small button-success">
                    <ArrowSymbol />
                    <span> Anpassen</span>
                </a>
            </div>
        </>);
}
