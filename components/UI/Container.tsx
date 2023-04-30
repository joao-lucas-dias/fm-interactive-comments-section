import { ReactNode } from "react";

import shared_classes from "../../styles/shared.module.css";

const Container: React.FC<{ children: ReactNode }> = (props) => {
	return <div className={shared_classes.container}>{props.children}</div>;
};

export default Container;
