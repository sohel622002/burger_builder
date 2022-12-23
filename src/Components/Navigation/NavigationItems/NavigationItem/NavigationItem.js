
import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.css"

const navigationItem = (props) => (
    <li className="links">
        <NavLink
            to={props.link}>{props.children}
        </NavLink>
    </li>
);

export default navigationItem;