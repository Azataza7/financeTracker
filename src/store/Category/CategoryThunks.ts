import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {category, responseTypesCategory, typesCategory, typesCategoryJson} from '../../types';

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

export const deleteCategory = createAsyncThunk<void, string>(
  'category/delete',
  async (id) => {
    await axiosApi.delete(`/category/${id}.json`);
  }
);

export const fetchCategoryItem = createAsyncThunk<typesCategory, string>(
  'category/categoryId',
  async (id) => {
    try {
      const response: typesCategoryJson= await axiosApi.get(`/category/${id}.json`);
      return response.data;
    } catch (e) {
      console.log('Error: ', e)
    }
  }
)

interface updateCategoryParams {
  id: string;
  data: typesCategory;
}

export const updateCategory = createAsyncThunk<void, updateCategoryParams>(
  'category/update',
  async ({id, data}) => {
    try {
      await axiosApi.put(`/category/${id}.json`, data);
    } catch (e) {
      console.log('Error', e);
    }
  }
);