import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {typesCategory} from '../../types';
import {createCategory, deleteCategory, fetchCategory, fetchCategoryItem, updateCategory} from './CategoryThunks';
import {RootState} from '../../app/store';

interface typesCategoryState {
  categories: typesCategory[];
  categoryItem: typesCategory | null;

  categoryListOnLoading: boolean;
  createCategoryLoading: boolean;
  deleteCategoryLoading: boolean;
  updateCategoryLoading: boolean;
  onShowModal: boolean;
}

const initialState: typesCategoryState = {
  categories: [],
  categoryItem: null,

  categoryListOnLoading: false,
  createCategoryLoading: false,
  deleteCategoryLoading: false,
  updateCategoryLoading: false,
  onShowModal: false,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.onShowModal = action.payload;
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

    builder.addCase(fetchCategoryItem.pending, (state: typesCategoryState) => {
      state.updateCategoryLoading = true;
    });
    builder.addCase(fetchCategoryItem.fulfilled, (state: typesCategoryState, {payload: category}) => {
      state.categoryItem = category;
      state.updateCategoryLoading = false;
    });
    builder.addCase(fetchCategoryItem.rejected, (state: typesCategoryState) => {
      state.updateCategoryLoading = false;
    });

    builder.addCase(updateCategory.pending, (state: typesCategoryState) => {
      state.updateCategoryLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state: typesCategoryState) => {
      state.updateCategoryLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state: typesCategoryState) => {
      state.updateCategoryLoading = false;
    });
  },
});

export const categoryReducer = CategorySlice.reducer;
export const selectCategories = (state: RootState) => state.category.categories;
export const { setShowModal } = CategorySlice.actions;
export const selectCategoryItem = (state: RootState) => state.category.categoryItem;

export const selectCategoriesLoading = (state: RootState) => state.category.categoryListOnLoading;
export const selectCreateCategoryLoading = (state: RootState) => state.category.createCategoryLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.category.deleteCategoryLoading;
export const selectUpdateCategoryLoading = (state: RootState) => state.category.updateCategoryLoading;
export const selectShowModal = (state: RootState) => state.category.onShowModal;