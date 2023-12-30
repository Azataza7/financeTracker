import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectCategoriesLoading} from '../../store/Category/CategorySlice';
import {category} from '../../types';
import Spinner from '../Spinner/Spinner';
import {fetchCategory} from '../../store/Category/CategoryThunks';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const categoryList: category[] | null = useAppSelector(selectCategories);
  const onLoadingList: boolean = useAppSelector(selectCategoriesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (onLoadingList) {
    return <Spinner/>;
  }

  const categories: JSX.Element[] | undefined = categoryList?.map((category) => (
    <CategoryItem key={category.id} categoryItem={category}/>
  ));

  return (
    <div className="category-container">
      {categories}
    </div>
  );
};

export default CategoryList;