import { ParentComponent } from "solid-js";

export const Box: ParentComponent = (props) => {
  return (
    <div class="box-success">
      <span>{props.children}</span>
    </div>
  );
};
