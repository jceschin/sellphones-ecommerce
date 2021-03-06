import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ categories, onCategoryToggle }) => {
  return (
    <div className="categories-col justify-content-center ">
      <h5>
        {" "}
        <i class="lni lni-funnel"></i> Search Filters
      </h5>
      <div classname="filter-catalogue-space">
        <h5>Brand</h5>
        {categories.map((category, id) => {
          return (
            <div
              key={id}
              className="my-3 d-flex align-items-center all-categorys-card"
            >
              <input
                type="checkbox"
                onClick={() => onCategoryToggle(category.name)}
                data-toggle="toggle"
                id={`filt${id}`}
              />
              <label htmlFor={`filt${id}`} className="checkbox-inline">
                {category.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCard;
