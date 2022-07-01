import { FunctionComponent } from "react";
import { ButtonWithEvent } from "../form/ButtonWithEvent";

type DrawerProps = {
  title: string;
  event: () => void;
  type?: string;
  children: JSX.Element;
};

export const DrawerWithEvent: FunctionComponent<DrawerProps> = ({
  title,
  event,
  type = "gray",
  children,
}) => {
  return (
    <>
      <div className={"box-" + type}>
        <div>
          <h3>{title}</h3>
          <span>{children}</span>
        </div>
        <ButtonWithEvent type={type} event={event}>
          <span> Speichern</span>
        </ButtonWithEvent>
      </div>
    </>
  );
};
