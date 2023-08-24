import React from 'react';
import HeaderPopup from "./header/headerPopup";
import HeaderPrimary from './header/headerPrimary';

function Header() {
    return (
        <div>
        <HeaderPopup /> {/* Limited Offer PopUP on top */}
        <HeaderPrimary/>
        </div>
    );
}

export default Header;