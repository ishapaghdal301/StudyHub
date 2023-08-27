import React from 'react';
import HeaderPopup from "./header/headerPopup";
import HeaderPrimary from './header/headerPrimary';

function Header(props) {
    return (
        <div>
        <HeaderPopup /> {/* Limited Offer PopUP on top */}
        <HeaderPrimary id = {props.id}/>
        </div>
    );
}

export default Header;