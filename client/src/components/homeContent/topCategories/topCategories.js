import React, { useEffect, useState } from "react";
import CategoryCard from "./categoryCard";
import './topCategories.css';

function TopCategories() {
    const [category, setCategory] = useState([]);

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
                    />
                ))}
            </div>
        </div>
    )
}

export default TopCategories;
