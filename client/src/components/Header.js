import React, { useState } from "react";
import HeaderPopup from "./header/headerPopup";
import HeaderPrimary from "./header/headerPrimary";

function Header(props) {
  const [showCart, setShowCart] = useState(false);
  const OnChangeShowCart = (showCart) => {
    setShowCart(showCart);
    props.OnChangeShowCart(showCart);
  };
  return (
    <div>
      <HeaderPopup /> {/* Limited Offer PopUP on top */}
      <HeaderPrimary id={props.id} OnChangeShowCart={OnChangeShowCart} />
    </div>
  );
}

export default Header;
