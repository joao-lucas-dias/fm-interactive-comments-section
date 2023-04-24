import { ReactNode } from "react";
import classes from "./Container.module.css";

const Container: React.FC<{ children: ReactNode }> = (props) => {
  return <div className={classes.container}>{props.children}</div>
};

export default Container;
