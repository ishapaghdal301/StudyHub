import React from "react";
import AdImage from "./homeContent/adImage";
import Feature1 from "./homeContent/featureDiv/featureDiv1";
import Recommendations from "./homeContent/recommendations/recommendations";
import FeatureDiv2 from "./homeContent/featureDiv/featureDiv2";
import FillerDiv from "./homeContent/fillerDiv";
import TopCategories from "./homeContent/topCategories/topCategories";
import BecomeInstructor from "./homeContent/becomeInstructor";
import TrustedCompanies from "./homeContent/trustedCompanies";
// import VideoAdDiv from "./homeContent/videoAdDiv";


function HomeContent(){
    return(
        <div>
            <AdImage/>
            <Feature1/>
            <Recommendations/>
            <FeatureDiv2/>
            <FillerDiv/>
            <TopCategories/>
            <BecomeInstructor/>
            <TrustedCompanies/>
            
        </div>
    )
}

export default HomeContent;