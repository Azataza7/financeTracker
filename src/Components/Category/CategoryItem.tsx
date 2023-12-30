import React from 'react';
import {typesCategory} from '../../types';

interface Props {
  categoryItem: typesCategory;
}

const CategoryItem: React.FC<Props> = ({categoryItem}) => {
  return (
    <div className="category-block">
      <span>{categoryItem.title}</span>
      <span>{categoryItem.type}</span>
    </div>
  );
};

export default CategoryItem;