import { FunctionComponent } from "react";
import AlertIcon from "./AlertIcon";

type AlertBoxProps = {
  children: JSX.Element;
};

export const AlertBox: FunctionComponent<AlertBoxProps> = ({ children }) => {
  return (
    <div className="box-danger">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <AlertIcon />
        {children}
      </div>
    </div>
  );
};
