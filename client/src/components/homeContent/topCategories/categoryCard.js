import React from "react";

function CategoryCard(props) {
    function handleOnClick() {
        props.handleOnClick(); // Invoke the function when clicked
    }

    return (
        <div className="categoryCard" onClick={handleOnClick}>
            <img
                src={props.imgSrc}
                alt={props.title + " img"}
                className="categoryImg"
            ></img>
            <h3 className="categoryTitle">{props.title}</h3>
        </div>
    );
}

export default CategoryCard;

// export default CategoryCard;