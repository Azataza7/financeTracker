import React from 'react';
import CategoryList from '../../Components/Category/CategoryList';
import ModalCreateCategory from '../../Components/Modal/ModalCreateCategory';

const CategoryPage = () => {
  return (
    <>
      <div className="add-category-container">
        <h4 className="add-category-title">Categories</h4>
        <ModalCreateCategory/>
      </div>
      <CategoryList/>
    </>
  );
};

export default CategoryPage;