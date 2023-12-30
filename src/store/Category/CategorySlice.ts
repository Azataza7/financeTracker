import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {typesCategory} from '../../types';
import {createCategory, deleteCategory, fetchCategory} from './CategoryThunks';
import {RootState} from '../../app/store';

interface typesCategoryState {
  categories: typesCategory[];
  categoryItem: typesCategory | null;

  categoryListOnLoading: boolean;
  createCategoryLoading: boolean;
  deleteCategoryLoading: boolean;
}

const initialState: typesCategoryState = {
  categories: [],
  categoryItem: null,
  categoryListOnLoading: false,
  createCategoryLoading: false,
  deleteCategoryLoading: false,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<typesCategory[]>) => {
      state.categories = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state: typesCategoryState) => {
      state.categoryListOnLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state: typesCategoryState, {payload: categories}) => {
      state.categories = categories;
      state.categoryListOnLoading = false;
    });
    builder.addCase(fetchCategory.rejected, (state: typesCategoryState) => {
      state.categoryListOnLoading = false;
    });
    builder.addCase(createCategory.pending, (state: typesCategoryState) => {
      state.createCategoryLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state: typesCategoryState) => {
      state.createCategoryLoading = false;
    });
    builder.addCase(createCategory.rejected, (state: typesCategoryState) => {
      state.createCategoryLoading = false;
    });
    builder.addCase(deleteCategory.pending, (state: typesCategoryState) => {
      state.deleteCategoryLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state: typesCategoryState) => {
      state.deleteCategoryLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state: typesCategoryState) => {
      state.deleteCategoryLoading = false;
    });
  },
});

export const categoryReducer = CategorySlice.reducer;
export const selectCategories = (state: RootState) => state.category.categories;

export const selectCategoriesLoading = (state: RootState) => state.category.categoryListOnLoading;
export const selectCreateCategoryLoading = (state: RootState) => state.category.createCategoryLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.category.deleteCategoryLoading;