import React from "react";

import classes from "./SideDrawer.module.css"

import LOGO from "../../../assets/images/BurgerLogo.png"
import Arrow from "../../../assets/images/Arrow2.png"
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop"

const sideDrawer = ( props ) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
        <BackDrop 
            show={props.show} 
            closeBackdrop={props.clicked}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.ImageDiv}>
                <img src={LOGO} />
            </div>
            <NavigationItems />
            <button 
            className={classes.Btn} 
            onClick={props.clicked}><img src={Arrow}/>Back</button>
        </div>
        
        </>
    );
};

export default sideDrawer;
