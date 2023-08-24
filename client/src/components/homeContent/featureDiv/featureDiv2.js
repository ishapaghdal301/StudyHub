import React from "react";
// import FeatureCard from "./featureCard";
import './featureDiv2.css';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import FeatureCard from "./featureCard";
function FeatureDiv2() {
    return (
        <div className="featureDiv2">
            <FeatureCard
                icon={<AccessTimeIcon className="icon" />}
                heading={"Go at your own pace"}
                para={"Enjoy lifetime access to courses on Udemy’s website and app"}
            />
            <FeatureCard
                icon={<EmojiPeopleIcon className="icon" />}
                heading={"Learn from industry experts"}
                para={"Select from top instructors around the world"}
            />
            <FeatureCard
                icon={<VideoLibraryIcon className="icon" />}
                heading={"Find video courses on almost any topic"}
                para={"Build your library for your career and personal growth"}
            />

        </div>
    )
}


export default FeatureDiv2;