import React, { useEffect, useState } from "react";
import './ShowCategories.css'
function ShowCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/allcategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: 1 }), // Include any necessary data in the request body
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Set the received categories in state
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  // Function to split categories into rows of 3 columns each
  const splitIntoRows = (array, columns) => {
    const result = [];
    for (let i = 0; i < array.length; i += columns) {
      result.push(array.slice(i, i + columns));
    }
    return result;
  };

  const categoryRows = splitIntoRows(categories, 3);

  return (
    <div className="category-container">
    <h2 className="category-heading">All Categories</h2>
    <div className="category-grid">
        {categoryRows.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((category) => (
              <div className="col-md-4" key={category._id}>
                <div className="category-item">
                  <img src={category.image} alt={category.categoryName} />
                  <h3>{category.categoryName}</h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCategories;
