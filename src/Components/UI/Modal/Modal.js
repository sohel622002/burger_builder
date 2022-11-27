
import React, { memo }  from "react";

import Backdrop from "../Backdrop/Backdrop"

import classes from "./Modal.module.css"

const Modal = (props) => {


    return (
        <>
            <Backdrop show={props.show}
                closeBackdrop={props.canclePurchase} />
            <div
                className={classes.Modal}
                style={
                    {
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }
                }>
                {props.children}
            </div>
        </>
    );

};

export default memo(Modal, (prevProps, nextProps) => prevProps.show === nextProps.show);
//This Upper Part Is Working with memo...It Only renders if the show property changes..
//Or Whenever Page Reloads...