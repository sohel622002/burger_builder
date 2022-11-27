import React from "react";

import classes from "./Toolbar.module.css"
import Logo from "../../../assets/images/BurgerLogo.png"

import NavigationItems from "../NavigationItems/NavigationItems"


const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <div className={classes.Menu}><a onClick={props.clicked}>MENU</a></div>
        <div className={classes.BurgerLogo}>
            <img src={Logo} alt="Image_LOGO"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </div>
);

export default toolbar;