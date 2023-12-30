import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {typesCategory} from '../../types';
import {fetchCategory} from './CategoryThunks';
import {RootState} from '../../app/store';

interface typesCategoryState {
  categories: typesCategory[];
  categoryItem: typesCategory | null;

  categoryListOnLoading: boolean;
}

const initialState: typesCategoryState = {
  categories: [],
  categoryItem: null,
  categoryListOnLoading: false,
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
    })
    builder.addCase(fetchCategory.fulfilled, (state: typesCategoryState, {payload: categories}) => {
      state.categories = categories;
      state.categoryListOnLoading = false;
    })
    builder.addCase(fetchCategory.rejected, (state: typesCategoryState) => {
      state.categoryListOnLoading = false;
    })
  },
});

export const categoryReducer = CategorySlice.reducer;
export const selectCategories = (state: RootState) => state.category.categories

export const selectCategoriesLoading = (state: RootState) => state.category.categoryListOnLoading