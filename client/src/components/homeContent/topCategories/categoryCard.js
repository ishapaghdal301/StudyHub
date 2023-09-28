import React from "react";
import './categoryCard.css'
function CategoryCard(props) {
    
    function handleOnClick() {
        props.handleOnClick(); // Invoke the function when clicked
    }

    return (
        <div className="categoryCard" onClick={handleOnClick}>
            <div className="imageContainer">
                <img
                    src={props.imgSrc}
                    alt={props.title + " img"}
                    className="categoryImg"
                />
            </div>
            <h3 className="categoryTitle">{props.title}</h3>
        </div>
    );
}

export default CategoryCard;
