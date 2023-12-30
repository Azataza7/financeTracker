import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { responseTypesCategory, typesCategory } from '../../types';

export const fetchCategory = createAsyncThunk<typesCategory[], void>(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosApi.get<responseTypesCategory | null>('/category.json');
      if (response.data) {
        const result: typesCategory[] = Object.keys(response.data).map((id) => ({
          ...response.data[id],
          id: id,
        }));
        return result;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching categories');
    }
  }
);
