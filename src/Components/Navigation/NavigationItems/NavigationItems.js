import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem"
import classes from "./NavigationItems.module.css"

const navigationItems = () => (
   <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/">Chechout</NavigationItem>
   </ul>
);

export default navigationItems;