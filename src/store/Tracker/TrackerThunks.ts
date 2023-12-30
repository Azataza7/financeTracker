import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {report, typeOfReportJson} from '../../types';

export const fetchReports = createAsyncThunk<report[], undefined>(
  'reports',
  async () => {
    const response = await axiosApi.get<report[] | null>('reports.json');
    if (response.data) {
      const result: report[] = Object.keys(response.data).map((id) => ({
        ...response.data[id],
        id: id,
      }));
      return result;
    } else {
      return [];
    }
  }
);