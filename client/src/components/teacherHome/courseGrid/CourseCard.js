import React from "react";
import './CourseCard.css';
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";

function CourseCard(props) {
    return (
        <div className="courseCard" onClick={props.onClick}>
            <img className="courseImg" src={props.imgSrc} alt="courseImg"></img>
            <h3>{props.courseTitle}</h3>
            
            <div className="ratingDiv">
                <span className="rating">{props.rating}</span>
                <span className="stars">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarHalfIcon />
                </span>
            </div>
            <div className="priceAndBadge">
                <h3 className="price">{props.price}</h3>
                <div className="bestsellerBadge">Bestseller</div>
            </div>
        </div>
    )
}

export default CourseCard;
