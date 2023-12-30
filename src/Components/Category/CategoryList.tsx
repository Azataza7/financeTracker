import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectCategoriesLoading} from '../../store/Category/CategorySlice';
import {typesCategory} from '../../types';
import Spinner from '../Spinner/Spinner';
import {fetchCategory} from '../../store/Category/CategoryThunks';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const categoryList = useAppSelector(selectCategories);
  const onLoadingList = useAppSelector(selectCategoriesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (onLoadingList) {
    return <Spinner/>;
  }

  const categories: typesCategory[] | null = categoryList.map((category) => (
    <CategoryItem key={category.id} categoryItem={category}/>
  ));

  return (
    <div className="category-container">
      {categories}
    </div>
  );
};

export default CategoryList;