import React from 'react';
import {category} from '../../types';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteCategoryLoading, selectShowModal, setShowModal} from '../../store/Category/CategorySlice';
import {deleteCategory, fetchCategory} from '../../store/Category/CategoryThunks';
import CategorySpinner from '../Spinner/CategorySpinner';

interface Props {
  categoryItem: category;
}

const CategoryItem: React.FC<Props> = ({categoryItem}) => {
  const onLoading: boolean = useAppSelector(selectDeleteCategoryLoading);
  const dispatch = useAppDispatch();
  const showModal: boolean = useAppSelector(selectShowModal);

  const textColor = categoryItem.type === 'Expense' ? 'red' : 'green';

  const handleDelete = async () => {
    await dispatch(deleteCategory(categoryItem.id));
    await dispatch(fetchCategory());
  };

  const handleEdit = () => {
    dispatch(setShowModal(!showModal));
  };

  return (
    <>
      <div className="category-block">
        {onLoading ? (
          <div className="category-block-spinner">
            <CategorySpinner/>
          </div>
        ) : (
          <div className="category-body">
            <span className="title-category">{categoryItem.title}</span>
            <span className="type-category" style={{color: textColor}}>{categoryItem.type}</span>
            <div className="control-panel">
              <Link
                className="edit-button btn btn-secondary"
                style={{display: onLoading ? 'none' : 'inline-block'}}
                to={'edit/' + categoryItem.id}
                onClick={handleEdit}
              />
              <button className="delete-button btn btn-danger" onClick={handleDelete}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryItem;