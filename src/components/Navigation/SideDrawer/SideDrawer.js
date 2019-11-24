import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../Ui/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/aux';

const sideDrawer = (props) => {
    let  attachedClasses = [ "SideDrawer", "Close"]
    if(props.open){
        attachedClasses = ["SideDrawer", "Open"]
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className="Logo">
                <Logo />
            </div>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;