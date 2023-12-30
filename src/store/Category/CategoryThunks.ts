import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {category, responseTypesCategory, typesCategory} from '../../types';

export const fetchCategory = createAsyncThunk<typesCategory[], void>(
  'category/fetchCategories',
  async (_) => {
    try {
      const response = await axiosApi.get<responseTypesCategory | null>('/category.json');
      if (response.data) {
        const result: category[] = Object.keys(response.data).map((id) => ({
          ...response.data[id],
          id: id,
        }));
        return result;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }
);

export const createCategory = createAsyncThunk<void, typesCategory>(
  'category/create',
  async (data) => {
    try {
      await axiosApi.post('/category.json', data);
    } catch (e) {
      console.log('Error: ', e);
    }
  }
);