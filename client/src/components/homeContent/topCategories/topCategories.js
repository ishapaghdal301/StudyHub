import React, { useEffect, useState } from "react";
import CategoryCard from "./categoryCard";
import CategoryPopup from "./CategoryPopup";
import './topCategories.css';

function TopCategories() {
    const [category, setCategory] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    function handleOnClick(mycategory) {
        setSelectedCat(mycategory);
        console.log(selectedCat);
        console.log(mycategory);
    }
    function handleOnClose() {
        setSelectedCat(null);
    }

    useEffect(() => {
        const instructor = localStorage.getItem("user");
        async function fetchCategories() {
            try {
                const response = await fetch("http://localhost:5000/categories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        instructor
                    }),

                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setCategory(data);
                    console.log(category);
                } else {
                    console.error("Failed to fetch courses");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className="topCategories">
            <h2 className="categoryHeading">Top Categories</h2>
            <div className="categories">
                {category.map((mycategory) => (
                    <CategoryCard
                        imgSrc={mycategory.image}
                        title={mycategory.categoryName}
                        handleOnClick={() => handleOnClick(mycategory)} // Pass a function reference
                    />

                ))}
            </div>
            {selectedCat && (
                <CategoryPopup category={selectedCat} onClose={handleOnClose} />
            )}
        </div>
    )
}

export default TopCategories;
