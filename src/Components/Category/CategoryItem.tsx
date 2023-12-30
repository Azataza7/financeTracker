import React from 'react';
import {category} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  categoryItem: category;
}

const CategoryItem: React.FC<Props> = ({categoryItem}) => {
  const textColor = categoryItem.type === 'Expense' ? 'red' : 'green';

  return (
    <div className="category-block">
      <div className="category-body">
        <span className="title-category">{categoryItem.title}</span>
        <span className="type-category" style={{ color: textColor}}>{categoryItem.type}</span>
      </div>
      <div className="control-panel">
        <Link className="edit-button btn btn-secondary" to={"edit/" + categoryItem.id}/>
        <button className="delete-button btn btn-danger"/>
      </div>
    </div>
  );
};

export default CategoryItem;