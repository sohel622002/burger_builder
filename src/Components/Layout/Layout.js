import React, { Component } from "react";

import classes from "./Layout.module.css"

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";


class Layout extends Component {
    state={
        showSideDrawer : false
    };

    toggleMenuHandler = () => {
        this.setState((prevState) => {
            return{showSideDrawer : !prevState.showSideDrawer}
        });
    }
    render() {
        return (
            <>
                <SideDrawer 
                    className={classes.sidedrawer}
                    show={this.state.showSideDrawer}
                    clicked={this.toggleMenuHandler} />
                <Toolbar clicked={this.toggleMenuHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    };
};

export default Layout;